<template>
    <div 
        class="center"
        v-loading="loading"
        >
        <div class="title">コンテナ情報</div>
        <form-item-selector 
            v-if="configs[0]"
            :config="configs[0]"
            :value="value[configs[0].params_name]"
            @change="changeHandler"
            class="single-line"
        ></form-item-selector>
        <form-item-selector 
            v-if="configs[1]"
            :config="configs[1]"
            :value="value[configs[1].params_name]"
            @change="changeHandler"
            class="single-line"
        ></form-item-selector>
        <form-item-selector 
            v-for="extra in extraVanPlaceConfigs"
            :config="extra"
            :key="extra.flag"
            @change="changeHandler"
            class="single-line"
        ></form-item-selector>
        <div>
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
                v-for="(id, index) in containerTypeIds"
                :key="id"
            >
                <span>{{index+1}}</span>
                <form-item-selector 
                    v-for="containerType in containerTypeConfig"
                    :config="containerType"
                    :key="containerType.id+'_'+id"
                    @change="changeHandler"
                ></form-item-selector>
            </div>
            <div style="text-align:right">
                <el-button
                    type="primary"
                    size="mini"
                    @click="containerTypeAddHandler"
                >add</el-button>
            </div>
        </div>
        <form-item-selector 
            v-if="configs[2]"
            :config="configs[2]"
            :value="value[configs[2].params_name]"
            @change="changeHandler"
        ></form-item-selector>
    </div>
</template>
<script>
import {formBoard} from '@/mixin/main.js'
import { mapState } from 'vuex';
export default {
    data(){
        return{
            extraVanPlaceConfigs:[],
            containerTypeConfig:[],
            containerTypeConfigs:[],
        };
    },
    created(){
        this.$store.commit('form/clearContainerTypeId');
        this.loading=true;
        this.$containerConfig(({data})=>{
            this.configs = data.data['container'];
            this.containerTypeConfig = data.data['containerType'];
            this.loading = false
        });
    },
    computed:{
        ...mapState('form',{
            containerTypeIds:state=>state.containerTypeIds,
        }),
        changeHandlerExtra(flag){
            return (data, name) => {
                console.log(flag, data, name);
                this.value[`${name}${flag}`] = data;
            }
        },
    },
    methods:{
        vannningPlaceAddHandler(){
            const flag = this.extraVanPlaceConfigs.length;
            const limit = 4;
            if(flag>=limit){
                this.$notify.error({
                    title: 'error',
                    message: `max ${limit+1}`,
                });
                return ;
            }
            const tmp = {
                flag,
                ...this.configs[1],
            }
            tmp.params_name += flag;
            tmp.title += flag+1;
            this.extraVanPlaceConfigs.push(tmp);
        },
        containerTypeAddHandler(){
            if(this.containerTypeIds.length >=6){
                 this.$notify.error({
                    title: 'error',
                    message: `max 6`,
                });
            }else{
                this.$store.commit('form/addContainerTypeId',Math.random());
            }
        }
    },
    mixins:[
        formBoard,
    ]
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
</style>