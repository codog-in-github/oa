<template>
    <div class="header">
        <div class="header-left">
            <div><b>管理情報</b></div>
            <div class="header-input-box">
                <title-group title="BKG DATE">
                    <el-date-picker
                        v-model="bkg_date"
                        size="mini"
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
                <title-group title="BKG type">
                    <el-select
                        v-model="bkg_type"
                        size="mini"
                    ></el-select>
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
                <title-group title="DG">
                    <el-select
                        v-model="dg"
                        size="mini"
                    ></el-select>
                </title-group>
            </div>
        </div>
        <div class="header-right">
            <el-button size="mini" type="primary"
                @click="$emit('save-data')"
            >BKG登録</el-button>
            <el-button size="mini" type="primary"
                @click="deleteButtonHandler"
            >BKG削除</el-button>
            <el-button size="mini" type="primary">BKG編集</el-button>
            <el-button size="mini" type="primary">各種申請〇〇登録</el-button>
            <br>
            <br>
            <el-button size="mini" type="primary">各種書類作成</el-button>
            <el-button size="mini" type="primary">メール作成</el-button>
            <el-button size="mini" type="primary">コスト確認</el-button>
            <el-button size="mini" type="primary">&nbsp;</el-button>
        </div>
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

            options:{
                user:{item:[],loading:false},
                incoterms:{item:[],loading:false},
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
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'error'
                });          
            });
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
                dg:this.dg,
            };
        },
        setData({bkg}){
            console.log(bkg);
            this.bkg_date = Date(bkg.bkg_date);
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
