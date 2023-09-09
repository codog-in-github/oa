<template>
  <div class="bkg-list">
    <header>
      <div class="input-box" style="margin-bottom:1em;" >
        <el-input v-model="condition.bkg_no" placeholder="BKG NO" size="mini" />
        <el-input v-model="condition.bl_no" placeholder="B/L NO" size="mini" />
        <el-input v-model="condition.pol" placeholder="POL" size="mini" />
        <el-input v-model="condition.pod" placeholder="POD" size="mini" />
        <el-input v-model="condition.booker" placeholder="BOOKER" size="mini" />
        <el-input v-model="condition.re" placeholder="社内管理番号" size="mini" />
        <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="condition.request_date" start-placeholder="入金請求書日付" size="mini" />
        <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="condition.income_real_time" start-placeholder="入金日" size="mini" />
        <el-button type="primary" @click="reLoad">SEARCH</el-button>
        <el-button @click="clearCondition">CLEAR</el-button>
        <el-button @click="exportAccounting" v-if="isEnd">EXPORT</el-button>
      </div>
    </header>
    <main>
      <el-table
        v-loading="loading"
        border
        height="100%"
        :data="list"
        :row-class-name="rowClassName"
        :header-cell-style="{
          background:'#409eff',
          color     :'#fff',
          fontSize  :'16px'
        }">
        <el-table-column prop="company_no"
                         label="管理番号"
                         width="100px"
                         align="center"
                         fixed />
        <el-table-column prop="show_cy_cut"
                         label="CUT"
                         :formatter="dateFormat"
                         width="100px"
                         align="center" />
        <el-table-column prop="bkg_date"
                         label="BKG"
                         :formatter="dateFormat"
                         width="100px"
                         align="center"/>
        <el-table-column prop="booker" label="BOOKER"/>
        <el-table-column prop="ld" label="POL/POD"/>
        <el-table-column prop="bkg_no" label="BKG NO"/>
        <el-table-column prop="quantity" label="QTY" width="50px"/>
        <el-table-column prop="container_type" label="CT TYPE" width="100px"/>
        <el-table-column label="入金" align="center">
          <el-table-column label="一時金"
                           align="center"
                           prop="income_total" />
          <el-table-column label="操作"
                           align="center"
                           width="100px" >
            <el-button slot-scope="{ row }"
                       @click="incomeDetail(row.id)"
            >{{ isEnd ? 'VIEW' : 'EDIT' }}</el-button>
          </el-table-column>
        </el-table-column>
        <el-table-column label="出金"
                         align="center">
          <el-table-column label="一時金"
                           align="center"
                           prop="expend_total" />
          <el-table-column label="操作"
                           align="center"
                           width="100px">
            <el-button slot-scope="{ row }" @click="showExpendList(row.id)" disabled>EDIT</el-button>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作する"
                         align="center">
          <template slot-scope="{ row }">
            <el-button v-if="isEnd" type="danger" @click="mv(row['id'], 0)">PREV</el-button>
            <el-button v-else type="primary" @click="mv(row['id'], 1)">NEXT</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <el-dialog title="入金详情" :visible.sync="income.visible">
      <el-table :data="income.list" show-summary>
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="bank" label="银行" />
        <el-table-column prop="date" label="日期" />
        <el-table-column label="入金日" width="180">
          <el-date-picker slot-scope="{ row }"
                          value-format="yyyy-MM-dd"
                          v-model="row['income_real_time']"
                          style="width: 100%;"
                          :disabled="isEnd"
                          @change="save(row['id'], $event)"
          ></el-date-picker>
        </el-table-column>
        <el-table-column prop="total" label="金额" />
      </el-table>
    </el-dialog>
    <el-dialog title="出金编辑" :visible.sync="expend.visible"/>
    <footer>
      <el-pagination
        background
        :page-sizes="[10, 50, 100]"
        :page-size="page_size"
        layout="sizes, total, prev, pager, next"
        :total="total"
        @size-change="sizeChangeHandler"
        @current-change="pageChangeHandler"/>
    </footer>
    <request-book ref="rb" :readonly="false" />
  </div>
</template>
<script>

import RequestBook from './book/RequestBook.vue';
import { getReqList, getOrderId, hasRequestbook, getIncomeList, getExpendList, saveRealTimeIncome, mvRequestStep } from '@/api/main';
import { postNewWindow } from '@/utils';
import { ACCOUNTING_INCOME } from '@/constant/API';

const PRICE_TYPE_EXPEND = 0;
const PRICE_TYPE_INCOME = 1;

export default {
  components: { RequestBook },
  data () {
    return {
      condition: {
        // cy_cut:null,
        bkg_no: '',
        bl_no: '',
        pod: '',
        pol: '',
        booker: '',
        dg: '',
        request_date: null,
        income_real_time: null
      },
      page_size: 10,
      page: 1,
      total: 0,
      list: [],
      stateChangeTimer: -1,
      newOrder: false,

      selectId: '',
      copy_no: '',

      rbShow: false,

      loading: false,

      PRICE_TYPE_EXPEND,
      PRICE_TYPE_INCOME,

      income: {
        list: [],
        visible: false
      },
      expend: {
        list: [],
        visible: false
      }
    };
  },
  computed: {
    isEnd () {
      return this.$route.params.state === '1';
    }
  },
  mounted () {
    this.reLoad();
  },
  methods: {
    async reLoad () {
      this.loading = true;
      try {
        this.loading = true;
        const bkgList = await getReqList({
          condition: this.condition,
          page_size: this.page_size,
          page: (this.page || 1) - 1,
          req_state: this.$route.params.state || ''
        });
        const { list, total, page } = bkgList;
        this.list = Object.freeze(list);
        this.total = parseInt(total);
        this.page = page;
      } catch (e) {
        console.log('e :', e);
      }
      this.loading = false;
    },

    exportAccounting () {
      postNewWindow(ACCOUNTING_INCOME, this.condition);
    },

    save (id, time) {
      saveRealTimeIncome(id, time);
    },

    async mv (id, step) {
      await mvRequestStep(id, step);
      this.reLoad();
    },

    dateFormat (_, __, cellValue) {
      return cellValue?.substr(0, 10) ?? '';
    },

    sizeChangeHandler (size) {
      this.page_size = size;
      this.reLoad();
    },

    pageChangeHandler (current) {
      this.page = current;
      this.reLoad();
    },

    doEdit (id) {
      this.$router.push(`/form/${id}/edit`);
    },

    displayDetail (id) {
      this.$router.push(`/form/${id}/view`);
    },

    clearCondition () {
      for (const k in this.condition) {
        this.condition[k] = '';
      }
      this.reLoad();
    },

    rowClassName ({ row }) {
      return row.isEven ? 'even' : '';
    },

    async detailClickHandler (rowId) {
      try {
        await hasRequestbook(rowId);
        this.displayRequestbook(rowId);
      } catch (error) {
        this.selectId = rowId;
        this.newOrder = true;
      }
    },

    async getOrderID () {
      const rowBkgId = this.selectId;
      if (this.copy_no === '') {
        this.displayRequestbook(rowBkgId);
      } else {
        try {
          const id = await getOrderId(this.copy_no);
          this.displayRequestbook(rowBkgId, id);
        } catch (error) {
        }
      }
    },

    displayRequestbook (bkgId, copyId) {
      this.rbShow = true;
      this.$refs.rb.loadData(bkgId, copyId, true);
    },

    async incomeDetail (id) {
      const list = await getIncomeList(id);
      this.income.list = list;
      this.income.visible = true;
    },

    async showExpendList (id) {
      const list = await getExpendList(id);
      this.expend.list = list;
      this.expend.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.bkg-list{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;

    * {
        flex: 0 0 auto;
    }

    main{
        flex: 1 1 auto;
        height: 1px;
        overflow: auto !important;
    }
}
header{
    line-height: 2rem;

    .el-input{
        width: 10%;
    }
}
.header-row{
    background: gray;
}
.input-box> *:nth-child(n+2){
    margin-left: 1em;
}

footer{
    margin-top: 1em;
    text-align: right;
}
.state{
    width: 100% ;

    /deep/ .el-tag {
        font-size: 20px;
        color: #000;
    }
}

/deep/ .even{
    background: #f2f2f4 !important;
}
</style>
