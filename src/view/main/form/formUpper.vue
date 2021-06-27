<template>
   <div class="upper">
        <div class="title">取引業者情報</div>
        <div>
            <link-select
                :options="[
                    {id:1,pid:'',label:'北京',value:'1'},
                    {id:2,pid:'',label:'上海',value:'2'},
                    {id:3,pid:'',label:'广州',value:'3'},
                    {id:4,pid:'',label:'浙江',value:'4'},
                    {id:5,pid:'4',label:'宁波',value:'5'},
                    {id:6,pid:'3',label:'广东',value:'6'},
                    {id:7,pid:'3',label:'深圳',value:'7'},
                    {id:8,pid:'4',label:'杭州',value:'8'},
                ]"
            ></link-select>
        </div>
        <div>
            <title-group title="BOOKER">
                <el-input size="mini"></el-input>
            </title-group>
            <div>/</div>
            <title-group title="B/STAFF">
                <el-input size="mini"></el-input>
            </title-group>
            <!-- <el-button size="mini" type="primary">NEW ADD</el-button> -->
        </div>
        <div>
            <title-group title="SHIPPER">
                <el-input size="mini"></el-input>
            </title-group>
        </div>
        <div>
            <title-group title="FORWARDER">
                <el-input size="mini"></el-input>
            </title-group>
            <div>/</div>
            <title-group title="F/STAFF">
                <el-input size="mini"></el-input>
            </title-group>
            <!-- <el-button size="mini" type="primary">NEW ADD</el-button> -->
        </div>
        <div>
            <title-group title="CONSIGNEE">
                <el-input size="mini"></el-input>
            </title-group>
        </div>
        <div>
            
            <title-group title="DRAYAGE">
                <el-input size="mini"></el-input>
            </title-group>
            <div>/</div>
            <title-group title="D/STAFF">
                <el-input size="mini"></el-input>
            </title-group>
            <!-- <el-button size="mini" type="primary">NEW ADD</el-button> -->
        </div>
    </div>
</template>
<script>
import LinkSelect from '../../../components/linkSelect.vue'
import TitleGroup from '../../../components/titleGroup.vue'

export default{ 
    computed:{
    },
    data(){
        return {
        }
    },
    components:{
        TitleGroup,
        LinkSelect,
    }
}
</script>
<style scoped>
.upper > *{
    display: flex;
    align-items: flex-end;
}
</style>
