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
        ></form-item-selector>
        <form-item-selector 
            v-if="configs[1]"
            :config="configs[1]"
            :value="value[configs[1].params_name]"
            @change="changeHandler"
        ></form-item-selector>
        <form-item-selector 
            v-for="extra in extras"
            :config="extra"
            :key="extra.flag"
            @change="changeHandler"
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
        <div class="container-input-title">
            <span>Conntainer type</span><span>QUANTITY</span>
        </div>
        <div class="container-input-group">
            <span>1</span>
            <el-input size="mini"></el-input>
            <el-input size="mini"></el-input>
        </div>
        <div class="container-input-group">
            <span>2</span>
            <el-input size="mini"></el-input>
            <el-input size="mini"></el-input>
        </div>
        <div class="container-input-group">
            <span>3</span>
            <el-input size="mini"></el-input>
            <el-input size="mini"></el-input>
        </div>
        <div class="container-input-group">
            <span>4</span>
            <el-input size="mini"></el-input>
            <el-input size="mini"></el-input>
        </div>
        <div class="container-input-group">
            <span>5</span>
            <el-input size="mini"></el-input>
            <el-input size="mini"></el-input>
        </div>
        <div>
            <el-button type="primary">ENTER</el-button>
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
            extras:[],
        };
    },
    created(){
        this.loading=true;
        this.$containerConfig(({data})=>{
            this.configs = data.data;
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
            const flag = this.extras.length;
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
            this.extras.push(tmp);
        },
    },
    mixins:[
        formBoard,
    ]
}
</script>