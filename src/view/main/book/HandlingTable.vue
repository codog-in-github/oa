<template>
  <el-form
    ref="form"
    class="form-body"
    label-width="130px"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="法人番号">
          <el-input v-model="form.croporate" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="輸出者符号">
          <el-input v-model="form.outputer_symbol" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="輸出者(SHIPPER)"
          label-width="160px"
        >
          <el-input v-model="form.shipper" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="DOC CUT">
          <el-input v-model="form.doc_cut" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="本船名">
          <el-input v-model="form.vessel_name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="CY CUT">
          <el-input v-model="form.cy_cut" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="(VOY.NO)">
          <el-input v-model="form.voyage" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ETD">
          <el-input v-model="form.etd" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="BOOKING先">
          <el-input v-model="form.booking" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ETA">
          <el-input v-model="form.eta" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="船社">
          <el-input v-model="form.carrier" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="CY OPEN">
          <el-input v-model="form.cy_open" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="通関業者">
          <el-input v-model="form.forwarder" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="コンテナ">
          <el-input
            v-model="form.container_type"
            style="width:40%;"
          />
          <el-input
            v-model="form.sum_queantity"
            style="width:20%;"
          />
          <el-input
            v-model="form.unity"
            style="width:40%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="ドレー会社">
          <el-input v-model="form.transprotation" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="スケール">
          <el-input v-model="form.expenses" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="3軸指定">
          <el-input v-model="form.chassis" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form label-position="top">
      <el-row :gutter="30">
        <el-col
          :span="3"
          :offset="2"
        >
          <el-form-item label="バーゼル">
            <el-input v-model="form.item_type[0]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="貿管令Ⅰ">
            <el-input v-model="form.item_type[1]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="貿管令Ⅱ">
            <el-input v-model="form.item_type[2]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="植物">
            <el-input v-model="form.item_type[3]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="動物">
            <el-input v-model="form.item_type[4]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="危険品">
            <el-input v-model="form.item_type[5]" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="その他">
            <el-input v-model="form.item_type[6]" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form-item
      label="CONSIGNEE/BL品名"
      label-width="160px"
    >
      <el-input
        v-model="form.consignee"
        type="textarea"
      />
    </el-form-item>
    <el-form-item
      label="HS CODE 指定"
      label-width="160px"
    >
      <el-input
        v-model="form.hs_code"
        type="textarea"
      />
    </el-form-item>
    <el-form-item
      label="空コンピック日"
      label-width="160px"
    >
      <el-input
        v-model="form.free_day"
        type="textarea"
      />
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item
          label="ピックオーダー依頼"
          label-width=" 160px"
        >
          <el-radio
            v-model="form.pick_order"
            label="有"
          />
          <el-radio
            v-model="form.pick_order"
            label="無"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-input v-model="form.pick_order_request" />
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="ピックオーダー送付"
          label-width="160px"
        >
          <el-input v-model="form.send_pick_order" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-input v-model="form.send_pick_order1" />
      </el-col>
    </el-row>
    <el-form-item label="バン詰め日程">
      <el-input v-model="form.van_day" />
    </el-form-item>
    <el-form-item label="バン詰め場所">
      <el-input v-model="form.van_place" />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="PICK場所">
          <el-input v-model="form.pick_place" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="B/L分割">
          <el-input v-model="form.bl_cut" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="搬入場所">
          <el-input v-model="form.carry_place" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="お客様SI確認">
          <el-input v-model="form.si_check" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="社内番号">
          <el-input
            v-model="form.in_no"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="INVOICE NO">
          <el-input v-model="form.invoice_no" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="内容">
      <el-input
        v-model="form.content"
        type="textarea"
      />
    </el-form-item>
    <el-divider content-position="left">
      進捗状況
    </el-divider>
    <!-- 進捗状況 start -->
    <el-row>
      <el-col :span="12">
        <el-form-item label="海上保険">
          <el-radio
            v-model="form.sea_insurance"
            label="有"
          />
          <el-radio
            v-model="form.sea_insurance"
            label="無"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="バーゼル担当">
          <el-input v-model="form.basel_charge" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ブッキングNo.">
          <el-input v-model="form.bkg_no" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="バーゼル返答日時">
          <el-input v-model="form.basel_back_time" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item
          label="乙仲通関書類送付"
          label-width="160px"
        >
          <el-input v-model="form.contoms_document" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="申告日">
          <el-input v-model="form.request_date" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="許可日">
          <el-input v-model="form.permission_date" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="申告番号">
          <el-input v-model="form.request_no" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="件 欄 (区分)">
          <el-input v-model="form.type" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="ACL , D/R 差し入れ"
          label-width="160px"
        >
          <el-input v-model="form.acl_insert" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="サレンダー手配">
          <el-input v-model="form.surrender_arrangement" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="B/L送付">
          <el-input v-model="form.bl_send" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="追加費用">
          <el-input v-model="form.extra_money" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="B/L NO.">
          <el-input v-model="form.bl_no" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="請求書">
          <el-input v-model="form.request_book" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 進捗状況 end -->
    <el-divider />
    <el-row>
      <el-col :span="3">
        お客様書類送付
      </el-col>
      <el-col
        :span="3"
        :offset="1"
      >
        <el-input v-model="form.c_book[0]" />
      </el-col>
      <el-col
        :span="3"
        :offset="1"
      >
        <el-input v-model="form.c_book[1]" />
      </el-col>
      <el-col
        :span="3"
        :offset="1"
      >
        <el-input v-model="form.c_book[2]" />
      </el-col>
      <el-col
        :span="3"
        :offset="1"
      >
        <el-input v-model="form.c_book[3]" />
      </el-col>
      <el-col
        :span="3"
        :offset="1"
      >
        <el-input v-model="form.c_book[4]" />
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { getHandingData } from '@/api/main';
import { postNewWindow } from '@/utils';
import { BOOKING_NOTICE, HANDING } from '@/constant/API';
export default {
  props: {
    bkg_id: {
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      action: BOOKING_NOTICE,
      form: {
        croporate: '',
        outputer_symbol: '',
        shipper: '',
        doc_cut: '',
        vessel_name: '',
        cy_cut: '',
        voyage: '',
        etd: '',
        carrier: '',
        eta: '',
        booking: '',
        cy_open: '',
        forwarder: '',
        container_type: '',
        sum_queantity: '',
        unity: '',
        transprotation: '',
        expenses: '',
        chassis: '',
        item_type: [
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        consignee: '',
        hs_code: '',
        free_day: '',
        pick_order: '',
        pick_order_request: '',
        send_pick_order: '',
        send_pick_order1: '',
        van_day: '',
        van_place: '',
        pick_place: '',
        bl_cut: '',
        carry_place: '',
        si_check: '',
        in_no: '',
        invoice_no: '',
        content: '',
        sea_insurance: '',
        basel_charge: '',
        bkg_no: '',
        basel_back_time: '',
        contoms_document: '',
        request_date: '',
        permission_date: '',
        request_no: '',
        type: '',
        acl_insert: '',
        surrender_arrangement: '',
        bl_send: '',
        extra_money: '',
        bl_no: '',
        request_book: '',
        service: '',
        c_book: [
          '',
          '',
          '',
          '',
          ''
        ]
      }
    };
  },
  methods: {
    async loadData () {
      this.clear();
      try {
        const data = await getHandingData(this.$route.params.bkg_id);
        for (let k in data) {
          if (this.form[k] !== undefined) {
            if (k === 'item_type' || k === 'c_book') {
              let sp = data[k]?.split('|');
              for (let i in sp) {
                this.form[k][i] = sp[i];
              }
            } else {
              this.form[k] = data[k];
            }
          }
        }
      } catch (error) {
      }
    },
    clear () {
      for (let k in this.form) {
        if (this.form[k] instanceof Array) {
          for (let j in this.form[k]) {
            this.form[k][j] = '';
          }
        } else {
          this.form[k] = '';
        }
      }
    },
    beDownload () {
      let data = { ...this.form };
      data.bkg_id = this.$route.params.bkg_id;
      postNewWindow(HANDING, data);
    },
    cbookAdd () {
      if (this.form.c_book > 7) {
        return void 0;
      }
      this.form.c_book.push('');
    },
    cbookDelete (i) {
      this.form.c_book.splice(i, 1);
    }
  }
};
</script>
