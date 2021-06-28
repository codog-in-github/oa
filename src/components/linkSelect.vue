<template>
    <div class="link">
        <slot name="father">
            <title-group :title="fatherName">
                <el-select
                    :size="size"
                    v-model="fatherValue"
                    @change="chageFatherHandler"
                >
                    <el-option 
                        v-for="option in fatherOptions"
                        :key="option.id || Symbel(0)"
                        :label="option.label"
                        :value="option.value"
                    >
                    </el-option>
                </el-select>
            </title-group>
        </slot>
        <slot name="center">
            <span>/</span>
        </slot>
        <slot name="child">
            <title-group :title="childName">
                <el-autocomplete
                    v-if="childType === 'suggest'"
                    v-model="childValue"
                    :size="size"
                    :fetch-suggestions="findsuggests"
                    @change="chageChildHandler"

                ></el-autocomplete>
                <el-select
                    v-if="childType ==='select'"
                    :size="size"
                    v-model="childValue"
                    @change="chageChildHandler"
                >
                    <el-option 
                        v-for="option in childOptions"
                        :key="option.id || Symbel(0)"
                        :label="option.label"
                        :value="option.value"
                    >
                    </el-option>
                </el-select>
            </title-group>
        </slot>
    </div>
</template>
<script>
import TitleGroup from './titleGroup.vue';
export default {
    props:{
        fatherName:{
            default:'father',
        },
        childName:{
            default:'child',
        },
        options:{
            default:()=>[],
        },
        size:{
            default:'mini',
        },
        childType:{
            default:'select',
        }
    },
    computed:{
        
        fatherOptions(){
            return this.options.filter(i=>i.pid=='');
        },
        childOptions(){
            if(this.fatherValue == '') return [];
            return this.options.filter(i=>i.pid === this.fatherValue);
        },
        suggestOptions(){
            return this.childOptions.map(x=>{return {value:x.label}});
        }
    },
    data(){
        return {
            childValue:'',
            fatherValue:'',
        }
    },
    methods:{
        chageChildHandler(){
            this.$emit('childChange',this.childValue);
        },
        chageFatherHandler(){
            this.childValue=''
            this.chageChildHandler();
            this.$emit('fatherChange',this.fatherValue);
        },
        findsuggests(val,cb){
            if(val === ''){
                cb(this.suggestOptions);
            }else{
                cb(this.suggestOptions.filter(x=>x.value.indexOf(val)!==-1));
            }
        },
    },
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