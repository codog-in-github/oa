<template>
    <title-group :title="config.title">
        <el-time-picker
            is-range
            v-model="val"
            size="mini"
            range-separator="to">
        </el-time-picker>
    </title-group>
</template>
<script>
import titleGroup from '../titleGroup.vue'
import {formItem} from '@/mixin/main'
export default {
    props:[
        'config',
        'value'
    ],
    components: { titleGroup },
    mixins:[
        formItem,
    ],
}
</script>