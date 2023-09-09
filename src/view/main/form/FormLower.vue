<template>
  <div class="lower">
    <div class="shipper">
      <div class="title">
        船社情报
      </div>
      <div class="group">
        <title-group title="CARRIER">
          <el-autocomplete
            v-model="carrier"
            :fetch-suggestions="querySearch"
            @focus="getOptionsAnsyc(5, options.carrier)"
            @select="setCStaff"
          />
        </title-group>
        <span class="delimiter">&sol;</span>
        <title-group title="C/STAFF">
          <el-input v-model="c_staff" />
        </title-group>
      </div>
      <div class="group">
        <title-group title="SERVICE">
          <el-input v-model="service" />
        </title-group>
        <div class="group">
          <title-group title="VESSEL NAME">
            <el-input v-model="vessel_name" />
          </title-group>
          <span class="delimiter">&sol;</span>
          <title-group title="VOYAGE">
            <el-input v-model="voyage" />
          </title-group>
        </div>
      </div>
    </div>
    <div class="port-message">
      <div class="loading">
        <div class="title">
          PORT OF LOADING
        </div>
        <title-group title="Country/Region">
          <el-select
            v-model="port_of_loading.country"
            filterable
            :filter-method="val=>(keywords.port_of_loading_country=val)"
            :loading="options.country.loading"
            @focus="getOptionsAnsyc(2, options.country)"
          >
            <el-option
              v-for="{id, label, value, code} in searchedOptios('port_of_loading_country', 'country')"
              :key="id"
              :label="code"
              :value="value"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
        <title-group title="Port">
          <el-select
            v-model="port_of_loading.port"
            filterable
            clearable

            :filter-method="val=>(keywords.port_of_loading_port=val)"
            :loading="options.port_of_loading.loading"
            @change="formatPort('port_of_loading')"
          >
            <el-option
              v-for="{id, value, label, code} in searchedOptios('port_of_loading_port', 'port_of_loading')"
              :key="id"
              :label="code"
              :value="value"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
        <title-group title="ETA">
          <el-date-picker
            v-model="port_of_loading.eta"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
        <title-group title="ETD">
          <el-date-picker
            v-model="port_of_loading.etd"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
        <title-group title="CY OPEN">
          <el-date-picker
            v-model="port_of_loading.cy_open"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
        <title-group title="CY CUT">
          <el-date-picker
            v-model="port_of_loading.cy_cut"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
        <title-group title="DOC CUT">
          <el-date-picker
            v-model="port_of_loading.doc_cut"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
      </div>
      <div class="delivery">
        <div class="title">
          PORT OF DELIVERY
        </div>
        <title-group title="Country/Region">
          <el-select
            v-model="port_of_delivery.country"
            filterable
            :filter-method="val=>(keywords.port_of_delivery_country=val)"
            :loading="options.country.loading"
            @focus="getOptionsAnsyc(2, options.country)"
          >
            <el-option
              v-for="{id, label, value, code} in searchedOptios('port_of_delivery_country', 'country')"
              :key="id"
              :value="value"
              :label="code"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
        <title-group title="Port">
          <el-select
            v-model="port_of_delivery.port"
            filterable
            clearable

            :filter-method="val=>(keywords.port_of_delivery_port=val)"
            :loading="options.port_of_delivery.loading"
            @change="formatPort('port_of_delivery')"
          >
            <el-option
              v-for="{id, label, value, code} in searchedOptios('port_of_delivery_port', 'port_of_delivery')"
              :key="id"
              :value="value"
              :label="code"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
        <title-group title="ETA">
          <el-date-picker
            v-model="port_of_delivery.eta"
            style="width:auto;"
            value-format="yyyy-MM-dd"
          />
        </title-group>
        <title-group title="FREE TIME DEM">
          <el-input
            v-model="port_of_delivery.free_time_dem"
            type="number"
          />
        </title-group>
        <title-group title="FREE TIME DET">
          <el-input
            v-model="port_of_delivery.free_time_det"
            type="number"
          />
        </title-group>
        <div class="title">
          PORT OF DISCHARGE
        </div>
        <title-group title="Country/Region">
          <el-select
            v-model="port_of_discharge.country"
            filterable
            :filter-method="val=>(keywords.port_of_discharge_country=val)"
            :loading="options.country.loading"
            @focus="getOptionsAnsyc(2, options.country)"
          >
            <el-option
              v-for="{id, label, value, code} in searchedOptios('port_of_discharge_country', 'country')"
              :key="id"
              :value="value"
              :label="code"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
        <title-group title="Port">
          <el-select
            v-model="port_of_discharge.port"
            filterable
            clearable
            :filter-method="val => { keywords.port_of_discharge_port = val }"
            :loading="options.port_of_discharge.loading"
            @change="formatPort('port_of_discharge')"
          >
            <el-option
              v-for="{id, label, value, code} in searchedOptios('port_of_discharge_port', 'port_of_discharge')"
              :key="id"
              :value="value"
              :label="code"
            >
              <div class="country-opt">
                <span>{{ label }}</span><span>({{ code }})</span>
              </div>
            </el-option>
          </el-select>
        </title-group>
      </div>
    </div>
  </div>
</template>
<script>
import TitleGroup from '@/components/TitleGroup.vue';
import { common, getOptionsAnsyc } from '@/mixin/main';
import { findInArray } from '@/utils';

export default {
  components: {
    TitleGroup
  },
  mixins: [
    getOptionsAnsyc,
    common
  ],
  data () {
    return {
      carrier: null,
      c_staff: null,
      service: null,
      vessel_name: null,
      voyage: null,
      port_of_loading: {
        country: null,
        port: null,
        eta: null,
        etd: null,
        cy_open: null,
        cy_cut: null,
        doc_cut: null
      },
      port_of_delivery: {
        country: null,
        port: null,
        eta: null,
        free_time_dem: null,
        free_time_det: null
      },
      port_of_discharge: {
        country: null,
        port: ''
      },
      // 下拉选项
      options: {
        country: { loading: false, item: [] },
        port_of_loading: { loading: false, item: [] },
        port_of_delivery: { loading: false, item: [] },
        port_of_discharge: { loading: false, item: [] },
        carrier: { loading: false, item: [] }
      },
      // 用于搜索的关键字
      keywords: {
        port_of_loading_country: '',
        port_of_delivery_country: '',
        port_of_discharge_country: '',
        port_of_loading_port: '',
        port_of_delivery_port: '',
        port_of_discharge_port: ''
      }
    };
  },
  watch: {
    'port_of_loading.country' (newValue, oldValue) {
      if (oldValue === newValue) return;
      this.port_of_loading.port = null;
      this.options.port_of_loading.item = [];
      this.options.port_of_loading.loaded = false;
      this.getOptionsAnsyc(
        2,
        this.options.port_of_loading,
        newValue
      );
    },
    'port_of_delivery.country' (newValue, oldValue) {
      if (oldValue === newValue) return;
      this.port_of_delivery.port = null;
      this.options.port_of_delivery.item = [];
      this.options.port_of_delivery.loaded = false;
      this.getOptionsAnsyc(
        2,
        this.options.port_of_delivery,
        newValue
      );
    },
    'port_of_discharge.country' (newValue, oldValue) {
      if (oldValue === newValue) return;
      this.port_of_discharge.port = null;
      this.options.port_of_discharge.item = [];
      this.options.port_of_discharge.loaded = false;
      this.getOptionsAnsyc(
        2,
        this.options.port_of_discharge,
        newValue
      );
    }
  },
  mounted () {
    if (!this.$route.params.bkg_id) {
      this.port_of_loading.country = 'JP';
      this.port_of_delivery.country = 'CN';
    }
  },
  methods: {
    querySearch (str, cb) {
      cb(this.options.carrier.item.filter(item => item.label.indexOf(str || '') !== -1));
    },

    searchedOptios (keywordName, optionsName) {
      return this.options[optionsName].item.filter(item =>
        item.label.toLowerCase().indexOf(this.keywords[keywordName].toLowerCase()) !== -1 ||
                item.code.toLowerCase().indexOf(this.keywords[keywordName].toLowerCase()) !== -1
      );
    },

    setCStaff () {
      this.c_staff = findInArray(
        'extra',
        this.carrier,
        this.options.carrier.item,
        'label'
      );
    },

    getData () {
      if (!this.port_of_loading.cy_cut) {
        this.$message.error('PLEASE ENTER THE "CY CUT"!');
        return false;
      }
      return {
        carrier: this.carrier,
        c_staff: this.c_staff,
        service: this.service,
        vessel_name: this.vessel_name,
        voyage: this.voyage,
        port_of_loading: this.port_of_loading,
        port_of_delivery: {
          ...this.port_of_delivery,
          discharge_country: this.port_of_discharge.country,
          discharge_port: this.port_of_discharge.port
        }
      };
    },
    setData ({ shipper, loading, delivery }) {
      if (this.isCopy) {
        shipper.service = '';
        shipper.vessel_name = '';
        shipper.voyage = '';

        loading.eta = '';
        loading.etd = '';
        loading.cy_open = '';
        loading.cy_cut = '';
        loading.doc_cut = '';

        delivery.eta = '';
      }
      this.carrier = shipper.carrier;
      this.c_staff = shipper.c_staff;
      this.service = shipper.service;
      this.vessel_name = shipper.vessel_name;
      this.voyage = shipper.voyage;

      this.port_of_loading.country = loading.country;
      this.port_of_loading.eta = loading.eta;
      this.port_of_loading.etd = loading.etd;
      this.port_of_loading.cy_open = loading.cy_open;
      this.port_of_loading.cy_cut = loading.cy_cut;
      this.port_of_loading.doc_cut = loading.doc_cut;

      this.port_of_delivery.country = delivery.country;
      this.port_of_delivery.eta = delivery.eta;
      this.port_of_delivery.free_time_dem = delivery.free_time_dem;
      this.port_of_delivery.free_time_det = delivery.free_time_det;
      this.port_of_discharge.country = delivery.discharge_country;
      // country监听器导致 port被更新 port需要在nexttick中更新
      this.$nextTick(() => {
        this.port_of_loading.port = loading.port;
        this.port_of_delivery.port = delivery.port;
        this.port_of_discharge.port = delivery.discharge_port;
      });
    },
    formatPort (witch) {
      if (this[witch].port !== '') {
        this[witch].port = `${findInArray(
          'label',
          this[witch].port,
          this.options[witch].item,
          'code'
        )}(${this[witch].country}${this[witch].port})`;
      }
    }
  }
};
</script>

<style scoped>
.lower{
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
}
.lower > *{
    width: 100%;
}
.loading{
    background: red;
    color: #fff;
    padding: 10px;
}
.delivery{
    background: lightblue;
    color: #000;
    padding: 10px;
}

.port-message{
    display: flex;
    justify-content: space-around;
}

.port-message > div{
    width: 45%;
}

.country-opt{
    display: flex;
    justify-content: space-between;
}
</style>
