<template>
    <div class="calendar-mini">
        <div class="calendar-mini-title">
            <div class="mon">八月<span>2021</span></div>
            <div class="btns">
                <el-button type="primary" size="mini" circle class="el-icon-caret-left"></el-button>
                <el-button type="primary" size="mini" circle class="el-icon-caret-right"></el-button>
            </div>
        </div>
        <div class="titlebox">
            <div v-for="title in dateTitle"
                :key="title"
                class="titlecell"
                >
                {{title}}
            </div>
        </div>
        <div class="cellbox">
            <div 
                class="datecell"
                v-for="{id, date} in days"
                :key="id">
                <div class="label">{{date}}</div>
                <div class="tag"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<script>

export default {
    data(){
        let dateTitle = [
            'Mon.',
            'Tue.',
            'Wed.',
            'Thur.',
            'Fri.',
            'Sat.',
            'Sun.',
        ]

        let allDay = 7 * 5;

        let days = [];

        for(let i=0; i<allDay; i++){
            days.push({
                id:i,
                date:i,
            })
        }
        return {
            dateTitle,
            days,
        }
    },
}

</script>
<style>
.calendar-mini{
    background:#FFFFFF;
    width: 300px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
}
.calendar-mini-title{
    position: relative;
    padding: 0 20px;
    z-index: 10;
    margin: 10px 0;
    justify-content: space-between;
    align-items: center;
}
.calendar-mini-title::before{
    content: '';
    display: block;
    width: 30px;
    height: 100%;
    border-radius: 5px;
    position: absolute;
    left: -15px;
    background: #409EFF;
    z-index: 1;

}
.titlebox{
    justify-content: space-between;
    position: relative;
    margin: 20px 0;
}
.calendar-mini > div{
    display: flex;
    flex-flow: wrap;
}
.cell-box{
    width: 100%;
    justify-content: space-around;
    margin: 20px 0;
}
.titlecell,
.datecell{
    width: 14%;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
.foucs{
    background: #409EFF;
    color: #fff;
}
.tag{
    height: 10px;
}
</style>
