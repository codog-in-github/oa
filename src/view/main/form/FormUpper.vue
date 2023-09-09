<template>
  <div class="upper">
    <div class="title">
      取引業者情報
    </div>
    <div class="header-input-box">
      <div class="group">
        <title-group
          title="BOOKER"
        >
          <el-autocomplete
            v-model="booker"
            :fetch-suggestions="querySearch"
            @focus="getOptionsAnsyc(8, options.booker)"
            @change="setBStaffDefaultVal"
            @select="val=>{ booker=val.booker; shipper=val.booker; short_name=val.short_name}"
          >
            <template slot-scope="{ item }">
              {{ item.booker }}
            </template>
          </el-autocomplete>
        </title-group>
        <span class="delimiter">&sol;</span>
        <title-group title="B/STAFF">
          <el-input v-model="b_staff" />
        </title-group>
        <title-group title="略称">
          <el-input v-model="short_name" />
        </title-group>
      </div>
      <title-group title="SHIPPER">
        <el-input v-model="shipper" />
      </title-group>
      <div class="group">
        <title-group title="通関会社">
          <el-autocomplete
            v-model="forwarder"
            :fetch-suggestions="queryForwarderSearch"
            :clearable="true"
            @focus="getOptionsAnsyc(7, options.forwarder)"
            @select="setFStaffDefaultVal"
          />
        </title-group>
        <span class="delimiter">&sol;</span>
        <title-group title="F/STAFF">
          <el-input v-model="f_staff" />
        </title-group>
      </div>
      <title-group title="CONSIGNEE">
        <el-input v-model="consignee" />
      </title-group>
      <div class="group">
        <title-group title="BOOKING先">
          <el-autocomplete
            v-model="drayage"
            :fetch-suggestions="queryDrayageSearch"
            @focus="getOptionsAnsyc(5, options.drayage)"
            @select="setDStaff"
          />
        </title-group>
        <span class="delimiter">&sol;</span>
        <title-group title="D/STAFF">
          <el-input v-model="d_staff" />
        </title-group>
      </div>
    </div>
  </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main.js';
import { findInArray } from '@/utils';
import TitleGroup from '@/components/TitleGroup.vue';

export default {
  components: {
    TitleGroup
  },
  mixins: [
    getOptionsAnsyc
  ],
  data () {
    return {
      booker: null,
      b_staff: null,
      shipper: '荷主名がBOOKERと異なる場合のみ、記入してください。',
      forwarder: null,
      f_staff: null,
      consignee: null,
      drayage: null,
      d_staff: null,
      short_name: '',
      options: {
        booker: { item: [], loading: false },
        forwarder: { item: [], loading: false },
        drayage: { item: [], loading: false }
      }
    };
  },
  methods: {
    querySearch (str, cb) {
      cb(this.options.booker.item.filter(item => item.booker.indexOf(str || '') !== -1));
    },
    queryDrayageSearch (str, cb) {
      cb(this.options.drayage.item.filter(item => item.label.indexOf(str || '') !== -1));
    },
    queryForwarderSearch (str, cb) {
      cb(this.options.forwarder.item.filter(item => item.label.indexOf(str || '') !== -1));
    },
    setDStaff () {
      this.d_staff = findInArray(
        'extra',
        this.drayage,
        this.options.drayage.item,
        'label'
      );
    },
    getData () {
      return {
        booker: this.booker,
        b_staff: this.b_staff,
        shipper: this.shipper,
        forwarder: this.forwarder,
        f_staff: this.f_staff,
        consignee: this.consignee,
        drayage: this.drayage,
        d_staff: this.d_staff,
        short_name: this.short_name
      };
    },
    setData ({ trader, booker }) {
      this.booker = trader.booker;
      this.b_staff = trader.b_staff;
      this.shipper = trader.shipper;
      this.forwarder = trader.forwarder;
      this.f_staff = trader.f_staff;
      this.consignee = trader.consignee;
      this.drayage = trader.drayage;
      this.d_staff = trader.d_staff;
      this.short_name = trader.short_name;
      if (booker) {
        this.$store.state.form.booker = booker;
      }
    },
    setBStaffDefaultVal () {
      let bookerInfo = false;
      for (const item of this.options.booker.item) {
        if (item['booker'] === this.booker) {
          bookerInfo = item;
          break;
        }
      }
      if (bookerInfo) {
        this.b_staff = bookerInfo.staff;
        this.$store.state.form.booker = bookerInfo;
        this.$eventBus.$emit('bookerChange', bookerInfo);
      } else {
        this.$store.state.form.booker = {};
      }
    },
    setFStaffDefaultVal () {
      this.f_staff = this.forwarder ? findInArray('extra',
        this.forwarder,
        this.options.forwarder.item,
        'value'
      ) : '';
    }
  }
};
</script>
