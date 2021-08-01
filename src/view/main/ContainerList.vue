<template>
    <div class="bkg-list">
        <header>
            <el-button
                style="visibility:hidden;"
            >
            占位
            </el-button>
            <div class="input-box">
                <title-group
                    title="バンニング日"
                >
                    <el-date-picker
                        v-model="condition.vanning_date"
                        range-separator="to"
                        unlink-panels
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        type="daterange"
                        size="mini"
                        style="width:auto"
                    ></el-date-picker>
                </title-group>
                <title-group
                    title="バンニング場所"
                >
                    <el-input
                        v-model="condition.booker_place"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="運送業"
                >
                    <el-input
                        v-model="condition.transprotation"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="CUT DATE"
                >
                    <el-date-picker
                        v-model="condition.cy_cut"
                        range-separator="to"
                        unlink-panels
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        type="daterange"
                        size="mini"
                        style="width:auto"
                    ></el-date-picker>
                </title-group>
                <title-group
                    title="BOOKER"
                >
                    <el-input
                        v-model="condition.booker"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="BKG NO"
                >
                    <el-input
                        v-model="condition.bkg_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <el-button
                    size="mini"
                    @click="clearCondition"
                    type="primary"
                    class="el-icon-refresh-right"
                >
                    CLEAR
                </el-button>
            </div>
            <el-button
                type="primary"
                size="mini"
                class="el-icon-search"
                @click="reLoad"
            >
                SEARCH
            </el-button>
        </header>
        <main>
            <el-table
                border
                stripe
                size="mini"
                :data="list"
                :header-cell-style="{
                    background:'#8BABCD',
                    color:'#fff',
                    fontSize:'16px'
                }"
                height="100%"
            >
                <el-table-column
                    prop="vanning_date"
                    label="バンニング日"
                    sortable
                    :formatter="dateFormat"
                    width="150px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="booker_place"
                    label="バンニング場所"
                >
                </el-table-column>
                <el-table-column
                    prop="transprotation"
                    label="運送業"
                >
                </el-table-column>
                <el-table-column
                    prop="cy_cut"
                    label="CUT DATE"
                    sortable
                    :formatter="dateFormat"
                    width="130px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_date"
                    label="BKG DATE"
                    sortable
                    :formatter="dateFormat"
                    width="130px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="booker"
                    label="BOOKER"
                >
                </el-table-column>
                <el-table-column
                    prop="ld"
                    label="POL/POD"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_no"
                    label="BKG NO"
                >
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="OPERATION"
                    width="220px"
                >
                    <template  slot-scope="scope">
                        <div style="text-align:center;">
                            <el-button
                                v-if="showDetail"
                                type="primary"
                                size="mini"
                                class="el-icon-view"
                                @click="displayDetail(scope.row.bkg_id)"
                            >
                                DETAIL
                            </el-button>
                            <el-button
                                class="el-icon-finished"
                                type="success"
                                size="mini"
                            >
                                confirm
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </main>
        <footer>
            <el-pagination
                background
                :page-sizes="[10, 50, 100, 500]"
                :page-size="page_size"
                layout="sizes,total, prev, pager, next"
                :total="total"
                @size-change="sizeChangeHandler"
                @current-change="pageChangeHandler"
            >
            </el-pagination>
        </footer>
    </div>
</template>
<script>
import TitleGroup from '../../components/titleGroup.vue'
import { getOptionsAnsyc } from '@/mixin/main'
export default {
    data(){
        return {
            condition:{
                vanning_date:[],
                booker_place:'',
                transprotation:'',
                cy_cut:[],
                booker:'',
                bkg_no:'',

            },
            page_size:50,
            page:1,
            total:0,
            list:[],
            options:{
                state:{item:[],loading:false,},
            },
            stateChangeTimer:-1,
        }
    },
    computed:{
        showDetail(){
            return this.$route.params.state != 'normal';
        },
    },
    mounted(){
        this.reLoad();
    },
    methods:{
        reLoad(){
            this.$getContainerList(
                {
                    condition:this.condition,
                    page_size:this.page_size,
                    page:(this.page || 1) -1,
                    state:this.$route.params.state || ''
                },
                ({data})=>{
                    this.list.splice(0, this.list.length);
                    this.list.push(...data.data.list);
                    this.total = parseInt(data.data.total);
                    this.page = data.data.page;
                }
            );
        },
        dateFormat(row, column, cellValue){
            return cellValue.substr(0,10);
        },
        sizeChangeHandler(size){
            this.page_size = size;
            this.reLoad();
        },
        pageChangeHandler(current){
            this.page = current;
            this.reLoad();
        },
        doEdit(id){
            this.$router.push(`/frame/form/${id}/edit`);
        },
        displayDetail(id){
            this.$router.push(`/frame/form/${id}/view`);
        },
        deleteHandler(id,index, isDelete=true){
            this.$deleteOrder(id, isDelete, ()=>{
                this.list.splice(index,1);
            });
        },
        clearCondition(){
            for(const k in this.condition){
                this.condition[k] = '';
            }
            this.reLoad();
        },
        changeStep(id, index, isNext = true){
            const step = [
                'normal',
                'draft',
                'ready',
                'complete',
            ];
            this.$changeOrderStep(
                id,
                step[step.indexOf(this.$route.params.state) + (isNext?1:-1)],
                ()=>{
                    this.list.splice(index,1);
                }
            );
        },
        changeState(id ,val){
            console.log(id ,val);
            clearTimeout(this.stateChangeTimer);
            this.stateChangeTimer = setTimeout(()=>{
                this.$changeOrderState(id, val.join('|'), ()=>{
                    this.$notify({
                        title: 'SUCCESS',
                        message: 'CHANGE SUCCESS',
                        type: 'success'
                    });
                });
            },1000);
        }
    },
    mixins:[
        getOptionsAnsyc
    ],
    components: { TitleGroup },
}
</script>
<style scoped>
.bkg-list{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
}
.bkg-list > *{
    flex: 0 0 auto;
}
.bkg-list main{
    flex: 1 1 auto;
    height: 1px;
    overflow: auto !important;
}
header{
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1em;
}
.header-row{
    background: gray;
}
.input-box{
    display: flex;
    margin: 0 10px;
    align-items: flex-end;
}
.input-box>* + *{
    margin-left: 1em;
}
footer{
    margin-top: 1em;
    text-align: right;
}
</style>