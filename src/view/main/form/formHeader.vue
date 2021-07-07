<template>
    <div class="header" 
            v-loading="loading"
        >
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
        this.loading = (true);
        this.$initConfig(({data})=>{
            this.bkgConfigs = data.data;
        });
    },
    updated(){
        this.loading = (false);
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
            loading:true,
        }
    },
    methods:{
        changeHandler(data,name){
            this.value[name] = data;
        },
        updatedLoadingState(state){
            this.$emit('loadingChange','header',state);
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
