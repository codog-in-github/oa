<template>
    <div class="lower">
        <div class="shipper">
            <div class="title">
                船社情报
            </div>
                <div class="group">
                    <title-group 
                        title="CARRIER">
                        <el-select
                            v-model="carrier"
                            @focus="getOptionsAnsyc(5, options.carrier)"
                            size="mini">
                            <el-option
                                v-for="{id, value, label} in options.carrier.item"
                                :key="id"
                                :value="value"
                                :label="label"
                            ></el-option>
                        </el-select>
                    </title-group>
                    <span class="delimiter">&sol;</span>
                    <title-group 
                        title="C/STAFF">
                        <el-input
                            size="mini"
                            v-model="c_staff"
                        ></el-input>
                    </title-group>
            </div>
            <div class="group">
                <title-group 
                    title="SERVICE">
                    <el-input
                        size="mini"
                        v-model="service"
                    ></el-input>
                </title-group>
                <div class="group">
                    <title-group 
                        title="VESSEL NAME">
                        <el-input
                            v-model="vessel_name"
                            size="mini">
                        </el-input>
                    </title-group>
                    <span class="delimiter">&sol;</span>
                    <title-group 
                        title="VOYAGE">
                        <el-input
                            size="mini"
                            v-model="voyage"
                        ></el-input>
                    </title-group>
                </div>
            </div>
        </div>
        <div class="port-message">
            <div class="loading">
                <div class="title">
                    PORT OF LOADING
                </div>
                <title-group 
                    title="Country">
                    <el-select
                        filterable
                        :filter-method="val=>(keywords.port_of_loading_country=val)"
                        v-model="port_of_loading.country"
                        :loading="options.country.loading"
                        @focus="getOptionsAnsyc(2, options.country)"
                        size="mini">
                        <el-option
                            v-for="{id, label, value, code} in searchedOptios('port_of_loading_country', 'country')"
                            :key="id"
                            :label="code"
                            :value="value"
                        >
                            <div class="country-opt"><span>{{label}}</span><span>({{code}})</span></div>
                        </el-option>
                    </el-select>
                </title-group>
                <title-group 
                    title="Port">
                    <el-select
                        filterable
                        :filter-method="val=>(keywords.port_of_loading_port=val)"
                        size="mini"
                        :loading="options.port_of_loading.loading"
                        v-model="port_of_loading.port"
                        @change="formatPort('port_of_loading')"
                    >
                        <el-option
                            v-for="{id, value, label, code} in searchedOptios('port_of_loading_port', 'port_of_loading')"
                            :key="id"
                            :label="code"
                            :value="value"
                        >
                            <div class="country-opt"><span>{{label}}</span><span>({{code}})</span></div>
                        </el-option>
                    </el-select>
                </title-group>
                <title-group 
                    title="ETA">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_loading.eta"
                    ></el-date-picker>
                </title-group>
                <title-group 
                    title="ETD">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_loading.etd"
                    ></el-date-picker>
                </title-group>
                <title-group 
                    title="CY OPEN">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_loading.cy_open"
                    ></el-date-picker>
                </title-group>
                <title-group 
                    title="CY CUT">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_loading.cy_cut"
                    ></el-date-picker>
                </title-group>
                <title-group 
                    title="DOC CUT">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_loading.doc_cut"
                    ></el-date-picker>
                </title-group>
            </div>
            <div class="delivery">
                <div class="title">
                    PORT OF DELIVERY
                </div>
                <title-group 
                    title="Country">
                    <el-select
                        filterable
                        :filter-method="val=>(keywords.port_of_delivery_country=val)"
                        v-model="port_of_delivery.country"
                        :loading="options.country.loading"
                        @focus="getOptionsAnsyc(2, options.country)"
                        size="mini">
                        <el-option
                            v-for="{id, label, value, code} in searchedOptios('port_of_delivery_country', 'country')"
                            :key="id"
                            :value="value"
                            :label="code"
                        >
                            <div class="country-opt"><span>{{label}}</span><span>({{code}})</span></div>
                        </el-option>
                    </el-select>
                </title-group>
                <title-group 
                    title="Port">
                    <el-select
                        filterable
                        :filter-method="val=>(keywords.port_of_delivery_port=val)"
                        size="mini"
                        :loading="options.port_of_delivery.loading"
                        v-model="port_of_delivery.port"
                        @change="formatPort('port_of_delivery')"
                    >
                        <el-option
                            v-for="{id, label, value, code} in searchedOptios('port_of_delivery_port', 'port_of_delivery')"
                            :key="id"
                            :value="value"
                            :label="code"
                        >
                            <div class="country-opt"><span>{{label}}</span><span>({{code}})</span></div>
                        </el-option>
                    </el-select>
                </title-group>
                <title-group 
                    title="ETA">
                    <el-date-picker
                        style="width:auto;"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        v-model="port_of_delivery.eta"
                    ></el-date-picker>
                </title-group>
                <title-group 
                    title="FREE TIME DEM">
                    <el-input
                        size="mini"
                        type="number"
                        v-model="port_of_delivery.free_time_dem"
                    ></el-input>
                </title-group>
                <title-group 
                    title="FREE TIME DET">
                    <el-input
                        type="number"
                        size="mini"
                        v-model="port_of_delivery.free_time_det"
                    ></el-input>
                </title-group>
            </div>
        </div>
    </div>
</template>
<script>
import TitleGroup from '@/components/titleGroup.vue';
import {getOptionsAnsyc} from '@/mixin/main';
import { findInArray } from '@/assets/js/utils';

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
            //下拉选项
            options:{
                country : {loading:false, item:[]},
                port_of_loading : {loading:false, item:[]},
                port_of_delivery : {loading:false, item:[]},
                carrier : {loading:false, item:[]},
            },
            //用于搜索的关键字
            keywords:{
                port_of_loading_country:'',
                port_of_delivery_country:'',
                port_of_loading_port:'',
                port_of_delivery_port:'',
            },
        }
    },
    computed:{
        searchedOptios(){
            return (keywordName, optionsName)=>{
                return this.options[optionsName].item.filter(item=>
                    item.label.toLowerCase().indexOf(this.keywords[keywordName].toLowerCase())!==-1
                    ||
                    item.code.toLowerCase().indexOf(this.keywords[keywordName].toLowerCase())!==-1
                );
            }
        }
    },
    watch:{
        'port_of_loading.country'(newValue, oldValue){
            if(oldValue === newValue) return;
            this.port_of_loading.port = null;
            this.options.port_of_loading.item = [];
            this.options.port_of_loading.loaded = false;
            this.getOptionsAnsyc(
                2,
                this.options.port_of_loading,
                newValue
            );
        },
        'port_of_delivery.country'(newValue, oldValue){
            if(oldValue === newValue) return;
            this.port_of_delivery.port = null;
            this.options.port_of_delivery.item = [];
            this.options.port_of_delivery.loaded = false;
            this.getOptionsAnsyc(
                2,
                this.options.port_of_delivery,
                newValue
            );
        }
    },
    mounted(){
        if(!this.$route.params.bkg_id){
            this.port_of_loading.country = 'JP';
            this.port_of_delivery.country = 'CN';
        }
    },
    methods:{
        getData(){
            return{
                carrier:this.carrier,
                c_staff:this.c_staff,
                service:this.service,
                vessel_name:this.vessel_name,
                voyage:this.voyage,
                port_of_loading:this.port_of_loading,
                port_of_delivery:this.port_of_delivery,
            }
        },
        setData({shipper, loading, delivery}){
                this.carrier = shipper.carrier;
                this.c_staff = shipper.c_staff;
                this.service = shipper.service;
                this.vessel_name = shipper.vessel_name;
                this.voyage = shipper.voyage;
                
                this.port_of_loading.country = loading.country;
                this.port_of_loading.eta = loading.eta;
                this.port_of_loading.etd = loading.etd;
                this.port_of_loading.cy_open = loading.cy_open;
                this.port_of_loading.cy_cut = loading.cy_cut;
                this.port_of_loading.doc_cut = loading.doc_cut;

                this.port_of_delivery.country = delivery.country;
                this.port_of_delivery.eta = delivery.eta;
                this.port_of_delivery.free_time_dem = delivery.free_time_dem;
                this.port_of_delivery.free_time_det = delivery.free_time_det;
                //country监听器导致 port被更新 port需要在nexttick中更新
                this.$nextTick(()=>{
                    this.port_of_loading.port = loading.port;
                    this.port_of_delivery.port = delivery.port;
                });
        },
        formatPort(witch){
            this[witch].port = `${this[witch].country}  ${findInArray(
                'label',
                this[witch].port,
                this.options[witch].item,
                'code'
            )}(${this[witch].port})` ;
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
.country-opt{
    display: flex;
    justify-content: space-between;
}
</style>
