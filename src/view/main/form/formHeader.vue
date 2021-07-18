<template>
    <div class="header" 
            v-loading="loading"
        >
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
                <title-group title="b/l NO.">
                    <el-input
                        v-model="bl_no"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group title="BKG type">
                    <el-input
                        v-model="bkg_type"
                        size="mini"
                    ></el-input>
                </title-group>
                <title-group title="BKG STAFF">
                    <el-select
                        v-model="bkg_staff"
                        size="mini"
                        :loading="options.user.loading"
                        @focus="getOptionsAnsyc(1,options.user)"
                    >
                        <el-option
                            v-for="{id, label} in options.user.item"
                            :key="id"
                            :value="id"
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
                            v-for="{id, label} in options.user.item"
                            :key="id"
                            :value="id"
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
import { mapState } from 'vuex'
import TitleGroup from '@/components/titleGroup';
import { getOptionsAnsyc } from '@/mixin/main';
export default{ 
    data(){
        return {
            bkg_date:null,
            bkg_no:null,
            bl_no:null,
            bkg_type:null,
            bkg_staff:null,
            in_sales:null,
            dg:null,

            options:{
                user:{item:[],loading:false},
            },
            loading:false
        };
    },
    created(){
        if(this.isNewOrder){
            this.bkg_staff = this.userId;
            this.options.user.item.push({id:this.userId,label:this.name});
        }
    },
    computed:{
        ...mapState({
            name:state=>state.loginState.info.name,
            userId:state=>state.loginState.info.id,
        }),
        ...mapState('form',{
            bkgId:state=>state.bkgId,
        }),
        isNewOrder(){
            console.log(this.$route);
            return !this.bkgId;
        },
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
    },
    mixins:[
        getOptionsAnsyc,
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
