<template>
    <div class="detail">
        <div class="flag">{{no+1}}</div>
        <div class="inputs">
            <title-group
            title="Container type">
                <el-select
                    v-model="detailData.container_type"
                    size="mini"
                >
                    <el-option
                        v-for="opt in options.containerType.item"
                        :key="opt.id"
                        :label="opt.label"
                        :value="opt.value"
                    ></el-option>
                </el-select>
            </title-group>
            <title-group
            title="COMMON">
                <el-input
                    v-model="detailData.common"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="OPTION">
                <el-input
                    v-model="detailData.option"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="台費なし/あり">
                <el-input
                    v-model="detailData.expenses"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="運送業">
                <el-input
                    v-model="detailData.transprotation"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="担当者">
                <el-input
                    v-model="detailData.charge"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="現場担当者">
                <el-input
                    v-model="detailData.field"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="現場担当連絡先">
                <el-input
                    v-model="detailData.field_tel"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="シャーシ">
                <el-input
                    v-model="detailData.chassis"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="バンニング場所">
                <el-input
                    v-model="detailData.booker_place"
                    size="mini"
                ></el-input>
            </title-group>
            <title-group
            title="バンニング日">
                <el-date-picker
                    v-model="detailData.vanning_date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </title-group>
            <title-group
            title="空PICK日">
                <el-date-picker
                    style="width:auto;"
                    v-model="detailData.free_pick_day"
                    value-format="yyyy-MM-dd"
                    size="mini"
                ></el-date-picker>
            </title-group>
            <title-group
            title="開時/終時">
                <el-time-picker
                    v-model="formatTime"
                    is-range
                    value-format="HH:mm"
                    format="HH:mm"
                    size="mini"
                ></el-time-picker>
            </title-group>
        </div>
        <div class="buttons">
            <el-button 
                type="primary" 
                size="mini"
                @click="$emit('add')"
            >ADD</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click="$emit('copy',detailData)"
            >COPY</el-button>
            <el-button 
                v-if="no>0"
                type="danger" 
                size="mini"
                @click="deleteSelf"
            >
                DEL
            </el-button>
        </div>
    </div>
</template>
<script>
import TitleGroup from '../titleGroup.vue';

export default {
    props:{
        detailData:{
            default:()=>({
                container_type:'',
                common:'',
                option:'',
                expenses:'',
                transprotation:'',
                charge:'',
                field:'',
                field_tel:'',
                chassis:'',
                booker_place:'',
                vanning_date:'',
                vanning_during:'',
                delete_at:'',
            })
        },
        options:{
            default:()=>({}),
        },
        no:{
            default:1
        },
    },
    computed:{
        formatTime:{
            get(){
                const during = this.detailData.vanning_during;
                return during?during.split('-') : '';
            },
            set(val){
                if(val){
                    this.detailData.vanning_during = val.join('-');
                } else {
                    this.detailData.vanning_during = '';
                }
            },
        }
    },
    created(){
        this.$emit('load-options', 3, this.options.containerType);
    },
    methods:{
        deleteSelf(){
            this.detailData.delete_at = '1';
        }
    },
    components:{
        TitleGroup
    }
}
</script>
<style scoped>
.detail{
    display: flex;
    justify-content: space-around;
    border: solid #000 1px;
}
.detail+.detail{
    margin-top: 4px;
}
.flag{
    flex: 0 0 2em;    
}
.inputs{
    width: 1px;
    flex: 1 1 10px;
    display: flex;
    flex-flow: wrap;
}
.inputs>div{
    width: 10em;
    flex: 0 0 auto;
}
.inputs>div:last-child{
    width: auto !important;
}
.buttons{
    display: flex;
    flex-flow: column;
    flex: 0 0  4em;
    align-items:inherit;
    justify-content: space-around;
}
.buttons>*{
    margin-left: 0;
}
</style>