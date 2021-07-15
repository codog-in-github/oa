<template>
    <title-group :title="config.title">
        <el-date-picker
            v-model="val"
            type="date"
            size="mini"
            style="width:auto;"
            @change="$emit('change', val, config.params_name)"
        >
        </el-date-picker>
    </title-group>
</template>
<script>
import titleGroup from '../titleGroup.vue'
export default {
    props:['config','value'],
    data(){
        return {
            val:this.config.default === 'today'?
                new Date() : null,
        }
    },
    components: { 
        titleGroup,
    },

}
</script>