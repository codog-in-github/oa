<template>
    <div class="right"
        v-loading="loading"
    >
        <div class="title">
            コンテナ＆ドレージ詳細情報
        </div>
        <div>
            <el-button 
                v-for="i in buttons"
                :key="i"
                type="primary" 
                size="mini"
                @click="displayDetail(i)"
            >button{{i+1}}</el-button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div class="detail-box">
            <div class="detail">
                <div class="flag">1</div>
                <div class="inputs">
                    <form-item-selector 
                        v-for="config in configs"
                        :config="config"
                        :key="config.id"
                        :value="value[config.params_name]"
                        @change="changeHandler"
                    ></form-item-selector>
                </div>
                <div class="buttons">
                    <el-button type="primary" size="mini">ADD</el-button>
                    <el-button type="primary" size="mini">COPY</el-button>
                    <el-button type="danger" size="mini">DEL</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { formBoard } from '@/mixin/main'
export default {
    created(){
        this.loading = true;
        this.$containerDetailConfig((({data})=>{
            this.configs = data.data;
            this.loading = false;
        }));
    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState('form',{
            containerTypeLength:state=>state.containerTypeLength
        }),
        buttons(){
            const btn = [];
            for(let i=0; i<this.containerTypeLength; i++){
                btn.push(i);
            }
            return btn;
        },
    },
    methods:{
        displayDetail(id){
            console.log(id)
        },
    },
    mixins:[
        formBoard
    ],
}
</script>
<style scoped>
.detail-box{
    width: 100%;
}
.detail{
    display: flex;
    justify-content: space-around;
    border: solid #000 1px;
}
.detail+.detail{
    margin-top: 4px;
}
.flag{
    flex: 0 0 2em;    
}
.inputs{
    width: 1px;
    flex: 1 1 10px;
    display: flex;
    flex-flow: wrap;
}
.inputs>div{
    width: 10em;
}
.buttons{
    display: flex;
    flex-flow: column;
    flex: 0 0  4em;
    align-items:inherit;
    justify-content: space-between;
}
.buttons>*{
    margin-left: 0;
}
</style>