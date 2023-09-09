<template>
  <el-form ref="form"
           class="form-body"
           label-width="120px">
    <el-form-item label="ADDRESS:">
      <el-radio-group v-model="address">
        <el-radio v-for="addr in addressList"
                  :key="addr.id"
                  :label="addr.id">
          {{ addr.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="BOOKER:">
      <el-input v-model="shipper" :value="shipper"/>
    </el-form-item>
    <el-form-item label="BOOKING NO:">
      <el-input v-model="booking_no" />
    </el-form-item>
    <el-form-item label="VESSEL:">
      <el-input v-model="vessel" />
    </el-form-item>
    <el-form-item label="VOY:">
      <el-input v-model="voy" />
    </el-form-item>
    <el-form-item label="CARRIER:">
      <el-input v-model="vessel_carrier" />
    </el-form-item>
    <el-form-item label="POL:">
      <el-input v-model="pol" />
    </el-form-item>
    <el-form-item label="POD:">
      <el-input v-model="pod" />
    </el-form-item>
    <el-form-item label="ETD:">
      <el-input v-model="etd" />
    </el-form-item>
    <el-form-item v-if="ts" label="T/S:">
      <el-input v-model="ts" />
    </el-form-item>
    <el-form-item label="ETA:">
      <el-input v-model="eta" />
    </el-form-item>
    <el-form-item label="CY OPEN:">
      <el-input v-model="cy_open" />
    </el-form-item>
    <el-form-item label="CY CUT:">
      <el-input v-model="cy_cut" />
    </el-form-item>
    <el-form-item label="DOC CUT:">
      <el-input v-model="doc_cut" />
    </el-form-item>

    <el-form-item v-for="(c,i) in container"
                  :key="i"
                  :label="`CONTAINER${i+1}:`">
      <el-input v-model="container[i]" />
    </el-form-item>
    <el-form-item label="COMMON:">
      <el-input v-model="common" />
    </el-form-item>
    <el-form-item label="CONSIGNEE:">
      <el-input v-model="consiginee"
                type="textarea" />
    </el-form-item>
    <el-form-item label="REMARK:">
      <el-input v-model="remarks"
                type="textarea" />
    </el-form-item>
  </el-form>
</template>
<script>
import { getBookingNotice, getDepartmentList } from '@/api/main';
import { postNewWindow } from '@/utils';
import { common } from '@/mixin/main';
import { BOOKING_NOTICE } from '@/constant/API';
export default {
  mixins: [
    common
  ],
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false,
      action: BOOKING_NOTICE,
      address: '1',
      shipper: '',
      booking_no: '',
      vessel: '',
      voy: '',
      vessel_carrier: '',
      pol: '',
      pod: '',
      ts: '',
      etd: '',
      eta: '',
      cy_open: '',
      cy_cut: '',
      doc_cut: '',
      container: [],
      common: '',
      consiginee: '',
      remarks: '',
      addressList: []
    };
  },
  mounted () {
    getDepartmentList().then(res => {
      this.addressList = res;
    });
  },
  methods: {
    async loadData () {
      this.loading = true;
      try {
        const fd = await getBookingNotice(this.$route.params.bkg_id);
        this.shipper = fd.trader.booker;
        this.booking_no = fd.bkg.bkg_no;
        this.vessel = fd.shipper.vessel_name;
        this.voy = fd.shipper.voyage;
        this.vessel_carrier = fd.shipper.carrier;
        this.pol = fd.loading.port;
        this.pod = fd.delivery.port;
        this.ts = fd.delivery.discharge_port;
        this.etd = fd.loading.etd;
        this.eta = fd.delivery.eta;
        this.cy_open = fd.loading.cy_open;
        this.cy_cut = fd.loading.cy_cut;
        this.doc_cut = fd.loading.doc_cut;
        this.container.splice(0, this.container.length);
        this.container.push(...fd.type.map(item => `${item.container_type} * ${item.quantity}`));
        this.consiginee = fd.container.consiginee;
        // this.container = '';
        let remarks = '';
        if (fd.remarks && !/^\s+$/.test(fd.remarks)) {
          remarks = fd.remarks;
        } else {
          for (let item of fd.detail) {
            remarks += `${
              item.vanning_date ? '＊バン詰め： ' : ''
            }${
              item.vanning_date.slice(0, 10) || ''
            } ${
              item.vanning_during?.split('-')[0] || ''
            } ${
              item.chassis || ''
            }  ${
              item.expenses || ''
            }\n${item.booker_place ? 'VAN場所：' + item.booker_place : ''} \n`;
          }
          remarks += fd.container.remarks;
        }
        this.common = fd.container.common;
        this.remarks = remarks;
      } catch (error) {
      }
      this.loading = false;
    },
    beDownload () {
      const params = {
        id: this.bkgId,
        address: this.address,
        shipper: this.shipper,
        booking_no: this.booking_no,
        vessel: this.vessel,
        voy: this.voy,
        vessel_carrier: this.vessel_carrier,
        pol: this.pol,
        pod: this.pod,
        etd: this.etd,
        eta: this.eta,
        cy_open: this.cy_open,
        cy_cut: this.cy_cut,
        doc_cut: this.doc_cut,
        container: this.container,
        common: this.common,
        consiginee: this.consiginee,
        remarks: this.remarks
      };
      if (this.ts) {
        params.ts = this.ts;
      }
      postNewWindow(BOOKING_NOTICE, params);
    }
  }
};
</script>
