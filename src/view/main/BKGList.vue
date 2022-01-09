<template>
    <div class="bkg-list">
        <header>
            <div class="input-box">
                <el-input v-model="condition.bkg_no" placeholder="BKG NO" size="mini" />
                <el-input v-model="condition.bl_no" placeholder="B/L NO" size="mini"/>
                <el-input v-model="condition.pol" placeholder="POL" size="mini" />
                <el-input v-model="condition.pod" placeholder="POD" size="mini"/>
                <el-input v-model="condition.booker" placeholder="BOOKER" size="mini"/>
                <el-input v-model="condition.dg" placeholder="社内管理番号" size="mini" />
                <el-button type="primary" size="mini" @click="reLoad">SEARCH</el-button>
                <el-button size="mini" @click="clearCondition">CLEAR</el-button>
            </div>
            <el-button class="add" v-if="showNewOrder" size="mini" type="primary" @click="addNewOrder"><span class="el-icon-plus" /> 新規作成</el-button>
        </header>
        <main>
            <el-table border stripe size="mini" :data="list" height="100%" :header-cell-style="{
                background:'#409eff',
                color:'#fff',
                fontSize:'16px'
            }">
                <el-table-column prop="company_no" label="管理番号" width="100px" align="center"/>
                <el-table-column prop="show_cy_cut" label="CUT" sortable :formatter="dateFormat" width="100px" align="center"/>
                <el-table-column prop="bkg_date" label="BKG" sortable :formatter="dateFormat" width="100px" align="center"/>
                <el-table-column prop="booker" label="BOOKER" width="180px" />
                <el-table-column prop="ld" label="POL/POD" width="180px" />
                <el-table-column prop="bkg_no" label="BKG NO" width="150px" />
                <el-table-column prop="quantity" label="QTY" width="50px" />
                <el-table-column prop="container_type" label="CT TYPE" width="100px" />
                <el-table-column label="状態" width="350px">
                    <template slot-scope="scope">
                        <el-select v-if="!showRestore" v-model="scope.row.state" multiple @change="changeState(scope.row.id, scope.row.state)" @focus="getOptionsAnsyc(10, options.state)" class="state">
                            <el-option v-for="{id, value, label} in options.state.item" :key="id" :value="value" :label="label" />
                        </el-select>
                        <div v-else>{{scope.row.state.join('|')}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="OPERATION" width="320px"
                >
                    <template  slot-scope="scope">
                        <div style="text-align:center;">
                            <el-button v-if="showEdit" type="primary" size="mini" class="el-icon-edit" @click="doEdit(scope.row.id)">EDIT</el-button>
                            <el-button v-if="showDetail" type="primary" size="mini" class="el-icon-view" @click="displayDetail(scope.row.id)">DETAIL</el-button>
                            <el-button v-if="showPrevious" type="primary" size="mini" class="el-icon-d-arrow-left" @click="changeStep(scope.row.id, scope.$index, false)">PREV</el-button>
                            <el-button v-if="showNext" type="primary" size="mini" class="el-icon-d-arrow-right" @click="changeStep(scope.row.id, scope.$index)">NEXT</el-button>
                            <el-button v-if="showDelete" type="danger" size="mini" class="el-icon-delete" @click="deleteHandler(scope.row.id, scope.$index)">DELETE</el-button>
                            <el-button v-if="showRestore" type="success" size="mini" class="el-icon-circle-check" @click="deleteHandler(scope.row.id, scope.$index, false)">RESTORE</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </main>
        <footer>
            <el-pagination background :page-sizes="[10, 50, 100]" :page-size="page_size" layout="sizes,total, prev, pager, next" :total="total" @size-change="sizeChangeHandler" @current-change="pageChangeHandler"/>
        </footer>
        <el-dialog :visible="newOrder" @close="newOrder = false" @open="copy_no = ''" title="NEW ORDER">
            BKG NO:<el-input v-model="copy_no"></el-input>
            <template #footer>
                <el-button @click="getOrderID" type="primary">{{copy_no === ''? 'ADD' : 'COPY'}}</el-button>
                <el-button @click="newOrder = false">CANCLE</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main'

export default {
    mixins:[
        getOptionsAnsyc
    ],
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
            newOrder: false,
            copy_no:'',
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
                || this.$route.params.state == 'ready'
                || this.$route.params.state == 'complete';
        },
        showDetail(){
            return this.$route.params.state != 'normal'
                && this.$route.params.state != 'ready'
                && this.$route.params.state != 'draft';
        },
        showEdit(){
            return this.$route.params.state == 'normal'
                || this.$route.params.state == 'ready'
                || this.$route.params.state == 'draft';
        },
        showDelete(){
            return this.$route.params.state == 'normal';
        },
        showRestore(){
            return this.$route.params.state == 'delete';
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
        },
        addNewOrder(){
            this.newOrder = true;
            // this.$router.push('/frame/form');
        },
        getOrderID(){
            if(this.copy_no === ''){
                this.$router.push('/frame/form');
            }else{
                this.$getOrderID(this.copy_no,({data})=>{
                    let id = data.data;
                    if(id){
                        this.$router.push(`/frame/form/${id}/copy`);
                    }else{
                        this.$notify({
                            title: 'ERROR',
                            message: 'CAN NOT FOUND THIS ORDER',
                            type: 'error'
                        });
                    }
                })
            }
        }
    },
}
</script>
<style lang="less" scoped>
.bkg-list{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;

    * {
        flex: 0 0 auto;
    }

    main{
        flex: 1 1 auto;
        height: 1px;
        overflow: auto !important;
    }
}
header{
    line-height: 2rem;

    .el-input{
        width: 10%;
    }
}
.header-row{
    background: gray;
}
.input-box> *:nth-child(n+2){
    margin-left: 1em;
}


footer{
    margin-top: 1em;
    text-align: right;
}
.state{
    width: 100% ;

    /deep/ .el-tag {
        font-size: 20px;
        color: #000;
    }
}
/deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
    background: #f2f2f4;
}
.add{
    margin: 1em 0;
}
</style>
