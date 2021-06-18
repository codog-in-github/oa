<template>
    <div class="container">
        <div class="title">
            <div>schedules</div>
            <div><el-button type="info"></el-button></div>
        </div>
        <div class="date">2012-10-1</div>
        <div class="item-box">
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
            <div>
                <div>date</div>
                <div class="todos">
                    <div class="todo">放假了</div>
                    <div class="todo">不上班</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    }
}
</script>
<style scoped>
.container {
    background: rgba(255, 255, 255,.5);
    border-radius: 30px;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    margin: 30px;
}
.title{
    display: block;
}
.item-box{
    display: flex;
    flex-flow: wrap;
    width: 100%;
    box-sizing: border-box;
}
.item-box > div{
    margin:10px;
    width:30%;
    background: #F7FAFF;
}
.todos{

}
.todo{
}
</style>

