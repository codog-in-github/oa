<template>
    <title-group 
        :title="config.title"
    >
        <el-input
            size="mini"
            v-model="val"
            :type="config.type === 'textarea'?'textarea':'input'"
        >
        </el-input>
    </title-group>
</template>
<script>
import titleGroup from '../titleGroup.vue'
import { formItem } from '@/mixin/main.js'

export default {
    props:['config','value'],
    computed:{
        defaultValue(){
            return this.value || '';
        }
    },
    mixins:[
        formItem,
    ],
    components: { titleGroup },
    
}
</script>