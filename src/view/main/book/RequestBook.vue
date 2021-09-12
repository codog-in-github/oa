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
            <el-row v-for="(item, i) in extra" :key="i"  :gutter="20">
                <el-col :span="item.length===2?12:22" v-for="(col, j) in item" :key="j">
                    <mulit-select :data="col" @deleteCol="deleteCol(item, j)" @select="value=>setDefaultExtra(value,col)" ></mulit-select>
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
                        <el-input-number v-if='scope.row.currency' v-model="scope.row.detail" controls-position="right"></el-input-number>
                        <el-input v-else v-model="scope.row.detail" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column width="100px">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.currency" placeholder="">
                            <el-option label="" value=""></el-option>
                            <el-option label="$" value="USD"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="単価">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.price" controls-position="right"></el-input-number>
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
                        <el-input :value="scope.row.total.toFixed(2)" readonly></el-input>
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
                <el-col :span="24" class="value" >&#91;&#42;消費税対象金額  {{inTak.toFixed(2)}} &#93;</el-col>
            </el-row>
            <el-divider />
            <el-row>
                <el-col :span="12" class="label">小計</el-col>
                <el-col :span="12"  class="value">&#91;&#42; {{subtotal.toFixed(2)}} &#93;</el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="label">消費税</el-col>
                <el-col :span="12" class="value" >&#91;&#42; {{takTotal.toFixed(2)}} &#93;</el-col>
            </el-row>
            <el-row class="sum">
                <el-col :span="12" class="label">御請求金額</el-col>
                <el-col :span="12" class="value">&#91;&#42; {{sum.toFixed(2)}} &#93;</el-col>
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
            <el-button type="primary" @click="beDownload" v-if="!readonly">EXPORT</el-button>
            <el-button @click="close">CANCLE</el-button>
        </template>
    </el-dialog>
</template>
<script>
import MulitSelect from '@/components/MulitSelect';
import { getOptionsAnsyc } from '@/mixin/main';
import { findInArray, getRandomID, postNewWindow } from '@/assets/js/utils';
import { URL } from '@/api/main'

const RATE = 'EXCH';
let extraDefault = {};
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
        },
        readonly:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            isLoaded: false,

            id:'',
            tel: '',
            no: '',
            booker_place: '',
            date: '',
            booker_name: '',
            extra: [],
            detail: [],
            bank: '',
            address: '',

            options: {
                item: {item: [], loading: false},
                unit: {item: [], loading: false},
            },
            
            fromList: undefined,
            fromListCopy: undefined,
        }
    },
    computed: {
        rate(){
            for(const row of this.extra){
                for(const col of row){
                    if(col.label === RATE){
                        return col.value;
                    }
                }
            }
            return false;
        },
        inTak(){
            return this.detail
                .filter(current=>current.tax === '課')
                .reduce((prev,current)=>prev+current.total, 0)
        },
        subtotal(){
            return this.detail
                .reduce((prev,current)=>prev+current.total, 0)
        },
        takTotal(){
            return this.inTak * 0.1;
        },
        sum(){
            return this.subtotal + this.takTotal;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        loadData(bkgId,copyBkgId,reLoad = false){
            if(bkgId){
                this.fromList = bkgId
            }
            if(copyBkgId){
                this.fromListCopy = copyBkgId
            }
            if(this.isLoaded && !reLoad){
                return ;
            }
            this.isLoaded = true;
            if(reLoad){
                console.log('reload')
                this.extra = [];
                this.detail = [];
            }
            this.$getBook({
                    bkg_id:bkgId || this.bkgId,
                    copy_bkg_id:copyBkgId || ''
                }, ({data:{data:data}})=>{
                this.id = data.id || getRandomID();
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
                        if(data.extra[`label_${i+j}`] !== undefined
                        && !(i !== 0 && !data.extra[`label_${i+j}`] && !data.extra[`value_${i+j}`])){
                            row.push({
                                label:data.extra[`label_${i+j}`],
                                value:data.extra[`value_${i+j}`],
                            });
                        }
                    }
                    if(row.length>0){
                        this.extra.push(row);
                    }
                }
                this.detail.push(...data.detail);
                extraDefault = data.extraDefault;
            });
        },
        addCol(row){
            row.push({
                label: '',
                value: '',
            })
        },
        addRow(){
            this.extra.push([{
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
                currency: '',
                price: '',
                num: '',
                unit: '',
                tax: '免',
                total: 0,
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
        beDownload(){
            postNewWindow(URL.REQUESTBOOK,{
                id: this.id,
                bkg_id: this.fromList || this.bkgId,
                tel: this.tel,
                no: this.no,
                booker_place: this.booker_place,
                date: this.date,
                booker_name: this.booker_name,
                extra: JSON.stringify(this.extra),
                detail: JSON.stringify(this.detail),
                bank: this.bank,
                address: this.address,
                
                in_tak:this.inTak,
                subtotal:this.subtotal,
                tak_total:this.takTotal,
                total:this.sum,
            });
        },
        setDefaultExtra(value, col){
            col.value = extraDefault[value] || '';
        }
    },
    watch:{
        detail:{
            deep:true,
            handler(value){
                for(const row of value){
                    if(this.rate && row.detail && row.currency){
                        const price = row.detail * this.rate.split('|')[1]
                        if(row.price !== price){
                            row.price = parseInt(price);
                        }
                    }
                    const sum = (row.price || 0 ) * (row.num || 0 )
                    if(row.total !== sum){
                        row.total = sum
                    }
                }
            }
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