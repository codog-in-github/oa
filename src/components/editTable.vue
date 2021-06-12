<template>
    <div>
        <el-table :data='data'> 
            <el-table-column v-for="{id, col, name} in col" :key="id"
                :prop="col"
                :label="name">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props:['col', 'data'],
}
</script>