<template>
    <title-group 
        :title="config.title"
    >
        <el-input
            size="mini"
            v-model="val"
            :type="type"
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
        },
        type(){
            switch (this.config.type){
                case 'textarea':{
                    return 'textarea';
                }
                case 'number':{
                    return 'number';
                }
                default:{
                    return 'input';
                }
            }
        },
    },
    mixins:[
        formItem,
    ],
    components: { titleGroup },
    
}
</script>