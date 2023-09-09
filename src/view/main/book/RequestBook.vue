<template>
  <div>
    <el-dialog
      :visible="form"
      :close-on-click-modal="false"
      :fullscreen="true"
      @close="close"
    >
      <template #title>
        <div class="title">
          請求書
        </div>
      </template>
      <el-form
        v-loading="loading"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="〒">
              <el-input v-model="tel" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="請求番号：">
              <el-input v-model="no" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="住所">
              <el-input v-model="booker_place" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="請求日：">
              <el-date-picker
                v-model="date"
                style="width:100%"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会社名">
              <el-input v-model="booker_name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-row
          v-for="(item, i) in extra"
          :key="i"
          :gutter="20"
        >
          <el-col
            v-for="(col, j) in item"
            :key="j"
            :span="item.length===2?12:22"
          >
            <mulit-select
              :data="col"
              @deleteCol="deleteCol(item, j)"
              @select="value=>setDefaultExtra(value,col)"
            />
          </el-col>
          <el-col
            v-if="item.length===1"
            :span="2"
          >
            <el-button
              type="primary"
              @click="addCol(item)"
            >
              ADD
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button
              class=""
              style="width:100%"
              type="primary"
              @click="addRow"
            >
              ADD
            </el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-table :data="detail">
          <el-table-column label="明細項目">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.item_name"
                :fetch-suggestions="itemSearch"
                @focus="getOptionsAnsyc(12, options.item)"
                @select="item=>setDefaultUnit(item, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="詳細">
            <template slot-scope="scope">
              <el-input-number
                v-if="scope.row.currency"
                v-model="scope.row.detail"
                controls-position="right"
              />
              <el-input
                v-else
                v-model="scope.row.detail"
              />
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.currency"
                placeholder=""
              >
                <el-option
                  label=""
                  value=""
                />
                <el-option
                  label="$"
                  value="USD"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="単価">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.price"
                controls-position="right"
              />
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.num"
                controls-position="right"
              />
            </template>
          </el-table-column>
          <el-table-column label="単位">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.unit"
                :fetch-suggestions="unitSearch"
                @focus="getOptionsAnsyc(13, options.unit)"
              />
            </template>
          </el-table-column>
          <el-table-column label="消费税">
            <template slot-scope="scope">
              <el-select v-model="scope.row.tax">
                <el-option
                  label="免"
                  value="免"
                />
                <el-option
                  label="課"
                  value="課"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="金額">
            <template slot-scope="scope">
              <el-input
                :value="scope.row.total.toFixed(2)"
                readonly
              />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="{ $index, row }">
              <el-button-group>
                <el-button
                  v-if="$index !==0 "
                  icon="el-icon-caret-top"
                  circle
                  @click="moveUp($index, row)"
                />
                <el-button
                  v-if="$index !== detail.length-1 "
                  icon="el-icon-caret-bottom"
                  circle
                  @click="moveDown($index, row)"
                />
                <el-button
                  icon="el-icon-remove"
                  circle
                  type="danger"
                  @click="detailDel($index)"
                />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <el-button
              class=""
              style="width:100%"
              type="primary"
              @click="detailAdd"
            >
              ADD
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="24"
            class="value"
          >
            &#91;&#42;消費税対象金額  {{ inTak.toFixed(2) }} &#93;
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col
            :span="12"
            class="label"
          >
            小計
          </el-col>
          <el-col
            :span="12"
            class="value"
          >
            &#91;&#42; {{ subtotal.toFixed(2) }} &#93;
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="12"
            class="label"
          >
            消費税
          </el-col>
          <el-col
            :span="12"
            class="value"
          >
            &#91;&#42; {{ takTotal.toFixed(2) }} &#93;
          </el-col>
        </el-row>
        <el-row class="sum">
          <el-col
            :span="12"
            class="label"
          >
            御請求金額
          </el-col>
          <el-col
            :span="12"
            class="value"
          >
            &#91;&#42; {{ sum.toFixed(2) }} &#93;
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="24">
            <el-form-item label="銀行">
              <el-radio-group v-model="bank">
                <el-radio
                  v-for="bank in bankList"
                  :key="bank.id"
                  :label="bank.id"
                >
                  {{ bank.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址">
              <el-radio-group v-model="address">
                <el-radio
                  v-for="dep in departmentList"
                  :key="dep.id"
                  :label="dep.id"
                >
                  {{ dep.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="社印">
              <el-switch v-model="sign" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button
          type="primary"
          @click="addReq"
        >
          追加請求書
        </el-button>
        <el-button
          v-if="!readonly"
          type="primary"
          @click="copyDialog = true"
        >
          参照入力
        </el-button>
        <el-button
          v-if="!readonly"
          type="primary"
          @click="beDownload"
        >
          出力
        </el-button>
        <el-button @click="close">
          戻る
        </el-button>
      </template>
      <el-dialog
        :visible="copyDialog"
        :modal="false"
        title="参照入力"
        @close="copyClose"
      >
        <el-select v-model="copy_field">
          <el-option
            label="社内管理番号"
            :value="0"
          />
          <el-option
            label="BKG NO."
            :value="1"
          />
        </el-select>
        <el-input
          v-model="company_no"
          style="width:40%; margin-left:10px;"
        />
        <template #footer>
          <el-button
            type="primary"
            @click="doCopy"
          >
            参照入力
          </el-button>
          <el-button @click="copyClose">
            戻る
          </el-button>
        </template>
      </el-dialog>
    </el-dialog>
    <el-dialog
      :visible="list"
      @close="closeList"
    >
      <div>
        <el-button
          v-for="{id, date, create_time} in requestList"
          :key="id"
          @click="reqbookSelect(id)"
        >
          {{ create_time || date }}
        </el-button>
      </div>
      <el-button
        slot="footer"
        @click="closeList"
      >
        戻る
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import MulitSelect from '@/components/MulitSelect';
import { getOptionsAnsyc } from '@/mixin/main';
import { findInArray, getRandomID, postNewWindow } from '@/utils';
import { getBankList, getDepartmentList, getRequestbook, getRequestbookList, hasBookByCompanyNo } from '@/api/main';
import moment from 'moment';
import { REQUESTBOOK } from '@/constant/API';

const RATE = 'RATE';
let extraDefault = {};
let resolveRequestbookSelected = () => {};
let rejectRequestbookSelected = () => {};

export default {
  components: { MulitSelect },
  mixins: [
    getOptionsAnsyc
  ],
  props: {
    bkgId: {
      type: String,
      default: ''
    },
    requestId: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,

      id: '',
      tel: '',
      no: '',
      booker_place: '',
      date: '',
      booker_name: '',
      extra: [],
      detail: [],
      bank: '',
      address: '',
      sign: true,

      options: {
        item: { item: [], loading: false },
        unit: { item: [], loading: false }
      },

      copyDialog: false,
      copy_field: 0,
      company_no: '',

      requestList: [],
      form: false,
      list: false,
      bankList: [],
      departmentList: []
    };
  },
  computed: {
    rate () {
      for (const row of this.extra) {
        for (const col of row) {
          if (col.label === RATE) {
            return col.value;
          }
        }
      }
      return false;
    },
    inTak () {
      return this.detail
        .filter(current => current.tax === '課')
        .reduce((prev, current) => prev + current.total, 0);
    },
    subtotal () {
      return this.detail
        .reduce((prev, current) => prev + current.total, 0);
    },
    takTotal () {
      return this.inTak * 0.1;
    },
    sum () {
      return this.subtotal + this.takTotal;
    }
  },
  watch: {
    detail: {
      deep: true,
      handler (value) {
        for (const row of value) {
          if (this.rate && row.detail && row.currency) {
            const price = row.detail * this.rate.split('|')[1];
            if (row.price !== price) {
              row.price = parseInt(price.toFixed(2));
            }
          }
          const sum = (row.price || 0) * (row.num || 0);
          if (row.total !== sum) {
            row.total = sum;
          }
        }
      }
    }
  },
  mounted () {
    getBankList().then(list => {
      this.bankList = Object.freeze(list);
    });
    getDepartmentList().then(list => {
      this.departmentList = Object.freeze(list);
    });
  },
  methods: {
    close () {
      this.form = false;
    },

    async getbook (requestId, isCopy = false) {
      try {
        const data = await getRequestbook({
          bkg_id: this.bkgId,
          [isCopy ? 'copy_id' : 'id']: isCopy ? requestId : this.id
        });
        this.formatter(data, isCopy);
        this.form = true;
      } catch (error) {
      }
    },

    async loadData (bkgId, copyBkgId) {
      try {
        this.copyDialog = false;
        const isCopy = Boolean(copyBkgId);
        this.bkgId = bkgId;
        this.loading = true;
        this.extra = [];
        this.detail = [];
        const requestList = await getRequestbookList(isCopy ? copyBkgId : bkgId);

        if (requestList.length < 2) {
          this.id = (isCopy ? this.id : requestList[0]?.id) || getRandomID();
          this.getbook(isCopy ? requestList[0]?.id : this.id, isCopy);
        } else {
          const id = await this.showList(requestList);
          this.id = isCopy ? this.id || getRandomID() : id;
          this.getbook(isCopy ? id : this.id, isCopy);
        }
      } catch (error) {
      }
    },

    async addReq () {
      try {
        this.id = getRandomID();
        const params = {
          bkg_id: this.bkgId,
          'id': this.id
        };
        const data = await getRequestbook(params);

        this.formatter(data);
        this.$message.success('追加請求書成功');
        this.form = true;
      } catch (error) {
      }
    },

    addCol (row) {
      row.push({
        label: '',
        value: ''
      });
    },

    addRow () {
      this.extra.push([{
        label: '',
        value: ''
      }]);
    },
    deleteCol (row, index) {
      row.splice(index, 1);
    },
    detailAdd () {
      this.detail.push({
        item_name: '',
        detail: '',
        currency: '',
        price: '',
        num: 1,
        unit: '',
        tax: '免',
        total: 0
      });
    },
    detailDel (i) {
      this.detail.splice(i, 1);
    },
    itemSearch (str, cb) {
      cb(this.options.item.item.filter(i => i.label.indexOf(str || '') !== -1));
    },
    setDefaultUnit (item, row) {
      row.unit = findInArray('extra', item.value, this.options.item.item, 'label');
    },
    unitSearch (str, cb) {
      cb(this.options.unit.item);
    },
    beDownload () {
      postNewWindow(REQUESTBOOK, {
        id: this.id,
        bkg_id: this.bkgId,
        tel: this.tel,
        no: this.no,
        booker_place: this.booker_place,
        date: this.date,
        booker_name: this.booker_name,
        extra: JSON.stringify(this.extra),
        detail: JSON.stringify(this.detail),
        bank: this.bank,
        address: this.address,

        in_tak: this.inTak,
        subtotal: this.subtotal,
        tak_total: this.takTotal,
        total: this.sum,
        sign: this.sign
      });
    },
    setDefaultExtra (value, col) {
      col.value = extraDefault[value] || '';
    },
    copyClose () {
      this.copyDialog = false;
      this.company_no = '';
    },

    formatter (data, isCopy = false) {
      if (!isCopy) {
        this.id = data.id || getRandomID();
      }
      this.tel = data.tel || '';
      this.no = data.no || '';
      this.date = isCopy ? moment().format('YYYY-MM-DD') : (data.date || moment().format('YYYY-MM-DD'));
      this.booker_place = data.booker_place || '';
      this.booker_name = data.booker_name || '';
      this.bank = data.bank || '';
      this.address = data.address || '';

      this.extra = [];
      this.detail = [];

      const len = 10;
      for (let i = 0; i < len; i += 2) {
        let row = [];
        for (let j = 0; j < 2; j++) {
          if (data.extra[`label_${i + j}`] !== undefined &&
                    !(i !== 0 && !data.extra[`label_${i + j}`] && !data.extra[`value_${i + j}`])) {
            const label = data.extra[`label_${i + j}`];

            row.push(isCopy ? {
              label,
              value: extraDefault[label] ?? ''
            } : {
              label: data.extra[`label_${i + j}`],
              value: data.extra[`value_${i + j}`]
            });
          }
        }
        if (row.length > 0) {
          this.extra.push(row);
        }
      }
      this.detail = isCopy ? data.detail.map(
        detail => ({
          ...detail,
          num: 0,
          total: 0
        })
      ) : data.detail;
      extraDefault = data.extraDefault;
      this.loading = false;
    },

    reqbookSelect (reqId) {
      resolveRequestbookSelected(reqId);
      this.list = false;
    },

    closeList () {
      rejectRequestbookSelected('cancel');
      this.list = false;
    },

    showList (requestList) {
      this.list = true;
      this.requestList = requestList;
      return new Promise((resolve, reject) => {
        resolveRequestbookSelected = resolve;
        rejectRequestbookSelected = reject;
      });
    },

    async doCopy () {
      try {
        const { company_no, copy_field } = this;
        const copyBkgId = await hasBookByCompanyNo({ company_no, copy_field });
        this.loadData(this.bkgId, copyBkgId);
      } catch (error) {
      }
    },

    moveUp (index, item) {
      this.move(index, item, -1);
    },

    moveDown (index, item) {
      this.move(index, item, 2);
    },

    move (index, item, step) {
      const sort = [];
      const moveTo = Number(index) + step;
      for (let i = 0;i < this.detail.length;i++) {
        if (i === moveTo) {
          sort.push(item);
        }
        if (item !== this.detail[i]) {
          sort.push(this.detail[i]);
        }
      }
      if (moveTo === this.detail.length) {
        sort.push(item);
      }
      this.detail = sort;
    }
  }
};
</script>
<style lang="less" scoped>
.title{
    text-align: center;
    font-weight: bold;
    font-size: 18px;
}
.sum{
    font-size: 20px;
    font-weight: bold;
}
.value{
    text-align: right;
}
</style>
