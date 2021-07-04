<template>
    <div class="header">
        <div class="header-left">
            <div><b>管理情報</b></div>
            <div class="header-input-box">
                <form-item-selector 
                    v-for="config in bkgConfigs"
                    :config="config"
                    :key="config.id"
                    :value="value[config.params_name]"
                    @change="changeHandler"
                ></form-item-selector>
            </div>
            <!-- <div class="header-input-box">
                <title-group title="BKG DATE">
                    <el-date-picker
                        v-model="bkgDate"
                        type="date"
                        size="mini"
                        placeholder="选择日期">
                    </el-date-picker>
                </title-group>
                <title-group title="BKG  NO.">
                    <el-input size="mini" 
                        v-model="bkgNo"
                        @blur="blNo = bkgNo"
                    ></el-input>
                </title-group>
                <title-group title="B/L NO.">
                    <el-input size="mini" v-model="blNo"></el-input>
                </title-group>
                <title-group title="BKG TYPE">
                    <el-input size="mini" v-model="bkgType"></el-input>
                </title-group>
                <title-group title="INCOTERMS">
                    <el-input size="mini" v-model="incoterms">

                    </el-input>
                </title-group>
                <title-group title="BKG STAFF">
                    <el-input size="mini"  
                        v-model="bkgStaff"
                        :placeholder="username"
                        >
                    </el-input>
                </title-group>
                <title-group title="IN SALES">
                    <el-input size="mini" v-model="inSales"></el-input>
                </title-group>
                <title-group title="DG" >
                    <el-input size="mini" v-model="dg"></el-input>
                </title-group>
            </div> -->
        </div>
        <div class="header-right">
            <el-button size="mini" type="primary">BKG登録</el-button>
            <el-button size="mini" type="primary">BKG削除</el-button>
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
import FormItemSelector from '../../../components/FormItemSelector.vue'
// import TitleGroup from '../../../components/titleGroup.vue'
export default{ 
    created(){
        this.$initConfig(({data})=>{
            console.log(data);
            this.bkgConfigs = data.data;
        });
    },
    computed:{
        ...mapState({
            username:state=>state.loginState.info.username
        }),
    },
    data(){
        return {
            bkgConfigs:[],
            value:{},
        }
    },
    methods:{
        changeHandler(data,name){
            console.log(data,name);
        }
    },
    components:{
        // TitleGroup,
        FormItemSelector,
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
