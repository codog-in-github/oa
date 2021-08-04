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
                :disabled="$route.params.mode ==='view'"
                @click="deleteButtonHandler"
            >BKG削除</el-button>
            <br>
            <br>
            <el-button size="mini" type="primary">各種書類作成</el-button>
            <el-button size="mini" type="primary"
                @click="displayRequestBookForm"
            >コスト確認</el-button>
        </div>
        <el-dialog
            :visible="dialog.visible"
            title="コスト確認"
            :show-close="false"
        >
            <el-skeleton 
                v-if="dialog.loading"
                :rows="12" 
                animated
            />
            <el-form v-else class="request-form" label-width="120px">
                <el-form-item label="SHIPPER:"><el-input v-model="dialog.data.shipper"></el-input></el-form-item>
                <el-form-item label="BOOKING NO:"><el-input v-model="dialog.data.booking_no"></el-input></el-form-item>
                <el-form-item label="VESSEL:"><el-input v-model="dialog.data.vessel"></el-input></el-form-item>
                <el-form-item label="VOY:"><el-input v-model="dialog.data.voy"></el-input></el-form-item>
                <el-form-item label="VESSEL CANNER:"><el-input v-model="dialog.data.vessel_carrier"></el-input></el-form-item>
                <el-form-item label="POL:"><el-input v-model="dialog.data.pol"></el-input></el-form-item>
                <el-form-item label="POD:"><el-input v-model="dialog.data.pod"></el-input></el-form-item>
                <el-form-item label="ETD:"><el-input v-model="dialog.data.etd"></el-input></el-form-item>
                <el-form-item label="ETA:"><el-input v-model="dialog.data.eta"></el-input></el-form-item>
                <el-form-item label="CY CUT:"><el-input v-model="dialog.data.cy_cut"></el-input></el-form-item>
                <el-form-item label="DOC CUT:"><el-input v-model="dialog.data.doc_cut"></el-input></el-form-item>
                <!--formel-fo label="SHIPPER:"rm-iteml-row><el-input v-model="dialog.data.container"></el-input></el-row>    -->
                <el-form-item label="COMMON:"><el-input v-model="dialog.data.common"></el-input></el-form-item>   
                <el-form-item label="REMARK:"><el-input v-model="dialog.data.remark" type="textarea"></el-input></el-form-item>   
            </el-form>
            <template
                slot="footer"
            >
                <el-button
                    @click="beDownload"
                    type="primary"
                >EXPORT</el-button>
                <el-button
                    @click="beCancel"
                >CANCEL</el-button>
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

            dialog:{
                loading:false,
                visible:false,
                data:{
                    shipper:'',
                    booking_no:'',
                    vessel:'',
                    voy:'',
                    vessel_carrier:'',
                    pol:'',
                    pod:'',
                    etd:'',
                    eta:'',
                    cy_cut:'',
                    doc_cut:'',
                    container:[],
                    common:'',
                    remark:'',
                },
            },
            options:{
                user:{item:[],loading:false},
                incoterms:{item:[],loading:false},
                bkg_type:{item:[],loading:false},
            },
        };
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
                this.$deleteOrder(this.bkgId,()=>{
                    this.$router.push('/frame/list/delete');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'error'
                });          
            });
        },
        displayRequestBookForm(){
            this.dialog.visible = true;
            this.dialog.loading = true;
            this.$getOrder(this.$route.params.bkg_id,({data})=>{
                console.log(data.data);
                let fd = data.data;
                this.dialog.data.shipper = fd.trader.shipper;
                this.dialog.data.booking_no = fd.bkg.bkg_no;
                this.dialog.data.vessel = fd.shipper.vessel_name;
                this.dialog.data.voy = fd.shipper.voyage;
                this.dialog.data.vessel_carrier = fd.shipper.carrier;
                this.dialog.data.pol = fd.loading.port;
                this.dialog.data.pod = fd.delivery.port;
                this.dialog.data.etd = fd.loading.etd;
                this.dialog.data.eta = fd.loading.eta;
                this.dialog.data.cy_cut = fd.loading.cy_cut;
                this.dialog.data.doc_cut = fd.loading.doc_cut;
                // this.dialog.data.container = '';
                this.dialog.data.common = fd.container.common;
                this.dialog.data.remark = fd.container.remark;
                this.dialog.loading = false;
            });
        },
        hiddenRequestBookForm(){
            this.dialog.visible = false;
        },
        beDownload(){},
        beCancel(){
            this.hiddenRequestBookForm();
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
            this.bkg_no = bkg.bkg_no;
            this.bl_no = bkg.bl_no;
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
