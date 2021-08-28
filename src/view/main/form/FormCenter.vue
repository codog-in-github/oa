<template>
    <div class="center">
        <div class="title">コンテナ情報</div>
        <title-group
            title="COMMON"
            class="single-line"
        >
            <el-input
                size="mini"
                v-model="common"
                @change="commonChange"
            ></el-input>
        </title-group>
        <title-group
            v-for="(val, i) in van_place"
            :key="i"
            title="VAN PLACE"
            class="single-line"
        >
            <el-input
                size="mini"
                v-model="van_place[i]"
            >
                <template #append v-if="van_place.length > 1"><el-button @click="vanDel(i)" class="el-icon-remove" style="color:red"></el-button></template>
            </el-input>
        </title-group>
        <div class="vaning-box">
            <el-button 
                size="mini" 
                type="primary"
                @click="vannningPlaceAddHandler"
            >
                VANNING PLACE ADD
            </el-button>
        </div>
        <div class="container-type">
            <div class="container-input-title">
                <span>Conntainer type</span><span>QUANTITY</span>
            </div>
            <div class="container-input-group"
                v-for="(single, i) in container.filter(i=>!i.delete_at)"
                :key="single.id"
            >
                <span>{{i+1}}</span>
                <el-select 
                    size="mini"
                    @focus="getOptionsAnsyc(3, options.containerType)"
                    @change="$eventBus.$emit('containerTypeChange',single.id,single.container_type)"
                    v-model="single.container_type">
                    <el-option
                        v-for="{id, value, label} in options.containerType.item"
                        :key="id"
                        :value="value"
                        :label="label"
                    ></el-option>
                </el-select>
                <el-input 
                    size="mini"
                    type="number"
                    v-model="single.quantity">
                    <template #append v-if="container.filter(i=>!i.delete_at).length > 1">
                        <el-button @click="deleteType(i, single.id)" class="el-icon-remove" style="color:red"></el-button>
                    </template>
                </el-input>
            </div>
            <div style="text-align:right">
                <el-button
                    type="primary"
                    size="mini"
                    @click="containerTypeAddHandler"
                >add</el-button>
            </div>
            <title-group
                title="状態"
            >
                <el-select
                    type="textarea"
                    v-model="state"
                    style="width:100%"
                    multiple
                    @focus="getOptionsAnsyc(10, options.state)"
                >
                    <el-option
                        v-for="{id, value, label} in options.state.item"
                        :key="id"
                        :value="value"
                        :label="label"
                    ></el-option>
                </el-select>
            </title-group>
        </div>
        <title-group
            title="ピックオーダー手配"
        >
            <el-radio
                label="有"
                v-model="pick_order"
            >
            </el-radio>
            <el-radio
                label="無"
                v-model="pick_order"
            >
            </el-radio>
        </title-group>
        <title-group
            title="ピックオーダー依頼"
        >
            <el-date-picker
                v-model="pick_order_request"
                value-format="yyyy-MM-dd"
                style="width:100%"
            >
            </el-date-picker>
        </title-group>
        <title-group
            title="ピックオーダー送付"
        >
            <el-date-picker
                v-model="send_pick_order"
                value-format="yyyy-MM-dd"
                style="width:100%"
            >
            </el-date-picker>
        </title-group>
        <title-group
            title="CONSIGINEE"
        >
            <el-input
                type="textarea"
                v-model="consiginee"
            >
            </el-input>
        </title-group>
        <title-group
            title="REMARKS"
        >
            <el-input
                type="textarea"
                v-model="remarks"
            >
            </el-input>
        </title-group>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import TitleGroup from '@/components/titleGroup'
import { getOptionsAnsyc, common } from '@/mixin/main'
import { getRandomID } from '@/assets/js/utils'

export default {
    data(){
        return{
            common:'PLASTIC',
            van_place:[''],
            consiginee:'',
            remarks:'',
            state:[],
            pick_order:'',
            pick_order_request:'',
            send_pick_order:'',

            options:{
                containerType:{item:[],loading:false,},
                state:{item:[],loading:false,},
            }
        };
    },
    mounted(){
        if(this.isNewOrder){
            this.$store.commit('form/containerClear');
            this.$store.commit('form/containerAddNew');
            this.$nextTick(
                ()=>this.$eventBus.$emit('container1Click')
            );
        }
    },
    watch:{
        common(val){
            this.$store.state.form.common = val;
        }
    },
    computed:{
        ...mapState('form',{
            container:state=>state.container,
            bkgId:state=>state.bkgId
        }),
    },
    methods:{
        commonChange(common){
            this.$eventBus.$emit('commonChange',common);
        },
        vannningPlaceAddHandler(){
            if(this.van_place.length < 6){
                this.van_place.push('');
            }else{
                this.$notify.error({
                    title: 'error',
                    message: `max 6`,
                });
            }
        },
        containerTypeAddHandler(){
            if(this.container.length < 6){
                this.$store.commit('form/containerAddNew');
            }else{
                this.$notify.error({
                    title: 'error',
                    message: `max 6`,
                });
            }
        },
        getData(){
            return {
                common:this.common,
                van_place:this.van_place.join('|'),
                consiginee:this.consiginee,
                remarks:this.remarks,
                container:this.container,
                state:this.state.join('|'),
                pick_order:this.pick_order,
                pick_order_request:this.pick_order_request,
                send_pick_order:this.send_pick_order,
            }
        },
        setData({container, type}){
            if(this.isCopy){
                type.map(x=>{x.id = getRandomID()});
            }
            this.common = container.common;
            this.van_place = container.van_place?.split('|') || [''];
            if(!container.state){
                this.state = [];
            }else{
                this.state = container.state?.split('|');
            }
            this.consiginee = container.consiginee;
            this.remarks = container.remarks;
            this.pick_order = container.pick_order;
            this.pick_order_request = container.pick_order_request;
            this.send_pick_order = container.send_pick_order;
            this.$store.commit('form/containerClear');
            this.$store.commit('form/containerPushArray',type);
            this.$nextTick(
                ()=>this.$eventBus.$emit('container1Click')
            );
        },
        deleteType(i, id){
            if(this.container.length === 1){
                return false;
            }
            this.$store.commit('form/containerRemoveByIndex',i);
            this.$eventBus.$emit('deleteType', id);
        },
        vanDel(i){
            if(this.van_place.length === 1){
                return;
            }
            this.van_place.splice(i,1)
        }
    },
    mixins:[
        getOptionsAnsyc,
        common,
    ],
    components: { 
        TitleGroup,
    },
}
</script>
<style scoped>
.center > * + * {
    margin-bottom: 10px;
}
.container-input-title,
.container-input-group{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0;
}
.container-input-group div{
    width: 45%;
}
</style>
<style>
.single-line{
    display: flex;
    height: 2.2em;
    line-height: 2.2em;
    margin: 2px 0;
}

.single-line > .title{
    min-width: 7em ;
    border-radius: 5px 0 0 5px ;
    background: gray;
    color: white;
    text-align: center;
    
}
.vaning-box{
    text-align: right;
}
</style>