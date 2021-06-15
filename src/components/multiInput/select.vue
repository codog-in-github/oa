<template>
    <el-select
        v-model="data[index][col]">
        <el-option 
            v-for="{id, opt} in detail" 
            :key="id" 
            :label="opt"
            :value="id"
            >
        </el-option>
    </el-select>
</template>
<script>
export default {
    props:['data', 'type', 'col_id', 'editCell', 'index', 'col', 'detail'],
}
</script>