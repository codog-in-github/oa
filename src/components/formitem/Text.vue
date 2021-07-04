<template>
    <title-group 
        :title="config.title"
    >
        <el-input
            size="mini"
            v-model="value"
            @change="changeHandler"
        >
        </el-input>
    </title-group>
</template>
<script>
import titleGroup from '../titleGroup.vue'
export default {
    props:['config','value'],
    methods:{
        changeHandler(){
            this.$emit('chage',this.value, this.config.params_name);
        },
    },
    components: { titleGroup },
    
}
</script>