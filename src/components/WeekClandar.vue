<template>
  <div>
    <div class="title">
      <div />
      <h2 class="month">
        {{ value.format('YYYY-MM') }}
      </h2>
      <div class="btn">
        <slot name="btn" />
        <el-button-group>
          <el-button @click="lastWeek">
            前週
          </el-button>
          <el-button @click="thisWeek">
            本週
          </el-button>
          <el-button @click="nextWeek">
            翌週
          </el-button>
        </el-button-group>
      </div>
    </div>

    <table
      class="calendar"
      border="0"
    >
      <tr>
        <th
          v-for="(day, i) of days"
          :key="i"
        >
          {{ day.format('dd') }}
        </th>
      </tr>
      <tr>
        <td
          v-for="day of days"
          :key="day.format('YYYY-MM-DD')"
        >
          <slot :day="day" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    value: {
      type: moment
    }
  },

  data () {
    return {};
  },

  computed: {
    days () {
      const days = [];
      const start = moment(this.value).startOf('week');
      for (let i = 0;i < 7;i++) {
        days.push(moment(start).day(i));
      }
      return days;
    }
  },

  methods: {
    thisWeek () {
      this.$emit('input', moment());
    },

    nextWeek () {
      this.$emit('input', moment(this.value).add(7, 'day'));
    },

    lastWeek () {
      this.$emit('input', moment(this.value).add(-7, 'day'));
    }
  }
};
</script>

<style lang="less" scoped>
.calendar{
    border-collapse:collapse;
    width: 100%;

    td{
        vertical-align: top;
    }

    td,th{
        width: 14%;

        &:first-child,
        &:last-child{
            width: 5%;
        }

        &:nth-child(n+2){
            border-left: 1px solid #000;
        }
    }

}

.title{
    display: flex;
    justify-content: space-between;

    .month{
        text-align: center;
    }

    .btn{
        text-align: right;
    }

    &>*{
        width: 30%;
    }
}
</style>
