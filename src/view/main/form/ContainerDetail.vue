<template>
    <div class="right">
        <div class="title">
            コンテナ＆ドレージ詳細情報
        </div>
        <div>
            <el-button 
                v-for="({id,}, i) in container"
                :key="id"
                type="primary" 
                size="mini"
                @click="containerButtonClickHandler(id)"
            >Container {{i+1}}</el-button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div class="detail-box">
            <detail-item
                v-for="detail in displayList"
                :detailData="detail"
                :key="detail.id"
                @add="addHandler"
            ></detail-item>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import DetailItem from '@/components/formitem/DetailItem.vue';
import {getRandomID} from '@/assets/js/utils'
export default {
    mounted(){
        this.$eventBus.$on('containerTypeChange',(containerId, newDdata)=>{
            console.log(containerId, newDdata);
        });
    },
    computed:{
        ...mapState('form',{
            container:state=>state.container
        }),
        displayList(){
            return this.containerDetailList.filter(i=>
                i.container_id === this.displayContainerId
                && i.state !== -1
            );
        }
    },
    data(){
        return {
            containerDetailList:[],
            displayContainerId:-1,
        }
    },
    methods:{
        containerButtonClickHandler(containerId){
            this.displayContainerId = containerId;
            if(this.displayList.length === 0){
                this.containerDetailList.push(this.createEmptyContainerDetailData(containerId))
            }
        },
        createEmptyContainerDetailData(containerId){
            const emptyData = {
                containerType:'',
                common:'',
                option:'',
                expenses:'',
                transprotation:'',
                charge:'',
                field:'',
                chassis:'',
                booker_place:'',
                vanning_date:'',
                vanning_during:'',
            };
            emptyData.id = getRandomID();
            emptyData.container_id = containerId;
            emptyData.bkg_id = 1;
            return emptyData;
        },
        addHandler(){
            this.containerDetailList.push(this.createEmptyContainerDetailData(this.displayContainerId))
        },
    },
    mixins:[
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