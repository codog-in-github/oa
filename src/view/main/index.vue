<template>
    <div class="container">
        <Schedules />
    </div>
</template>
<script>
import Schedules from '@/components/calendar/schedules.vue'
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

    },
    components:{
        Schedules,
    }
}
</script>

<style scoped>
</style>