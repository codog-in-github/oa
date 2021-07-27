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
            ></el-input>
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
                v-for="(single, i) in container"
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
    </div>
</template>
<script>
import { mapState } from 'vuex';
import TitleGroup from '@/components/titleGroup';
import { getOptionsAnsyc, common } from '@/mixin/main'

export default {
    data(){
        return{
            common:'PLASTIC',
            van_place:[''],
            remarks:null,
            state:[],

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
                remarks:this.remarks,
                container:this.container,
                state:this.state.join('|'),
            }
        },
        setData({container,type}){
            
            this.common = container.common;
            this.van_place = container.van_place?.split('|') || [''];
            if(!container.state){
                this.state = [];
            }else{
                this.state = container.state?.split('|');
            }
            this.remarks = container.remarks;
            this.$store.commit('form/containerClear');
            this.$store.commit('form/containerPushArray',type);
            this.$nextTick(
                ()=>this.$eventBus.$emit('container1Click')
            );
        },
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