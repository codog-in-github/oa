<template>
   <div class="upper">
        <div class="title">取引業者情報</div>
        <div>
            <link-select
                fatherName="BOOKER"
                childName="B/STAFF"
                childType='suggest'
                
            ></link-select>
        </div>
        <div>
            <title-group title="SHIPPER">
                <el-input size="mini"></el-input>
            </title-group>
        </div>
        <div>
            <link-select
                fatherName="FORWARDER"
                childName="F/STAFF"
                childType='suggest'
            ></link-select>
        </div>
        <div>
            <title-group title="CONSIGNEE">
                <el-input size="mini"></el-input>
            </title-group>
        </div>
        <div>
            <link-select
                fatherName="DRAYAGE"
                childName="D/STAFF"
                childType='suggest'
            ></link-select>
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
