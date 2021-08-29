<template>
    <el-form-item label-width="250px">
        <template #label>
            <el-autocomplete v-model.lazy="data.label" @focus="getOptionsAnsyc(11, options.label)" :fetch-suggestions="querySearch" @select="setDefault">
                <template #prepend><el-button class="el-icon-remove" style="color:red" @click="$emit('deleteCol')"></el-button></template>
            </el-autocomplete>
        </template>
        <el-input v-if="inputType === 'input'" v-model="data.value"></el-input>
    </el-form-item> 
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main'
export default {
    props: {
        data: {
            type: Object,
            default: ()=>({})
        }
    },
    data(){
        return {
            options:{
                label: {item: [], loading: false},
            }
        }
    },
    computed: {
        inputType() {
            switch(this.data.label){
                default :
                    return 'input';
            }
        },
    },
    methods: {
        querySearch(search, cb) {
            cb(this.options.label.item);
        },
        setDefault(){
            this.$emit('setDefault',this.data);
        }
    },
    mixins:[
        getOptionsAnsyc,
    ]
}
</script>
<style lang="less" scoped>

</style>