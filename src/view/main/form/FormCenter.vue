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
            <div class="container-input-group">
                <span>1</span>
                <form-item-selector 
                    v-for="containerType in containerTypeConfig"
                    :config="containerType"
                    :key="containerType.id"
                    @change="changeHandler"
                ></form-item-selector>
            </div>
            <div class="container-input-group"
                v-for="extra in containerTypeConfigs"
                :key="extra.flag"
            >
                <span>{{extra.flag+2}}</span>
                <form-item-selector 
                    v-for="containerType in extra.config"
                    :config="containerType"
                    :key="containerType.id+'_'+extra.flag"
                    @change="changeHandler"
                ></form-item-selector>
            </div>
            <div>
                <el-button
                    type="primary"
                    @click="containerTypeAddHandler"
                >ENTER</el-button>
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
export default {
    data(){
        return{
            extraVanPlaceConfigs:[],
            containerTypeConfig:[],
            containerTypeConfigs:[],
        };
    },
    created(){
        this.$store.commit('form/setContainerTypeLength',this.containerTypeConfigs.length+1);
        this.loading=true;
        this.$containerConfig(({data})=>{
            this.configs = data.data['container'];
            this.containerTypeConfig = data.data['containerType'];
            this.loading = false
        });
    },
    computed:{
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
            const flag = this.containerTypeConfigs.length;
            const limit = 6;
            if(flag>=limit){
                this.$notify.error({
                    title: 'error',
                    message: `max ${limit+1}`,
                });
                return ;
            }
            const tmp = {
                flag,
                config:[
                    {...this.containerTypeConfig[0]},
                    {...this.containerTypeConfig[1]}
                ],
            }
            tmp.config[0].params_name += flag;
            tmp.config[1].params_name += flag;
            this.containerTypeConfigs.push(tmp);
            this.$store.commit('form/setContainerTypeLength',flag+2);
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