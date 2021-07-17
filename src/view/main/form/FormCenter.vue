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
                v-for="(id, i) in container"
                :key="i"
            >
                <span>{{i+1}}</span>
                <el-select 
                    size="mini"
                    v-model="container[i].container_type">
                </el-select>
                <el-input 
                    size="mini"
                    type="number"
                    v-model="container[i].quantity">
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
                title="REMARKS"
            >
                <el-input
                    type="textarea"
                    v-model="remarks"
                ></el-input>
            </title-group>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import TitleGroup from '@/components/titleGroup';

export default {
    data(){
        return{
            common:null,
            van_place:[''],
            remarks:null,

            extraVanPlaceConfigs:[],
            containerTypeConfig:[],
            containerTypeConfigs:[],
        };
    },
    created(){
        if(!this.bkgId){
            this.$store.commit('form/containerClear');
            this.$store.commit('form/containerAddNew');
            
        }
    },
    computed:{
        ...mapState('form',{
            container:state=>state.container,
            bkgId:state=>state.bkgId
        }),
    },
    methods:{
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
        }
    },
    mixins:[
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