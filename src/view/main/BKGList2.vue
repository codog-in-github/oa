<template>
  <div class="bkg-list">
    <header>
      <div class="input-box">
        <el-input
          v-model="condition.bkg_no"
          placeholder="BKG NO"
        />
        <el-input
          v-model="condition.bl_no"
          placeholder="B/L NO"
        />
        <el-input
          v-model="condition.pol"
          placeholder="POL"
        />
        <el-input
          v-model="condition.pod"
          placeholder="POD"
        />
        <el-input
          v-model="condition.booker"
          placeholder="BOOKER"
        />
        <el-input
          v-model="condition.dg"
          placeholder="社内管理番号"
        />
        <el-button
          type="primary"
          @click="reLoad"
        >
          SEARCH
        </el-button>
        <el-button @click="clearCondition">
          CLEAR
        </el-button>
      </div>
      <el-button
        v-if="showNewOrder"
        class="add"
        type="primary"
        @click="addNewOrder"
      >
        <span class="el-icon-plus" />新規作成
      </el-button>
    </header>
    <main>
      <el-table
        v-loading="loading"
        border
        :data="list"
        height="100%"
        @sort-change="sortChange"
        :header-cell-style="{
          background:'#409eff',
          color:'#fff',
          fontSize:'16px'
        }"
      >
        <el-table-column
          prop="company_no"
          label="管理番号"
          width="100px"
          align="center"
          fixed
        />
        <el-table-column
          prop="show_cy_cut"
          label="CUT"
          sortable="custom"
          :formatter="dateFormat"
          width="100px"
          align="center"
        />
        <el-table-column
          prop="bkg_date"
          label="BKG"
          sortable="custom"
          :formatter="dateFormat"
          width="100px"
          align="center"
        />
        <el-table-column
          prop="booker"
          label="BOOKER"
          width="180px"
        />
        <el-table-column
          prop="ld"
          label="POL/POD"
          width="180px"
        />
        <el-table-column
          prop="bkg_no"
          label="BKG NO"
          width="150px"
        />
        <el-table-column
          prop="quantity"
          label="QTY"
          width="50px"
        />
        <el-table-column
          prop="container_type"
          label="CT TYPE"
          width="100px"
        />
        <el-table-column
          label="状態"
          width="350px"
        >
          <template slot-scope="scope">
            <el-select
              v-if="!showRestore"
              v-model="scope.row.state"
              multiple
              class="state"
              @change="changeState(scope.row.id, scope.row.state)"
              @focus="getOptionsAnsyc(10, options.state)"
            >
              <el-option
                v-for="{id, value, label} in options.state.item"
                :key="id"
                :value="value"
                :label="label"
              />
            </el-select>
            <div v-else>
              {{ scope.row.state.join('|') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="OPERATION"
          width="280px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-if="showEdit"
                type="primary"
                icon="el-icon-edit"
                @click="doEdit(scope.row.id)"
              >
                EDIT
              </el-button>
              <el-button
                v-if="showDetail"
                type="primary"
                icon="el-icon-view"
                @click="displayDetail(scope.row.id)"
              >
                DETAIL
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        background
        :page-sizes="[10, 50, 100]"
        :page-size="page_size"
        layout="sizes, total, prev, pager, next"
        :total="total"
        @size-change="sizeChangeHandler"
        @current-change="pageChangeHandler"
      />
    </footer>
    <el-dialog
      :visible="newOrderForm.visible"
      title="NEW ORDER"
      width="30em"
      @close="newOrderForm.visible = false"
      @open="dialogOpen"
    >
      <el-form
        ref="newOrderForm"
        label-width="10em"
        :model="newOrderForm.data"
        :rules="newOrderForm.rules"
      >
        <el-form-item label="種類">
          <el-select
            v-model="newOrderForm.data.type"
            style="width:100%"
          >
            <el-option
              :value="0"
              label="NEW ORDER"
            />
            <el-option
              :value="1"
              label="BKG NO"
            />
            <el-option
              :value="2"
              label="社内管理番号"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="newOrderForm.data.type"
          label="シリアルナンバー"
          prop="no"
        >
          <el-input v-model="newOrderForm.data.no" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          type="primary"
          @click="getOrderID"
        >
          {{
            newOrderForm.data.type === 0? '新規作成' : 'コピー'
          }}
        </el-button>
        <el-button @click="newOrderForm.visible = false">
          CANCLE
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getOptionsAnsyc } from '@/mixin/main';
import { changeOrderState, changeOrderStep, deleteOrder, getBkgList2, getOrderId } from '@/api/main';
import { OREDER_STAUS } from '@/constant';

export default {
  mixins: [
    getOptionsAnsyc
  ],
  data () {
    return {
      condition: {
        bkg_no: '',
        bl_no: '',
        pod: '',
        pol: '',
        booker: '',
        dg: ''
      },
      page_size: 50,
      page: 1,
      total: 0,
      list: [],
      options: {
        state: { item: [], loading: false }
      },
      loading: false,
      stateChangeTimer: -1,
      newOrder: false,
      newOrderForm: {
        visible: false,
        rules: {
          no: { required: true, message: '番号を入力してください' }
        },
        data: {
          type: 0,
          no: ''
        }
      }
    };
  },
  computed: {
    showNewOrder () {
      return this.$route.params.state !== 'delete';
    },
    showNext () {
      const { state } = this.$route.params;
      return state === 'normal' || state === 'draft' || state === 'ready';
    },
    showPrevious () {
      const { state } = this.$route.params;
      return state === 'draft' || state === 'ready' || state === 'complete';
    },
    showDetail () {
      return this.$route.params.state === 'delete';
    },
    showEdit () {
      return this.$route.params.state !== 'delete';
    },
    showDelete () {
      return this.$route.params.state === 'normal';
    },
    showRestore () {
      return this.$route.params.state === 'delete';
    }
  },
  mounted () {
    this.reLoad();
  },
  methods: {
    async reLoad () {
      this.loading = true;
      try {
        const bkgList = await getBkgList2({
          condition: this.condition,
          page_size: this.page_size,
          page: (this.page || 1) - 1,
          status: this.$route.params.status || '',
          sort: this.sort
        });

        this.list = bkgList.list.map(i => {
          if (!i.state) {
            i.state = [];
          } else {
            i.state = i.state.split('|');
          }
          return i;
        });

        this.total = parseInt(bkgList.total);
        this.page = bkgList.page;
      } catch (error) {
      }
      this.loading = false;
    },
    sortChange ({ prop, order }) {
      this.sort = {
        prop, order
      };
      this.reLoad();
    },
    dateFormat (_, __, cellValue) {
      return cellValue.substr(0, 10);
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
    async deleteHandler (id, index, isDelete = true) {
      try {
        await deleteOrder(id, isDelete);
        this.list.splice(index, 1);
      } catch (error) {
      }
    },
    clearCondition () {
      for (const k in this.condition) {
        this.condition[k] = '';
      }
      this.reLoad();
    },
    async changeStep (id, index, isNext = true) {
      try {
        await changeOrderStep(
          id,
          OREDER_STAUS[OREDER_STAUS.indexOf(this.$route.params.state) + (isNext ? 1 : -1)]
        );
        this.list.splice(index, 1);
      } catch (error) {
      }
    },
    changeState (id, val) {
      clearTimeout(this.stateChangeTimer);
      this.stateChangeTimer = setTimeout(async () => {
        try {
          changeOrderState(id, val.join('|'));
          this.$message.success('CHANGE SUCCESS');
        } catch (error) {
        }
      }, 1000);
    },
    addNewOrder () {
      this.newOrderForm.visible = true;
    },
    async getOrderID () {
      if (this.newOrderForm.data.type === 0) {
        this.$router.push('/form');
      } else {
        try {
          const { newOrderForm } = this.$refs;
          await newOrderForm.validate();
          const id = await getOrderId(this.newOrderForm.data);
          this.$router.push(`/form/${id}/copy`);
        } catch (error) {
        }
      }
    },
    dialogOpen () {
      this.newOrderForm.data.type = 0;
      this.newOrderForm.data.no = '';
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
/deep/ .el-table .el-table__row:nth-child(even){
    background: #f2f2f4 !important;
}
.add{
    margin: 1em 0;
}
</style>
