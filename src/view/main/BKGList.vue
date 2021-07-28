<template>
    <div class="bkg-list">
        <header>
            <el-button
                v-if="showNewOrder"
                size="mini"
                type="primary"
                class="el-icon-plus"
                @click="$router.push('/frame/form');"
            >
            NEW ORDER
            </el-button>
            <el-button
                v-if="!showNewOrder"
                style="visibility:hidden;"
            >
            NEW ORDER
            </el-button>
            <div class="input-box">
                <!-- <title-group
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
                </title-group> -->
                <title-group
                    title="BKG NO"
                >
                    <el-input
                        v-model="condition.bkg_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="B/L NO"
                >
                    <el-input
                        v-model="condition.bl_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="POL"
                >
                    <el-input
                        v-model="condition.pol"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="POD"
                >
                    <el-input
                        v-model="condition.pod"
                        size="mini"
                    ></el-input>
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
                    title="社内管理番号"
                >
                    <el-input
                        v-model="condition.dg"
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
                    prop="cy_cut"
                    label="CUT DATE"
                    sortable
                    :formatter="dateFatter"
                    width="130px"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_date"
                    label="BKG DATE"
                    sortable
                    :formatter="dateFatter"
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
                    prop="quantity"
                    label="QUANTITY"
                >
                </el-table-column>
                <el-table-column
                    prop="container_type"
                    label="CONTAINER TYPE"
                >
                </el-table-column>
                <el-table-column
                    label="状態"
                >
                    <template slot-scope="scope">
                        <el-select
                            
                            v-model="scope.row.state"
                            size="mini"
                            multiple
                            @change="changeState(scope.row.id, scope.row.state)"
                            @focus="getOptionsAnsyc(10, options.state)"
                        >
                            <el-option
                                v-for="{id, value, label} in options.state.item"
                                :key="id"
                                :value="value"
                                :label="label"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="in_sales"
                    label="IN SALES"
                >
                </el-table-column> -->
                <el-table-column
                    v-if="$route.params.state !== 'delete'"
                    prop="id"
                    label="OPERATION"
                    width="220px"
                >
                    <template  slot-scope="scope">
                        <div style="text-align:center;">
                            <el-button
                                v-if="showEdit"
                                type="primary"
                                size="mini"
                                class="el-icon-edit"
                                @click="doEdit(scope.row.id)"
                            >
                                EDIT
                            </el-button>
                            <el-button
                                v-if="showDetail"
                                type="primary"
                                size="mini"
                                class="el-icon-view"
                                @click="displayDetail(scope.row.id)"
                            >
                                DETAIL
                            </el-button>
                             <el-button
                                v-if="showPrevious"
                                type="primary"
                                size="mini"
                                class="el-icon-d-arrow-left"
                                @click="changeStep(scope.row.id, scope.$index, false)"
                            >
                                PREV
                            </el-button>
                             <el-button
                                v-if="showNext"
                                type="primary"
                                size="mini"
                                class="el-icon-d-arrow-right"
                                @click="changeStep(scope.row.id, scope.$index)"
                            >
                                NEXT
                            </el-button>
                            <el-button
                                v-if="showDelete"
                                type="danger"
                                size="mini"
                                class="el-icon-delete"
                                @click="deleteHandler(scope.row.id, scope.$index)"
                            >
                                DELETE
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
                // cy_cut:null,
                bkg_no:'',
                bl_no:'',
                pod:'',
                pol:'',
                booker:'',
                dg:'',
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
        showNewOrder(){
            return this.$route.params.state != 'delete';
        },
        showNext(){
            return this.$route.params.state == 'normal'
                || this.$route.params.state == 'draft'
                || this.$route.params.state == 'ready';
        },
        showPrevious(){
            return this.$route.params.state == 'draft'
                || this.$route.params.state == 'complete';
        },
        showDetail(){
            return this.$route.params.state != 'normal';
        },
        showEdit(){
            return this.$route.params.state == 'normal';
        },
        showDelete(){
            return this.$route.params.state == 'normal';
        },
    },
    mounted(){
        this.reLoad();
    },
    methods:{
        reLoad(){
            this.$getList(
                {
                    condition:this.condition,
                    page_size:this.page_size,
                    page:(this.page || 1) -1,
                    state:this.$route.params.state || ''
                },
                ({data})=>{
                    this.list.splice(0, this.list.length);
                    this.list.push(...data.data.list.map(i=>{
                        if(!i.state){
                            i.state = [];
                        }else{
                            i.state = i.state.split('|');
                        }
                        return i;
                    }));
                    this.total = parseInt(data.data.total);
                    this.page = data.data.page;
                }
            );
        },
        dateFatter(row, column, cellValue){
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
        deleteHandler(id,index){
            this.$deleteOrder(id,()=>{
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