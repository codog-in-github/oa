<template>
    <div class="index-container">
        <div class="oldtable-container">
            <old-table />
        </div>
    </div>
</template>
<script>
import OldTable from '../../components/OldTable.vue'
export default {
    data () {
        return {}
    },
    methods: {

    },
    components: {
        OldTable
    }
}
</script>

<style scoped>
.index-container{
    background: #fff;
    width: 100%;
    height: 100%;
}
.oldtable-container{
    padding: 30px 80px;
}
</style>
