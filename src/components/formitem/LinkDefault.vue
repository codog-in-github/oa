<template>
    <div class="link-default">
        <title-group :title="config.title">
            <el-input
                v-model="val"
                size="mini"
                @blur="childVal = val || childVal"
            ></el-input>
        </title-group>
        <title-group :title="config.child.title">
            <el-input 
                v-model="childVal"
                size="mini"
            ></el-input>
        </title-group>
    </div>
</template>
<script>
import TitleGroup from '../titleGroup.vue';
import { doubleFormItem } from '@/mixin/main.js';

export default {
    props:['config','value','childValue'],
    methods:{
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
.link-default{
    display: flex;
}
</style>