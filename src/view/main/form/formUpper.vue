<template>
   <div class="upper" v-loading="loading"> 
       <div class="title">取引業者情報</div>
        <div class="header-input-box">
            <div class="group">
                <title-group 
                    title="BOOKER">
                    <el-select
                        v-model="booker"
                        size="mini">
                    </el-select>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group 
                    title="B/STAFF">
                    <el-input
                        size="mini"
                        v-model="b_staff"    
                    ></el-input>
                </title-group>
            </div>
            <title-group 
                title="SHIPPER">
                <el-input
                    size="mini" 
                    v-model="shipper"   
                ></el-input>
            </title-group>
            <div class="group">
                <title-group 
                    title="FORWARDER">
                    <el-select
                        v-model="forwarder"
                        size="mini">
                    </el-select>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group 
                    title="F/STAFF">
                    <el-input
                        size="mini"
                        v-model="f_staff"
                    ></el-input>
                </title-group>
            </div>
            <title-group 
                title="CONSIGNEE">
                <el-input
                    size="mini"
                    v-model="consignee"
                ></el-input>
            </title-group>
            <div class="group">
                <title-group 
                    title="DATYAGE">
                    <el-select
                        v-model="drayage"
                        size="mini">
                    </el-select>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group 
                    title="D/STAFF">
                    <el-input
                        size="mini"
                        v-model="d_staff"
                    ></el-input>
                </title-group>
            </div>
        </div>
    </div>
</template>
<script>
// import { formBoard } from '@/mixin/main.js';
import TitleGroup from '@/components/titleGroup.vue';

export default{ 
    data(){
        return{
            booker:null,
            b_staff:null,
            shipper:null,
            forwarder:null,
            f_staff:null,
            consignee:null,
            drayage:null,
            d_staff:null,

            loading:false,
        }
    },
    components:{
        TitleGroup,
    },
}
</script>
<style scoped>
</style>
