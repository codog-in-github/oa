<template>
    <el-dialog :visible="show" @close="close" :close-on-click-modal="false" :fullscreen="true">
        <template #title>
            <div class="title">请求书</div>
        </template>
        <el-form label-width="130px">
            <el-row>
                <el-col :span="12"><el-form-item label="〒"><el-input v-model="tel"></el-input></el-form-item></el-col>
                <el-col :span="12"><el-form-item label="請求番号："><el-input v-model="no"></el-input></el-form-item></el-col>
            </el-row>
            <el-row>
                <el-col :span="12"><el-form-item label="バンニング場所"><el-input v-model="booker_place"></el-input></el-form-item></el-col>
                <el-col :span="12"><el-form-item label="請求日："><el-input v-model="date"></el-input></el-form-item></el-col>
            </el-row>
            <el-row>
                <el-col :span="12"><el-form-item label="会社名"><el-input v-model="booker_name"></el-input></el-form-item></el-col>
            </el-row>
            <el-divider />
            <el-row v-for="(item, i) in orderExtra" :key="i"  :gutter="20">
                <el-col :span="item.length===2?12:22" v-for="(col, j) in item" :key="j">
                    <mulit-select :data="col" @deleteCol="deleteCol(item, j)" @setDefault="setDefault" ></mulit-select>
                </el-col>
                <el-col v-if="item.length===1" :span="2"><el-button type="primary" @click="addCol(item)">ADD</el-button></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button class="" style="width:100%" type="primary" @click="addRow">ADD</el-button>
                </el-col>
            </el-row>
            <el-divider />
            <el-table :data="detail">
                <el-table-column label="明細項目">
                    <template slot-scope="scope">
                        <el-autocomplete v-model="scope.row.item_name" @focus="getOptionsAnsyc(12, options.item)" :fetch-suggestions="itemSearch" @select="item=>setDefaultUnit(item, scope.row)"></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="詳細">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.detail"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="単価">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.price"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.num" controls-position="right"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="単位">
                    <template slot-scope="scope">
                        <el-autocomplete v-model="scope.row.unit" @focus="getOptionsAnsyc(13, options.unit)" :fetch-suggestions="unitSearch" ></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="消费税">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.tax">
                            <el-option label="免" value="免"></el-option>
                            <el-option label="課" value="課"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="金額">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.total" readonly :value="(scope.row.price || 0) * (scope.row.num || 0)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button class="el-icon-remove" type="danger" circle size="mini" @click="detailDel(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <el-button class="" style="width:100%" type="primary" @click="detailAdd">ADD</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="value" >&#91;&#42; 消費税対象金額 金额 &#93;</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="12" class="label">小計</el-col>
                <el-col :span="12"  class="value">&#91;&#42; 消費税対象金額 金额 &#93;</el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="label">消費税</el-col>
                <el-col :span="12" class="value" >&#91;&#42; 消費税対象金額 金额 &#93;</el-col>
            </el-row>
            <el-row class="sum">
                <el-col :span="12" class="label">御請求金額</el-col>
                <el-col :span="12" class="value">&#91;&#42; 消費税対象金額 金额 &#93;</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="24">
                    <el-form-item label="銀行">
                        <el-radio-group v-model="bank">
                            <el-radio label="三井住友銀行"></el-radio>
                            <el-radio label="姫路信用金庫"></el-radio>
                            <el-radio label="住信SBIネット銀行"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="地址">
                        <el-radio-group v-model="address">
                            <el-radio label="本社"></el-radio>
                            <el-radio label="九州営業所"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button type="primary">EXPORT</el-button>
            <el-button @click="close">CANCLE</el-button>
        </template>
    </el-dialog>
</template>
<script>
import MulitSelect from '@/components/MulitSelect.vue';
import { getOptionsAnsyc } from '@/mixin/main';
import { findInArray } from '@/assets/js/utils';
export default {
    components: { MulitSelect },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        bkgId: {
            type: String,
            default: '',
        }
    },
    data(){
        return {
            isLoaded: false,
            rate: 'JPY|USD|110.12',

            tel: '',
            no: '',
            booker_place: '',
            date: '',
            booker_name: '',
            orderExtra: [],
            detail: [],
            bank: '',
            address: '',

            options: {
                item: {item: [], loading: false},
                unit: {item: [], loading: false},
            }
        }
    },
    computed: {
    },
    methods: {
        close() {
            this.$emit('close');
        },
        loadData(reLoad = false){
            if(this.isLoaded && !reLoad){
                return ;
            }
            if(this.reLoad){
                this.orderExtra.splice(0, this.orderExtra.length);
            }
            this.isLoaded = true;
            this.$getBook(this.bkgId, ({data:{data:data}})=>{
                this.tel = data.tel || '';
                this.no = data.no || '';
                this.date = data.date || '';
                this.booker_place = data.booker_place || '';
                this.booker_name = data.booker_name || '';
                this.bank = data.bank || '';
                this.address = data.address || '';
                const len = 10 ;
                for(let i = 0; i<len; i+=2){
                    let row = [];
                    for(let j=0; j<2; j++){
                        if(data.extra[`label_${i+j}`] !== undefined){
                            row.push({
                                label:data.extra[`label_${i+j}`],
                                value:data.extra[`value_${i+j}`],
                            });
                        }
                    }
                    if(row.length>0){
                        this.orderExtra.push(row);
                    }
                }
            });
        },
        addCol(row){
            row.push({
                label: '',
                value: '',
            })
        },
        addRow(){
            this.orderExtra.push([{
                label: '',
                value: '',
            }]);
        },
        deleteCol(row, index) {
            row.splice(index, 1);
        },
        detailAdd(){
            this.detail.push({
                item_name: '',
                detail: '',
                price: '',
                num: '',
                unit: '',
                tax: '',
                total: '',
            })
        },
        detailDel(i){
            this.detail.splice(i,1);
        },
        itemSearch(str, cb){
            cb(this.options.item.item.filter(i=>i.label.indexOf(str||'') !== -1))
        },
        setDefaultUnit(item, row){
            row.unit = findInArray('extra', item.value, this.options.item.item, 'label');
        },
        unitSearch(str, cb){
            cb(this.options.unit.item)
        },
        setDefault(col){
            //todo
            return col + '1';
        }
    },
    mixins:[
        getOptionsAnsyc,
    ]
}
</script>
<style lang="less" scoped>
.title{
    text-align: center;
    font-weight: bold;
    font-size: 18px;
}
.sum{
    font-size: 20px;
    font-weight: bold;
}
.value{
    text-align: right;
}
</style>