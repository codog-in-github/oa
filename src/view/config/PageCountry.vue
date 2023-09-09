<template>
  <div class="page">
    <header>
      <el-input
        v-model="query"
        placeholder="検索"
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
      <el-table border
                lazy
                row-key="id"
                :load="loadPort"
                :data="list"
                :header-cell-style="{
                  background:'#409eff',
                  color:'#fff',
                  fontSize:'16px'
                }"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="label" label="名前"/>
        <el-table-column
          prop="code"
          label="略称"
          width="100"
        />
        <el-table-column label="操作">
          <el-button-group slot-scope="{row}">
            <el-button
              icon="el-icon-edit"
              @click="showEdit(row)"
            >改訂</el-button>
            <el-button v-if="row.pid == 0"
                       icon="el-icon-plus"
                       type="success"
                       @click="addPort(row)"
            >新着</el-button>
            <el-button icon="el-icon-delete" type="danger" @click="del(row)">消去</el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </main>
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
          prop="label"
        >
          <el-input v-model="dialog.form.label" />
        </el-form-item>
        <el-form-item
          label="略称"
          prop="code"
        >
          <el-input v-model="dialog.form.code" />
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
import { addCountry, deleteCountry, editCountry, getCountryList } from '@/api/main';

const createEmptyForm = () => {
  return {
    label: '',
    code: ''
  };
};

export default {
  data () {
    return {
      query: '',
      dialog: {
        visible: false,
        form: createEmptyForm(),
        rules: {
          label: { required: true, message: '名前は大文字の英語で入力する必要があります', tigger: 'blur', pattern: /^[A-Z ]+$/ },
          code: { required: true, message: '略語は大文字で入力する必要があります', tigger: 'blur', pattern: /^[A-Z]+$/ }
        }
      },
      list: []
    };
  },
  mounted () {
    this.reLoad();
  },

  methods: {
    async reLoad () {
      try {
        const list = await getCountryList(0, this.query);
        for (const country of list) {
          country.children = [];
          country.hasChildren = country.pid == 0;
        }
        this.list = list;
      } catch (error) {
      }
    },

    async loadPort (country, _, resolve) {
      try {
        resolve(await getCountryList(country.id));
      } catch (error) {
      }
    },

    async submit () {
      try {
        await this.$refs.form.validate();
        if ('id' in this.dialog.form) {
          await editCountry(this.dialog.form.id, { ...this.dialog.form });
          this.$message.success('正常に変更されました');
        } else {
          await addCountry({ ...this.dialog.form });
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
        await deleteCountry(id);
        this.$message.success('正常に削除されました');
        this.reLoad();
      } catch (error) {
      }
    },

    showAddform () {
      this.dialog.visible = true;
      this.dialog.form = createEmptyForm();
    },

    showEdit (row) {
      this.dialog.visible = true;
      this.dialog.form = { ...row };
    },

    addPort (row) {
      this.dialog.visible = true;
      this.dialog.form = {
        ...createEmptyForm(),
        pid: row.id
      };
    },

    closeForm () {
      this.dialog.visible = false;
    },

    clear () {
      for (const field in this.query) {
        this.query[field] = '';
      }
      this.reLoad();
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
