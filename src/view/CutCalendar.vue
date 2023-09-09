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
          v-for="bkg of calendarMap[day.format('YYYY-MM-DD')]"
          :key="bkg.id"
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
          <el-popover
            v-if="bkg.calendar_status"
            trigger="click"
          >
            <el-radio-group
              v-if="bkg.state"
              v-model="bkg.calendar_status"
              @change="value => changeStatus(value, bkg)"
            >
              <el-radio
                v-for="(status, i) of bkg.state.split('|')"
                :key="i"
                :label="status"
              >
                {{ status }}
              </el-radio>
            </el-radio-group>
            <div
              slot="reference"
              class="calendar-status"
              @click.stop=""
            >
              {{ bkg.calendar_status }}
            </div>
          </el-popover>
          <div
            v-else
            class="calendar-status-empty"
          />
        </div>
      </div>
      <el-select
        slot="btn"
        v-model="query.bkg_type"
        clearable
        placeholder="BKG TYPE"
        @change="changeCurrentDate()"
        @focus="getOptionsAnsyc(6, options.bkg_type)"
      >
        <el-option
          v-for="{id, value, label} in options.bkg_type.item"
          :key="id"
          :value="value"
          :label="label"
        />
      </el-select>
    </week-clandar>
  </div>
</template>

<script>
import moment from 'moment';
import { getCalendar, setCalendarStatus } from '@/api/main';
import WeekClandar from '@/components/WeekClandar.vue';
import { getOptionsAnsyc } from '@/mixin/main';

moment.locale('ja');

export default {
  components: {
    WeekClandar
  },
  mixins: [
    getOptionsAnsyc
  ],

  data () {
    return {
      query: {
        bkg_type: ''
      },
      currentDate: moment(),
      start_date: '',
      end_date: '',
      calendarMap: {},
      loading: false,
      options: {
        bkg_type: {
          item: [],
          loading: false
        }
      }
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
        const query = this.query;
        const params = { start_date, end_date, ...query };
        const list = await getCalendar(params);
        const map = {};
        for (const item of list) {
          if (map[item.cy_cut]) {
            map[item.cy_cut].push(item);
          } else {
            map[item.cy_cut] = [item];
          }
        }
        this.calendarMap = map;
      } catch (error) {
      }
      this.loading = false;
    },

    changeCurrentDate (date = this.currentDate) {
      const start_date = moment(date).startOf('week').format('YYYY-MM-DD');
      const end_date = moment(date).endOf('week').format('YYYY-MM-DD');
      this.getMonthOrder(start_date, end_date);
      this.start_date = start_date;
      this.end_date = end_date;
    },

    showDetail (id) {
      this.$router.push(`/form/${id}/edit`);
    },

    async changeStatus (status, bkg) {
      try {
        await setCalendarStatus({
          id: bkg.id,
          status
        });
      } catch (error) {
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../assets/style/calendar.less';
</style>
