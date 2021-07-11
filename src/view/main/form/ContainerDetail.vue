<template>
    <div class="right"
        v-loading="loading"
    >
        <div class="title">
            コンテナ＆ドレージ詳細情報
        </div>
        <div>
            <el-button 
                v-for="(id, key) in containerTypeIds"
                :key="key"
                type="primary" 
                size="mini"
                @click="displayDetail(id)"
            >button{{key+1}}</el-button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div class="detail-box">
            <detail-item
                v-for="id in displayList"
                :detail-id="id"
                :key="id"
                :detail-configs="configs"
                @add="addHandler"
                @copy="addHandler"
            ></detail-item>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { formBoard } from '@/mixin/main'
import DetailItem from '@/components/formitem/DetailItem.vue';
export default {
    created(){
        this.loading = true;
        this.$containerDetailConfig(({data})=>{
            this.configs = data.data;
            this.loading = false;
        });
    },
    computed:{
        ...mapState('form',{
            containerTypeIds:state=>state.containerTypeIds
        }),
    },
    data(){
        return {
            displayList:[],
            containerIdMap:{},
            displayContainerId:-1,
        }
    },
    methods:{
        copyToDispaly(){
            this.displayList = this.containerIdMap[this.displayContainerId];
        },
        displayDetail(id){
            this.displayContainerId = id;
            if(!this.containerIdMap[this.displayContainerId]?.length>0){
                this.containerIdMap[this.displayContainerId] = [Math.random()];
            }
            this.copyToDispaly();
            
        },
        addHandler(){
            this.containerIdMap[this.displayContainerId].push(Math.random())
            this.copyToDispaly();
        }
    },
    mixins:[
        formBoard
    ],
    components: { 
        DetailItem 
    },
}
</script>
<style scoped>
.right{
    overflow:auto;
}
.detail-box{
    width: 100%;
}
</style>