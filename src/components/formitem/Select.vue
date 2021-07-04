<template>
    <title-group :title="config.title">
        <el-select
            v-model="val"
            size="mini"
            @change="changeHandler"
        >
            <el-option
                v-for="opt in  config.detail"
                :key="opt.id"
                :label="opt.label"
                :value="opt.id"
            ></el-option>
        </el-select>
    </title-group>
</template>
<script>
import TitleGroup from '../titleGroup.vue';
export default {
    props:['config','value'],
    data(){

        return {
            val:this.value,
        }
    },
    methods:{
        changeHandler(){
            if(this.val != this.value ){
                this.$emit(
                    'change', 
                    this.val, 
                    this.config.params_name);
            }
        }
    },
    components: { 
        TitleGroup,
    },

}
</script>

<style scoped>
.link-default{
    display: flex;
}
</style>