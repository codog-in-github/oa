<template>
    <div>
        <el-calendar v-model="date">
            <template slot="dateCell"
                slot-scope="{date}">
                <div @click="notify(date)" 
                    class="dateCell">
                    <div class="title">{{date.format()}}</div>
                    <div 
                        v-for="{id, name, type} in displayTodoList(date)" 
                        :class="classMap(type)"
                        :key="id">
                        {{name}}
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>
</template>
<script>
Date.prototype.format = function(){
    return `${this.getFullYear()}-${this.getMonth()}-${this.getUTCDate()}`
}
export default {
    data(){
        return {
            date:new Date(),
            todos:{
                '2021-5-17':[
                    {id:1, name:'骑马',type:'warning'}
                ],
                '2021-5-18':[
                    {id:1, name:'射箭',type:'success'},
                    {id:2, name:'游泳',type:'warning'},
                    {id:3, name:'爬山',type:'success'},
                ],
            }
        }
    },
    methods:{
        displayTodoList(date){
            let dateStr = date.format();
            if(this.todos[dateStr] !== undefined) 
                return this.todos[dateStr];
            else
                return [];
        },
        classMap(type){
            switch(type){
                case 'success':
                    return 'el-icon-check'
                default:
                    return 'el-icon-close'
            }
        },
        notify(date){
            this.$notify({
                title: '???',
                message :date.format(),
            })
        },
    }
}
</script>

<style scoped>
.dateCell{
    height: 100%;
}
</style>