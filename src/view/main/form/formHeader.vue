<template>
    <div class="header">
        <div class="header-left">
            <div><b>管理情報</b></div>
            <div class="header-input-box">
                <title-group title="BKG DATE">
                    <el-date-picker
                        v-model="bkg_date"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        style="width:auto;"
                    ></el-date-picker>
                </title-group>
                <title-group title="BKG NO.">
                    <el-input
                        v-model="bkg_no"
                        @blur="bl_no = bkg_no?bkg_no:bl_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group title="B/L NO.">
                    <el-input
                        v-model="bl_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group title="BKG TYPE">
                    <el-select
                        v-model="bkg_type"
                        size="mini"
                        @focus="getOptionsAnsyc(6, options.bkg_type)"
                    >
                        <el-option
                            v-for="{id, value, label} in options.bkg_type.item"
                            :key="id"
                            :value="value"
                            :label="label"
                        ></el-option>
                    </el-select>
                </title-group>
                <title-group title="INCOTERMS">
                    <el-select
                        v-model="incoterms"
                        size="mini"
                        @focus="getOptionsAnsyc(4, options.incoterms)"
                    >
                        <el-option
                            v-for="{id, value, label} in options.incoterms.item"
                            :key="id"
                            :value="value"
                            :label="label"
                        ></el-option>
                    </el-select>
                </title-group>
                <title-group title="BKG STAFF">
                    <el-select
                        v-model="bkg_staff"
                        size="mini"
                        :loading="options.user.loading"
                        @focus="getOptionsAnsyc(1,options.user)"
                    >
                        <el-option
                            v-for="{id, value, label} in options.user.item"
                            :key="id"
                            :value="value"
                            :label="label"
                        ></el-option>
                    </el-select>
                </title-group>
                <title-group title="IN SALES">
                    <el-select
                        v-model="in_sales"
                        size="mini"
                        :loading="options.user.loading"
                        @focus="getOptionsAnsyc(1,options.user)"
                    >
                        <el-option
                            v-for="{id, value, label} in options.user.item"
                            :key="id"
                            :value="value"
                            :label="label"
                        ></el-option>
                    </el-select>
                </title-group>
                <title-group title="社内管理番号">
                    <el-input
                        readonly
                        v-model="dg"
                        size="mini"
                    ></el-input>
                </title-group>
            </div>
        </div>
        <div class="header-right">
            <el-button size="mini" type="primary"
                :disabled="$route.params.mode ==='view'"
                @click="$emit('save-data')"
            >BKG登録</el-button>
            <el-button size="mini" type="primary"
                :disabled="$route.params.mode ==='view' || !$route.params.mode"
                @click="deleteButtonHandler"
            >BKG削除</el-button>
            <br>
            <br>
            <el-button 
                size="mini" 
                type="primary"
                @click="bookSelecter = true"
            >各種書類作成</el-button>
            <el-button 
                size="mini" 
                type="primary"
            >コスト確認</el-button>
        </div>
        <el-dialog
            :visible="bookSelecter"
            title="Please select a type"
            @close="bookSelecter=false"
        >
            <el-radio v-model="book" label="BOOKING NOTICE" border></el-radio>
            <el-radio v-model="book" label="荷捌表" border></el-radio>
            <template slot="footer">
                <el-button type="primary" @click="displayBookForm">OK</el-button>
                <el-button @click="bookSelecter=false">CANCEL</el-button>
            </template>
        </el-dialog>
        <el-dialog
            :close-on-click-modal="false"
            :visible="dialog"
            :title="book"
            @close="beClose"
        >
            <component
                :is="bookComponent"
                ref="book"
            ></component>
            <template
                slot="footer"
            >
                <el-button
                    @click="beDownload"
                    type="primary"
                >EXPORT</el-button>
                <el-button
                    @click="beClose"
                >CLOSE</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import TitleGroup from '@/components/titleGroup';
import { getOptionsAnsyc, common } from '@/mixin/main';
export default{ 
    data(){
        return {
            bkg_date:new Date(),
            bkg_no:null,
            bl_no:null,
            bkg_type:null,
            incoterms:null,
            bkg_staff:null,
            in_sales:null,
            dg:null,
            book:'',
            dialog:false,
            bookSelecter:false,
            options:{
                user:{item:[],loading:false},
                incoterms:{item:[],loading:false},
                bkg_type:{item:[],loading:false},
            },
        };
    },
    computed:{
        bookComponent(){
            switch(this.book){
                case 'BOOKING NOTICE':
                    return ()=>import('../book/BookingNotice');
                case '荷捌表':
                    return ()=>import('../book/HandlingTable');
                default:
                    return ()=>{};
            }
        }
    },
    created(){
        if(this.isNewOrder){
            this.bkg_staff = this.name;
        }
    },
    methods:{
        deleteButtonHandler(){
            this.$confirm('Are you sure?', 'alert', {
                confirmButtonText: 'ok',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                this.$deleteOrder(this.$route.params.bkg_id,'true',()=>{
                    this.$router.push('/frame/list/normal');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'BE CANCELED'
                });
            });
        },
        displayBookForm(){
            if(this.book === ''){
                this.$message({
                    type: 'info',
                    message: 'PLEASE SELECT A BOOK'
                });
                return void 0;
            }
            this.dialog= true;
            this.bookSelecter = false;
            this.$nextTick(()=>{
                this.$refs.book.loadData();
            });
        },
        hiddenBookForm(){
            this.dialog = false;
        },
        beDownload(){
            if(this.$route.params.bkg_id === undefined){
                this.$message({
                    type: 'info',
                    message: 'YOU MUST SAVE BEFORE'
                });
                return void 0;
            }
            if(this.$refs.book.beDownload){
                this.$refs.book.beDownload();
            }else{
                console.error(`Can not found method 'beDownload' in ${this.book} componse`);
            }
        },
        beClose(){
            this.hiddenBookForm();
        },
        getData(){
            return {
                id:this.bkgId,
                bkg_date:this.bkg_date,
                bkg_no:this.bkg_no,
                bl_no:this.bl_no,
                bkg_type:this.bkg_type,
                incoterms:this.incoterms,
                bkg_staff:this.bkg_staff,
                in_sales:this.in_sales,
                // dg:this.dg,
            };
        },
        setData({bkg}){
            // console.log(bkg);
            this.bkg_date = bkg.bkg_date;
            this.bkg_no = this.isCopy?'' : bkg.bkg_no;
            this.bl_no = this.isCopy?'' : bkg.bl_no;
            this.bkg_type = bkg.bkg_type;
            this.incoterms = bkg.incoterms;
            this.bkg_staff = bkg.bkg_staff;
            this.in_sales = bkg.in_sales;
            this.dg = bkg.dg;
        },
    },
    mixins:[
        getOptionsAnsyc,
        common,
    ],
    components:{
        TitleGroup,
    },
}
</script>
<style scoped>
.header{
    justify-content: space-around;
    width: 100%;
}
.header-input-box{
    display: flex;
    align-items: flex-end;
}
.header-input-box > *{
    margin:0 5px;
}
.header-left,
.header-right{
    flex:1 0  auto;
}

.header-left{
    width: 70rem;
}
</style>
