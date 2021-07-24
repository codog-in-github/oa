<template>
    <div class="bkg-list">
        <header>
            <el-button
                size="mini"
                type="primary"
                class="el-icon-plus"
                @click="$router.push('/frame/form');"
            >
            NEW ORDER
            </el-button>
            <div class="input-box">
                <title-group
                    title="BKG DATE"
                >
                    <el-date-picker
                        v-model="condition.bkg_date"
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
                    title="BKG NO"
                >
                    <el-input
                        v-model="condition.bkg_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="BKG TYPE"
                >
                    <el-input
                        v-model="condition.bkg_type"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="INCOTERMS"
                >
                    <el-input
                        v-model="condition.incoterms"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="BKG STAFF"
                >
                    <el-input
                        v-model="condition.bkg_staff"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group
                    title="IN SALES"
                >
                    <el-input
                        v-model="condition.in_sales"
                        size="mini"
                    ></el-input>
                </title-group>
                <el-button
                    size="mini"
                    @click="clearCondition"
                    type="primary"
                    class="el-icon-delete"
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
                style="height:100%"
            >
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
                    prop="bkg_no"
                    label="BKG NO"
                >
                </el-table-column>
                <el-table-column
                    prop="bl_no"
                    label="B/L NO"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_type"
                    label="BKG TYPE"
                >
                </el-table-column>
                <el-table-column
                    prop="incoterms"
                    label="INCOTERMS"
                >
                </el-table-column>
                <el-table-column
                    prop="bkg_staff"
                    label="BKG STAFF"
                >
                </el-table-column>
                <el-table-column
                    prop="in_sales"
                    label="IN SALES"
                >
                </el-table-column>
                <el-table-column
                    v-if="$route.params.state !== 'delete'"
                    prop="id"
                    label="OPERATION"
                    width="220px"
                >
                    <template  slot-scope="scope">
                        <div style="text-align:center;">
                            <el-button
                                type="primary"
                                size="mini"
                                class="el-icon-edit"
                                @click="displayDetail(scope.row.id)"
                            >
                                EDIT
                            </el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                class="el-icon-delete"
                                @click="deleteHandler(scope.row.id,scope.$index)"
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
export default {
    data(){
        return {
            condition:{
                bkg_date:null,
                bkg_no:null,
                bl_no:null,
                bkg_type:null,
                incoterms:null,
                bkg_staff:null,
                in_sales:null,
            },
            page_size:50,
            page:1,
            total:0,
            list:[],
        }
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
                    this.list.push(...data.data.list);
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
        displayDetail(id){
            this.$router.push(`/frame/form/${id}`);
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
        }
    },
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