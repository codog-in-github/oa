<template>
  <div class="bkg-list">
    <header>
      <div class="input-box">
        <el-date-picker
          v-model="condition.vanning_date"
          range-separator="to"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          type="daterange"
          placeholder="バンニング日"
          style="width:auto"
        />
        <el-input
          v-model="condition.booker_place"
          placeholder="バンニング場所"
        />
        <el-input
          v-model="condition.transprotation"
          placeholder="運送業"
        />
        <el-date-picker
          v-model="condition.cy_cut"
          range-separator="to"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          type="daterange"
          style="width:auto"
          placeholder="CUT DATE"
        />
        <el-input
          v-model="condition.booker"
          placeholder="BOOKER"
        />
        <el-input
          v-model="condition.bkg_no"
          placeholder="BKG NO"
        />
        <el-button
          type="primary"
          class="el-icon-refresh-right"
          @click="clearCondition"
        >
          CLEAR
        </el-button>
        <el-button
          type="primary"
          class="el-icon-search"
          @click="reLoad"
        >
          SEARCH
        </el-button>
      </div>
    </header>
    <main>
      <el-table
        border
        row-key="id"

        :data="list"
        :header-cell-style="{
          background:'#409eff',
          color:'#fff',
          fontSize:'16px'
        }"
        height="100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="vanning_date"
          label="バンニング日"
          sortable
          :formatter="dateFormat"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="booker_place"
          label="バンニング場所"
        />
        <el-table-column
          prop="transprotation"
          label="運送業"
        />
        <el-table-column
          prop="cy_cut"
          label="CUT DATE"
          sortable
          :formatter="dateFormat"
          width="130px"
          align="center"
        />
        <el-table-column
          prop="booker"
          label="BOOKER"
        />
        <el-table-column
          prop="ld"
          label="POL/POD"
        />
        <el-table-column
          prop="bkg_no"
          label="BKG NO"
        />
        <el-table-column
          prop="free_pick_day"
          label="空PICK日"
        />
        <el-table-column
          prop="pick_order_request"
          label="ピックオーダー依頼"
        />
        <el-table-column
          prop="send_pick_order"
          label="ピックオーダー送付"
        />
        <el-table-column
          prop="id"
          label="OPERATION"
          width="120px"
        >
          <template slot-scope="scope">
            <div style="text-align:center;">
              <el-button
                v-if="showDetail"
                type="primary"
                class="el-icon-view"
                @click="displayDetail(scope.row.bkg_id)"
              >
                DETAIL
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        background
        :page-sizes="[10, 50, 100]"
        :page-size="page_size"
        layout="sizes,total, prev, pager, next"
        :total="total"
        @size-change="sizeChangeHandler"
        @current-change="pageChangeHandler"
      />
    </footer>
  </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main';
import { timeCompare } from '@/utils';
import { confirmDetail, getContainerList } from '@/api/main';
export default {
  mixins: [
    getOptionsAnsyc
  ],
  data () {
    return {
      condition: {
        vanning_date: [],
        booker_place: '',
        transprotation: '',
        cy_cut: [],
        booker: '',
        bkg_no: ''

      },
      page_size: 50,
      page: 1,
      total: 0,
      list: [],
      options: {
        state: { item: [], loading: false }
      },
      stateChangeTimer: -1
    };
  },
  computed: {
    showDetail () {
      return this.$route.params.state !== 'normal';
    }
  },
  mounted () {
    this.reLoad();
  },
  methods: {
    async reLoad () {
      try {
        const containerList = await getContainerList({
          condition: this.condition,
          page_size: this.page_size,
          page: (this.page || 1) - 1,
          state: this.$route.params.state || ''
        });

        this.list = containerList.list;
        this.total = parseInt(containerList.total);
        this.page = containerList.page;
      } catch (error) {
        console.log('error :', error);
      }
    },
    dateFormat (row, column, cellValue) {
      return cellValue.substr(0, 10);
    },
    tableRowClassName ({ row }) {
      return timeCompare(row.vanning_date)
        ? 'old'
        : row.is_confirm === 1 ? 'confirm' : 'normal';
    },
    async confirm (row) {
      try {
        await confirmDetail(row.id);
        row.is_confirm = 1;
        this.$message.success('CONFIRM SUCCESS');
      } catch (error) {
      }
    },
    showConfirm (vd) {
      return !timeCompare(vd);
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
</style>
