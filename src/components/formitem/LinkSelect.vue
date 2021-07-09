<template>
    <div class="link">
        <title-group :title="config.title">
            <el-select
                size="mini"
                v-model="val"
                filterable 
            >
                <el-option 
                    v-for="option in fatherOptions"
                    :key="config.id + '_' +option.id"
                    :label="option.label"
                    :value="option.id"
                >
                </el-option>
            </el-select>
        </title-group>
        <span>/</span>
        <title-group :title="config.child.title">
            <el-autocomplete
                v-if="config.child.type === 'linkSuggest'"
                v-model="childVal"
                size="mini"
                :fetch-suggestions="findsuggests"

            ></el-autocomplete>
            <el-select
                v-else
                size="mini"
                v-model="childVal"
                :loading="childLoading"
            >
                <el-option 
                    v-for="option in childOptions"
                    :key="option.id"
                    :label="option.label"
                    :value="option.id"
                >
                </el-option>
            </el-select>
        </title-group>
    </div>
</template>
<script>
import TitleGroup from '../titleGroup.vue';
import { doubleFormItem } from '@/mixin/main.js';

export default {
    props:{
        config:{
            default:()=>({}),
        },
        value:{
            default:'',
        },
        'async-method':{
            default:false,
        },
    },
    computed:{
        
        fatherOptions(){
            return this.config.detail || [];
        },
        childOptions(){
            if(this.val == '') return [];
            return this.config.child.detail?.filter(i=>i.pid == this.val) || [];
        },
        suggestOptions(){
            return [];
            // return this.childOptions.map(x=>{return {value:x.label}});
        },
    },
    methods:{
        findsuggests(val,cb){
            if(val === ''){
                cb(this.suggestOptions);
            }else{
                cb(this.suggestOptions.filter(x=>x.value.indexOf(val)!==-1));
            }
        },
        chageFatherHandler(){},
    },
    mixins:[
        doubleFormItem,
    ],
    components: {  
        TitleGroup,
    },


}
</script>
<style scoped>
.link{
    display: flex;
    width: 100%;
    align-items: flex-end;
}
</style>