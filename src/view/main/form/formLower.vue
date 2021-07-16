<template>
    <div class="lower"
        v-loading="loading">
        <div class="shipper">
            <div class="title">
                船社情报
            </div>
            <div class="group">
                <title-group 
                    title="carrier">
                    <el-select
                        v-model="carrier"
                        size="mini">
                    </el-select>
                </title-group>
                <span class="delimiter">&sol;</span>
                <title-group 
                    title="B/STAFF">
                    <el-input
                        size="mini"
                        v-model="carrier"    
                    ></el-input>
                </title-group>
            </div>
        </div>
        <div class="port-message">
            <div class="loading">
                <div class="title">
                    PORT OF LOADING<br/><br/>
                </div>
            </div>
            <div class="delivery">
                <div class="title">
                    PORT OF DELIVERY<br/><br/>
                </div>
                
                </div>
        </div>
    </div>
</template>
<script>
import TitleGroup from '@/components/titleGroup.vue';

export default{ 
    data(){
        return {
            carrier:null,
            c_staff:null,
            service:null,
            vessel_name:null,
            voyage:null,
            port_of_loading:{
                country:null,
                port:null,
                eta:null,
                etd:null,
                cy_open:null,
                cy_cut:null,
                doc_cut:null,
            },
            port_of_delivery:{
                country:null,
                port:null,
                eta:null,
                free_time_dem:null,
                free_time_det:null,
            },

            loading:false,
        }
    },
    components:{
        TitleGroup,
    },
}
</script>
<style scoped>
.lower{
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
}
.lower > *{
    width: 100%;
}
.loading{
    background: red;
    color: #fff;
    padding: 10px;
}
.delivery{
    background: lightblue;
    color: #000;
    padding: 10px;
}
.port-message{
    display: flex;
    justify-content: space-around;
}
.port-message > div{
    width: 45%;

}
</style>
