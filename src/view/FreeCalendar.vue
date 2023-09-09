<template>
  <div class="box">
    <week-clandar v-model="currentDate">
      <div
        slot-scope="{day}"
        class="day"
      >
        <div class="day-title">
          {{ day.format('M-D') }}
        </div>
        <div
          v-for="bkg of getRealDay(day)"
          :key="bkg.detail_id"
          class="cell-row"
          @click.stop="showDetail(bkg.id)"
        >
          <div class="short-name">
            {{ bkg.short_name }}
          </div>
          <div class="quantity">
            {{ bkg.quantity }}本
          </div>
          <div>
            <div>{{ bkg.lp }}</div>
            <div>{{ bkg.dp }}</div>
          </div>
          <div class="bkg-no">
            {{ bkg.bkg_no }}
          </div>
          <div
            v-if="bkg.transprotation_short_name"
            class="calendar-status"
          >
            {{ bkg.transprotation_short_name }}
          </div>
          <div
            v-else
            class="calendar-status-empty"
          />
        </div>
      </div>
    </week-clandar>
  </div>
</template>

<script>
import moment from 'moment';
import { getDetailCalendar, setCalendarStatus } from '@/api/main';
import WeekClandar from '@/components/WeekClandar.vue';

moment.locale('ja');

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
    };
  },

  watch: {
    currentDate (newValue) {
      this.changeCurrentDate(newValue);
    }
  },

  created () {
    this.changeCurrentDate(this.currentDate);
  },

  methods: {
    async getMonthOrder (start_date, end_date) {
      this.loading = true;
      try {
        const params = { start_date, end_date };
        const list = await getDetailCalendar(params);
        const map = {};
        for (const item of list) {
          if (map[item.free_pick_day]) {
            map[item.free_pick_day].push(item);
          } else {
            map[item.free_pick_day] = [item];
          }
        }
        this.calendarMap = map;
      } catch (error) {
      }
      this.loading = false;
    },

    changeCurrentDate (date) {
      const start_date = moment(date).day(2).format('YYYY-MM-DD');
      const end_date = moment(date).day(8).format('YYYY-MM-DD');

      if (this.start_date !== start_date || this.end_date !== end_date) {
        this.getMonthOrder(start_date, end_date);
      }

      this.start_date = start_date;
      this.end_date = end_date;
    },

    showDetail (id) {
      this.$router.push(`/form/${id}/edit`);
    },

    format (date) {
      return date.getDate();
    },

    async changeStatus (status, bkg) {
      try {
        await setCalendarStatus({
          id: bkg.id,
          status
        });
      } catch (error) {
      }
    },

    getRealDay (day) {
      const real = day.clone().add(day.get('day') === 5 ? 3 : 1, 'day').format('YYYY-MM-DD');
      return this.calendarMap[real];
    }
  }
};
</script>

<style lang="less" scoped>
@import '../assets/style/calendar.less';
</style>
