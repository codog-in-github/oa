<template>
    <component 
        :is="componentsMap[config.type]"
        :config="config"
        :value="value"
        @change="changeHandler"
    />
</template>
<script>
// 根据配置自动选择表单录入组件并渲染数据
export default {
    props:['config','value'],
    data(){
        let componentsMap = {
            text:()=>import('./formitem/Text.vue'),
            date:()=>import('./formitem/Date.vue'),
            linkDefault:()=>import('./formitem/LinkDefault.vue'),
            userSelect:()=>import('./formitem/Select.vue'),
            select:()=>import('./formitem/Select.vue'),
        }
        return {
            componentsMap,
        };
    },
    methods:{
        changeHandler(...playload){
            this.$emit('change',...playload);
        },
    }
}
</script>