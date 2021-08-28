<template>
    <div class="right">
        <div class="title">
            コンテナ＆ドレージ詳細情報
        </div>
        <div>
            <el-button 
                v-for="({id,}, i) in container"
                ref="btn"
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
                v-for="(detail, i) in displayList"
                :no="i"
                :detailData="detail"
                :options="options"
                :key="detail.id"
                @add="addHandler"
                @copy="copyHandler"
                @load-options="getOptionsAnsyc"
            ></detail-item>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import DetailItem from '@/components/formitem/DetailItem.vue';
import { getRandomID, findInArray }  from '@/assets/js/utils'
import { common, getOptionsAnsyc } from '@/mixin/main'
export default {
    computed:{
        ...mapState('form',{
            container:state=>state.container.filter(i=>!i.delete_at),
            common:state=>state.common,
            booker:state=>state.booker,
        }),
        displayList(){
            return this.containerDetailList.filter(i=>
                i.container_id === this.displayContainerId
                && !i.delete_at
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
            },
            idMap:[],
        }
    },
    created(){
        this.$eventBus.$on('container1Click',()=>{
            this.containerButtonClickHandler(this.container[0]);
        });
        this.$eventBus.$on('bookerChange',(booker)=>{
            let changedIds = new Set();
            for(let detail of this.containerDetailList){
                if(!changedIds.has(detail.container_id)){
                    detail.transprotation = booker.booker;
                    detail.charge = booker.tel;
                    detail.field = booker.staff;
                    detail.field_tel = booker.staff_tel;
                    detail.booker_place = booker.place;
                    changedIds.add(detail.container_id);
                }
            }
            
        });
        this.$eventBus.$on('commonChange',(common)=>{
            let changedIds = new Set();
            for(let detail of this.containerDetailList){
                if(!changedIds.has(detail.container_id)){
                    detail.common = common;
                    changedIds.add(detail.container_id);
                }
            }
            
        });
        this.$eventBus.$on('containerTypeChange',(container_id,container_type)=>{
            for(let detail of this.containerDetailList){
                if(detail.container_id == container_id){
                    detail.container_type = container_type;
                    break ;
                }
            }
            
        });
        this.$eventBus.$on('deleteType', id =>{
            if(id === this.displayContainerId){
                this.displayContainerId = this.container[0].id;
            }
        })
        if(this.isCopy){
            this.$eventBus.$on('changeId',map=>{
                this.idMap = map;
            })
        }
    },
    methods:{
        containerButtonClickHandler(container){
            this.displayContainerId = container.id;
            if(this.displayList.length === 0){
                this.containerDetailList.push(this.createFirstEmptyContainerDetailData(container.id, container.container_type))
            }
        },
        addHandler(){
            this.containerDetailList.push(this.createEmptyContainerDetailData(this.displayContainerId, findInArray('container_type', this.displayContainerId, this.container)))
        },
        copyHandler(data){
            const copy = {...data};
            copy.id = getRandomID();
            this.containerDetailList.push(copy);
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
                field_tel:'',
                chassis:'',
                booker_place:'',
                vanning_date:'',
                vanning_during:'',
                free_pick_day:'',
                delete_at:'',
            };
            emptyData.id = getRandomID();
            emptyData.container_id = containerId;
            return emptyData;
        },
        createFirstEmptyContainerDetailData(containerId,container_type){
            const emptyData = {
                container_type,
                common:'',
                option:'',
                expenses:'',
                transprotation:'',
                charge:'',
                field:'',
                field_tel:'',
                chassis:'',
                booker_place:'',
                vanning_date:'',
                vanning_during:'',
                delete_at:'',
            };
            emptyData.id = getRandomID();
            emptyData.container_id = containerId;
            emptyData.common = this.common;
            emptyData.transprotation = this.booker.booker;
            emptyData.charge = this.booker.tel;
            emptyData.field = this.booker.staff;
            emptyData.field_tel = this.booker.staff_tel;
            emptyData.booker_place = this.booker.place;
            return emptyData;
        },
        getData(){
            return this.containerDetailList;
        },
        setData({detail}){
            if(this.isCopy){
                const clearCols = [
                    'vanning_date',
                    'free_pick_day',
                    'vanning_during',
                ];
                for(const d of detail){
                    d.container_id = this.idMap[d.container_id];
                    for(const col of clearCols){
                        d[col] = '';
                    }
                }
            }
            this.containerDetailList = detail;
            
        }
    },
    mixins:[
        getOptionsAnsyc,
        common
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