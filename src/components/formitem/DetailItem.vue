<template>
  <div class="detail">
    <div class="flag">
      {{ no + 1 }}
    </div>
    <div class="inputs">
      <title-group title="Container type">
        <el-select v-model="detailData.container_type">
          <el-option v-for="opt in options.containerType.item"
                     :key="opt.id"
                     :label="opt.label" />
        </el-select>
      </title-group>
      <title-group title="COMMON">
        <el-input v-model="detailData.common" />
      </title-group>
      <title-group title="CNTR. NO">
        <el-input v-model="detailData.cntr_no" />
      </title-group>
      <title-group title="OPTION">
        <el-input v-model="detailData.option" />
      </title-group>
      <title-group title="台費なし/あり">
        <el-input v-model="detailData.expenses" />
      </title-group>
      <title-group title="運送業">
        <el-input v-model="detailData.transprotation" />
      </title-group>
      <title-group title="略称">
        <el-input v-model="detailData.short_name" />
      </title-group>
      <title-group title="担当者">
        <el-input v-model="detailData.charge" />
      </title-group>
      <title-group title="現場担当者">
        <el-input v-model="detailData.field" />
      </title-group>
      <title-group title="現場担当連絡先">
        <el-input v-model="detailData.field_tel" />
      </title-group>
      <title-group title="シャーシ">
        <el-input v-model="detailData.chassis" />
      </title-group>
      <title-group title="バンニング場所">
        <el-input v-model="detailData.booker_place" />
      </title-group>
      <title-group title="バンニング日">
        <el-date-picker v-model="detailData.vanning_date"
                        value-format="yyyy-MM-dd" />
      </title-group>
      <title-group title="空PICK日">
        <el-date-picker v-model="detailData.free_pick_day"
                        value-format="yyyy-MM-dd" />
      </title-group>
      <title-group title="開時/終時">
        <el-time-picker v-model="formatTime"
                        is-range
                        value-format="HH:mm"
                        format="HH:mm" />
      </title-group>
    </div>
    <div class="buttons">
      <el-button type="primary"
                 @click="$emit('add')"
      >ADD</el-button>
      <el-button type="primary"
                 @click="$emit('copy',detailData)"
      >COPY</el-button>
      <el-button v-if="no > 0"
                 type="danger"
                 @click="deleteSelf"
      >DEL</el-button>
    </div>
  </div>
</template>
<script>
import TitleGroup from '../TitleGroup.vue';

export default {
  components: {
    TitleGroup
  },
  props: {
    detailData: {
      default: () => ({
        container_type: '',
        common: '',
        option: '',
        expenses: '',
        transprotation: '',
        charge: '',
        field: '',
        field_tel: '',
        chassis: '',
        booker_place: '',
        vanning_date: '',
        vanning_during: '',
        cntr_no: '',
        delete_at: ''
      })
    },
    options: {
      default: () => ({})
    },
    no: {
      default: 1
    }
  },
  computed: {
    formatTime: {
      get () {
        const during = this.detailData.vanning_during;
        return during ? during.split('-') : '';
      },
      set (val) {
        if (val) {
          this.detailData.vanning_during = val.join('-');
        } else {
          this.detailData.vanning_during = '';
        }
      }
    }
  },
  created () {
    this.$emit('load-options', 3, this.options.containerType);
  },
  methods: {
    deleteSelf () {
      this.detailData.delete_at = '1';
    }
  }
};
</script>
<style lang="less" scoped>
.detail{
    display: flex;
    justify-content: space-around;
    border: solid #000 1px;
    width: 100%;

    &:nth-child(n + 2){
        margin-top: .5em;
    }
}

.flag{
    flex: 0 0 2em;
}

.inputs{
    flex: 1 1 auto;
    display: flex;
    flex-flow: wrap;

    /deep/ .el-input,
    /deep/ .el-date-editor{
        width: 180px;
    }

    & > div{
        margin: .2em .5em;
        flex: 0 0 auto;
    }
}

.buttons{
    flex: 0 0 auto;
    display: flex;
    flex-flow: column;
    flex: 0 0  4em;
    align-items:inherit;
    justify-content: space-around;
    & > *{
        margin-left: 0;
    }
}
</style>
