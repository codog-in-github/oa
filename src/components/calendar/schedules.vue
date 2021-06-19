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
                    <div  
                        v-for="{id, name, type, state} in todoInDay(date)" 
                        :key="id"
                        class="todo"
                        :class="'list-'+type"
                        >
                        {{name}}
                        <div 
                            :class="{complete:state}"
                            class="todo-state"
                            >
                            ✓
                        </div>
                    </div>
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
                    {id:1,name:'放假了',type:'success',state:true},
                    {id:2,name:'上班了',type:'primary',state:true},
                    {id:3,name:'又加班',type:'warning',state:false},
                    {id:4,name:'吃夜宵',type:'danger' ,state:false},
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
    padding: 25px;
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
}
.todo{
    margin: 3px 0;
    position: relative;
}
.todo-state{
    position: absolute;
    right: 5px;
    top: 2px;
    padding: 0 9px;
    font-size: 5px;
    border-radius: 3em;
    border: 2px solid #409EFF;
    color:#409EFF;
}
.complete{
    background: #409EFF;
    color: #fff;
}
</style>

