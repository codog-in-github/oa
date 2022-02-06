<template>
    <div class="box">
        <week-clandar v-model="currentDate">
            <div slot-scope="{day}" class="day">
                <div>{{day.format('M-D')}}</div>
                <div class="cell-row" v-for="bkg of calendarMap[day.format('YYYY-MM-DD')]" :key="bkg.id" @click.stop="showDetail(bkg.id)">
                    <div class="short-name">{{ bkg.short_name }}</div>
                    <div class="quantity">{{ bkg.quantity }}本</div>
                    <div>
                        <div>{{ bkg.lp }}</div>
                        <div>{{ bkg.dp }}</div>
                    </div>
                    <div class="bkg-no">{{ bkg.bkg_no }}</div>
                    <el-popover trigger="click" v-if="bkg.calendar_status">
                        <el-radio-group v-if="bkg.state" @change="value => changeStatus(value, bkg)" v-model="bkg.calendar_status">
                            <el-radio v-for="(status, i) of bkg.state.split('|')" :key="i" :label="status">{{status}}</el-radio>
                        </el-radio-group>
                        <div slot="reference" @click.stop="" class="calendar-status">{{ bkg.calendar_status }}</div>
                    </el-popover>
                    <div v-else class="calendar-status-empty"></div>
                </div>
            </div>
        </week-clandar>
    </div>
</template>

<script>
import moment from 'moment'
import { getCalendar, setCalendarStatus } from '@/api/main'
import WeekClandar from '@/components/WeekClandar.vue'

moment.locale('ja')

export default {
    components: {
        WeekClandar
    },

    data () {
        return {
            currentDate: moment(),
            start_date: '',
            end_date: '',
            calendarMap: {},
            loading: false
        }
    },

    methods: {
        async getMonthOrder (start_date, end_date) {
            this.loading = true
            try {
                const params = { start_date, end_date }
                const list = await getCalendar(params)
                const map = {}
                for (const item of list) {
                    if (map[item.cy_cut]) {
                        map[item.cy_cut].push(item)
                    } else {
                        map[item.cy_cut] = [item]
                    }
                }
                this.calendarMap = map
            } catch (error) {
            }
            this.loading = false
        },

        changeCurrentDate (date) {
            const start_date = moment(date).startOf('month').format('YYYY-MM-DD')
            const end_date = moment(date).endOf('month').format('YYYY-MM-DD')

            if (this.start_date !== start_date || this.end_date !== end_date) {
                this.getMonthOrder(start_date, end_date)
            }

            this.start_date = start_date
            this.end_date = end_date
        },

        showDetail (id) {
            this.$router.push(`/form/${id}/edit`)
        },

        format (date) {
            return date.getDate()
        },

        async changeStatus (status, bkg) {
            try {
                await setCalendarStatus({
                    id: bkg.id,
                    status
                })
            } catch (error) {
            }
        }
    },

    watch: {
        currentDate (newValue) {
            this.changeCurrentDate(newValue)
        }
    },

    created () {
        this.changeCurrentDate(this.currentDate)
    }
}
</script>

<style lang="less" scoped>
.box{
    padding: 10px;
}

.cell-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #efefef;

    &:nth-child(n+2){
        margin-top: 10px;
    }

    &>*:nth-child(n+2){
        padding-left: .5em;
    }
}

@icon-size: 1.2em;
.calendar-status,
.short-name{
    width: @icon-size;
    height: @icon-size;
    line-height: @icon-size;
    border-radius: 100%;
    background: #000;
    color: #fff;
    text-align: center;
    padding: @icon-size * 0.2;

}
.calendar-status-empty{
    width: @icon-size;
    height: @icon-size;
    line-height: @icon-size;
    padding: @icon-size * 0.2;
}

.bkg-no{
    width: 25%;
    word-wrap:break-word;
}

.quantity{
    white-space: nowrap;
}
.day{
    padding: 10px;
}
</style>
