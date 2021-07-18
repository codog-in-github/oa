<template>
    <div class="right">
        <div class="title">
            コンテナ＆ドレージ詳細情報
        </div>
        <div>
            <el-button 
                v-for="({id,}, i) in container"
                :key="id"
                :type="displayContainerId === id?'primary':''" 
                size="mini"
                @click="containerButtonClickHandler(container[i])"
            >Container {{i+1}}</el-button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div class="detail-box">
            <detail-item
                v-for="detail in displayList"
                :detailData="detail"
                :options="options"
                :key="detail.id"
                @add="addHandler"
                @load-options="getOptionsAnsyc"
            ></detail-item>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import DetailItem from '@/components/formitem/DetailItem.vue';
import { getRandomID, findInArray }  from '@/assets/js/utils'
import { getOptionsAnsyc } from '@/mixin/main'
export default {
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
            options:{
                containerType:{
                    item:[],
                    loading:false,
                }
            }
        }
    },
    mounted(){
    },
    beforeDestroy(){
    },
    methods:{
        containerButtonClickHandler(container){
            this.displayContainerId = container.id;
            if(this.displayList.length === 0){
                this.containerDetailList.push(this.createEmptyContainerDetailData(container.id, container.container_type))
            }
        },
        addHandler(){
            this.containerDetailList.push(this.createEmptyContainerDetailData(this.displayContainerId, findInArray('container_type', this.displayContainerId, this.container)))
        },
        createEmptyContainerDetailData(containerId,container_type){
            const emptyData = {
                container_type,
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
    },
    mixins:[
        getOptionsAnsyc
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