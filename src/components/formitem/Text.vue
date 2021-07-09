<template>
    <title-group 
        :title="config.title"
    >
        <el-input
            size="mini"
            v-model="val"
        >
        </el-input>
    </title-group>
</template>
<script>
import titleGroup from '../titleGroup.vue'
import { formItem } from '@/mixin/main.js'

export default {
    props:['config','value'],
    methods:{
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