<template>
  <div class="page">
    <header>
      <el-input
        v-model="query.booker"
        placeholder="名前"
      />
      <el-input
        v-model="query.tel"
        placeholder="電話番号"
      />
      <el-input
        v-model="query.place"
        placeholder="アドレス"
      />
      <el-input
        v-model="query.staff"
        placeholder="職員"
      />
      <el-input
        v-model="query.staff_tel"
        placeholder="職員の電話"
      />
      <el-input
        v-model="query.short_name"
        placeholder="略称"
      />
      <el-button
        type="primary"
        @click="reLoad"
      >
        検索
      </el-button>
      <el-button @click="clear">
        クリア
      </el-button>
      <el-button @click="showAddform">
        新規作成
      </el-button>
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
      >
        <el-table-column
          prop="booker"
          label="名前"
        />
        <el-table-column
          prop="tel"
          label="電話番号"
          width="100"
        />
        <el-table-column
          prop="place"
          label="アドレス"
        />
        <el-table-column
          prop="staff"
          label="職員"
          width="100"
        />
        <el-table-column
          prop="staff_tel"
          label="職員の電話"
          width="120"
        />
        <el-table-column
          prop="short_name"
          label="略称"
          width="100"
        />
        <el-table-column label="操作">
          <el-button-group slot-scope="{row}">
            <el-button
              icon="el-icon-edit"
              @click="showEdit(row)"
            >
              修改
            </el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="del(row)"
            >
              删除
            </el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        background
        :page-sizes="[10, 50]"
        :page-size="pageSize"
        layout="sizes,total, prev, pager, next"
        :total="total"
        @size-change="sizeChangeHandler"
        @current-change="pageChangeHandler"
      />
    </footer>
    <el-dialog
      :visible="dialog.visible"
      @close="closeForm"
    >
      <el-form
        ref="form"
        label-width="140px"
        :model="dialog.form"
        :rules="dialog.rules"
      >
        <el-form-item
          label="名前"
          prop="booker"
        >
          <el-input v-model="dialog.form.booker" />
        </el-form-item>
        <el-form-item label="電話番号">
          <el-input v-model="dialog.form.tel" />
        </el-form-item>
        <el-form-item label="アドレス">
          <el-input v-model="dialog.form.place" />
        </el-form-item>
        <el-form-item label="職員">
          <el-input v-model="dialog.form.staff" />
        </el-form-item>
        <el-form-item label="職員の電話">
          <el-input v-model="dialog.form.staff_tel" />
        </el-form-item>
        <el-form-item label="略称">
          <el-input v-model="dialog.form.short_name" />
        </el-form-item>
      </el-form>
      <el-button-group slot="footer">
        <el-button
          type="primary"
          @click="submit"
        >
          OK
        </el-button>
        <el-button @click="closeForm">
          戻る
        </el-button>
      </el-button-group>
    </el-dialog>
  </div>
</template>

<script>
import { addBooker, bookerList, deleteBooker, editBooker } from '@/api/main';

const createEmptyForm = () => {
  return {
    booker: '',
    tel: '',
    place: '',
    staff: '',
    staff_tel: '',
    short_name: ''
  };
};

export default {
  data () {
    return {
      query: {
        booker: '',
        tel: '',
        place: '',
        staff: '',
        staff_tel: '',
        short_name: ''
      },
      dialog: {
        visible: false,
        form: createEmptyForm(),
        rules: {
          booker: {
            required: true, message: '名前を入力してください', tigger: 'blur'
          }
        }
      },
      pageSize: 10,
      total: 0,
      current: 1,
      list: []
    };
  },
  mounted () {
    this.reLoad();
  },
  methods: {
    async reLoad () {
      try {
        const { list, total } = await bookerList({
          ...this.query,
          size: this.pageSize,
          current: this.current - 1
        });
        this.list = list;
        this.total = Number(total);
      } catch (error) {
      }
    },

    async submit () {
      try {
        await this.$refs.form.validate();
        if ('id' in this.dialog.form) {
          await editBooker({ ...this.dialog.form });
          this.$message.success('正常に変更されました');
        } else {
          await addBooker({ ...this.dialog.form });
          this.$message.success('正常に追加されました');
        }
        this.reLoad();
        this.closeForm();
      } catch (error) {
      }
    },

    async del ({ id }) {
      try {
        await this.$confirm('削除を確認しますか？');
        await deleteBooker(id);
        this.$message.success('正常に削除されました');
        this.reLoad();
      } catch (error) {
      }
    },

    sizeChangeHandler (size) {
      this.pageSize = size;
      this.current = 1;
      this.reLoad();
    },

    pageChangeHandler (current) {
      this.current = current;
      this.reLoad();
    },

    clear () {
      for (const field in this.query) {
        this.query[field] = '';
      }
      this.reLoad();
    },

    showAddform () {
      this.dialog.visible = true;
      this.dialog.form = createEmptyForm();
    },

    showEdit (row) {
      this.dialog.visible = true;
      this.dialog.form = { ...row };
    },

    closeForm () {
      this.dialog.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.page{
    padding: 1em;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &>*{
        flex: 0 0 auto;
    }

    header{
        .el-input{
            width: 120px;
        }
        *:nth-child(n+2){
            margin: 0.5em 1em;
        }
    }

    main{
        flex: 1 1 auto;
        height: 1px;
        overflow: auto !important;
    }

    footer{
        padding-top: 1em;
    }
}
</style>
