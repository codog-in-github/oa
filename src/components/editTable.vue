<template>
    <div>
        <el-table :data='data' stripe border
            @filter-change="filterHandler"
            @sort-change="sortHandler"
            @header-contextmenu="addcons"
            > 
            <el-table-column 
                sortable
                v-for="{id, col, name, type, detail} in cols" 
                :key="id"
                :prop="col"
                :column-key="col"
                :filters="filters(type, detail)"
                :label="name">
            <!-- 可编辑单元格 start -->
                <template 
                    slot-scope="scope" >
                    <div @click.prevent="doEdit(`${scope.$index}_${id}`)"
                        style="min-height:30px">
                        <multi-input 
                            :type="type"
                            :detail="detail"
                            :col_id="id"
                            :index="scope.$index"
                            :col="col"
                            :data="data"
                            :editCell="editCell"
                            @blur="editComplete"
                            />
                    </div>
                </template>
            <!-- 可编辑单元格 end -->
            </el-table-column>
            <el-table-column>
                <template slot="header">
                    <el-button>search&nbsp;order</el-button>
                </template>
                <template 
                    slot-scope="scope">
                    <el-button 
                        class="el-icon-circle-check" 
                        type="success" 
                        circle
                        @click.native.prevent ="save(scope)"
                        title="save"
                        >
                    </el-button>
                    <el-button 
                        v-if="scope.row.isNewData !== true"
                        class="el-icon-delete" 
                        type="danger" 
                        circle
                        @click.native.prevent ="remove(scope)"
                        title="delete"
                        >
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button 
            type="success" 
            class="el-icon-plus"
            @click.native.prevent="addNewRow"
            >
            add new row
        </el-button>
        <el-dialog 
            :title="dialog.title" 
            :visible="dialog.visible"
            >
            <el-input v-model="dialog.val"/>
            <el-button slot="footer" type="sucess">add</el-button>
        </el-dialog>
    </div>
</template>
<script>
import MultiInput from './multiInput'

export default {
    props:['cols', 'data'],
    data(){
        return {
            editCell:'',
            map:{},
            order:[],
            dialog:{
                title:'add',
                visible:false,
                target:'',
                var:'',
            }
        }
    },
    computed:{
    },
    methods:{
        filters(type, detail){
            switch(type){
                case 'select':{
                    let arr = [];
                    for(let i in detail){
                        arr.push({
                            text:detail[i].opt,
                            value:detail[i].id,
                        });
                    }
                    return arr;
                }
                default :{
                    return null;
                }
            }
        },
        addcons({columnKey}, event){
            event.returnValue = false;
            let col;
            for(let i in this.cols){
                if(this.cols[i].col == columnKey){
                    col = this.cols[i];
                    break;
                }
            }
            switch(col.type){
                case 'text':{
                    this.dialog.visible = true;
                }
            }

        },
        remove({$index}){
            this.data.splice($index,1);
            // do more
        },
        
        save({row}){
            console.log(row);
        },
        doEdit(key){
            this.editCell = key;
        },
        editComplete(){
            this.editCell = '';
        },
        addNewRow(){
            let tmpData = {};
            this.cols.forEach((v) => {
                tmpData[v.col] = '';
            });
            tmpData.isNewData = true;
            let n = this.data.push(tmpData);
            this.editCell = n-1 + '_1'
        },
        filterHandler(){
           this.data.splice(0,this.data.length,...[]);
        },
        sortHandler(){
           this.data.splice(0,this.data.length,...[]);
        },
    },
    components:{
        MultiInput,
    }
}
</script>