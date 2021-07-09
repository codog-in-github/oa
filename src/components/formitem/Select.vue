<template>
    <title-group :title="config.title">
        <el-select
            v-model="val"
            size="mini"
        >
            <el-option
                v-for="opt in config.detail"
                :key="opt.id"
                :label="opt.label"
                :value="opt.id"
            ></el-option>
        </el-select>
    </title-group>
</template>
<script>
import TitleGroup from '../titleGroup.vue';
import { formItem } from '@/mixin/main.js'

export default {
    props:['config','value',],
    computed:{
        defaultValue(){
            switch(this.config.default){
                case 'loginUser':{
                    return this.$store.state.loginState.info.id;
                }
                default:{
                    return this.value || '';
                }
            }
        }
    },
    mixins:[
        formItem,
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