<template>
    <div class="link-default">
        <title-group :title="config.title">
            <el-input
                v-model="val"
                size="mini"
                @change="changeHandler"
                @blur="childVal = childVal || val"
            ></el-input>
        </title-group>
        <title-group :title="config.child.title">
            <el-input 
                v-model="childVal"
                size="mini"
                @change="changeHandler"
            ></el-input>
        </title-group>
    </div>
</template>
<script>
import TitleGroup from '../titleGroup.vue';
export default {
    props:['config','value','childValue'],
    data(){
        return {
            val:this.value,
            childVal:this.childValue,
        }
    },
    methods:{
        changeHandler(){
            if(this.val != this.value || this.childValue != this.childValue){
                this.$emit('change', 
                    this.val, 
                    this.config.params_name,
                    this.childVal,
                    this.config.child.params_name);
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