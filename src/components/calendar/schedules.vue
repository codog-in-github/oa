<template>
    <div class="sd-container">
        <div class="title">
            <div><span>计划表</span>   schedules</div>
            <div><el-button type="primary" class="el-icon-plus">add</el-button></div>
        </div>
        <div class="date">2012-10-1</div>
        <div class="date-box">
            <div class="date-item" v-for="date in showDate" :key="date">
                <div class="cell-title">{{date}}</div>
                <div class="todos" >
                    <li  
                        v-for="{id, name, type} in todoInDay(date)" 
                        :key="id"
                        class="todo"
                        :class="type"
                        >
                        {{name}}
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            plan:{
                '2021-6-18':[
                    {id:1,name:'放假了',type:'success'},
                    {id:2,name:'上班了',type:'info'},
                    {id:3,name:'又加班',type:'warning'},
                    {id:4,name:'吃夜宵',type:'danger'},
                ]
            },
            showDate:[
                '2021-6-18',
                '2021-6-19',
                '2021-6-20',
                '2021-6-21',
                '2021-6-22',
                '2021-6-23',
                '2021-6-24',
                '2021-6-25',
                '2021-6-26',
            ]
        }
    },
    methods:{
        todoInDay(day){
            if(this.plan[day] === undefined) return [];
            return this.plan[day]
        }
    }
}
</script>
<style scoped>
.sd-container {
    background: rgba(255, 255, 255,.5);
    border-radius: 15px;
    display: inline-block;
    /* box-sizing: border-box; */
    /* width: 100%; */
    margin: 30px;
    padding: 25px;
    color:#636D76;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}
.title{
    display: flex;
    justify-content: space-between;
}
.date-box{
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    width: 100%;
    box-sizing: border-box;
}
.date-item{
    margin:10px;
    padding: 10px;
    width:27%;
    background: #F7FAFF;
    border-radius: 3px;
    min-height: 90px;
}
.cell-title{
    text-align: right;
}
.todos{
    list-style-type: circle;
}
.todo{
}
</style>

