<template>
    <div>
        <el-calendar v-model="date">
            <template slot="dateCell"
                slot-scope="{date,data}">
                <div>{{display(date, data)}}</div>
            </template>
        </el-calendar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            date:new Date()
        }
    },
    methods:{
        display(date,data){
            console.log(date,data);
            return 1;
        }
    }
}
</script>