<template>
    <div class="index-container">
        <Schedules />
        <calendar-mini style="margin:0 0 0 30px;" />
    </div>
</template>
<script>
import Schedules from '@/components/calendar/schedules.vue'
import CalendarMini from '../../components/calendar/calendarMini.vue'
export default {
    data(){
        return {}
    },
    methods:{

    },
    components:{
        Schedules,
        CalendarMini,
    }
}
</script>

<style scoped>
.index-container{
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-around;
    align-items: flex-start;
}
</style>