<template>
  <div class="link">
    <slot name="father">
      <title-group :title="fatherName">
        <el-select
          v-model="fatherValue"
          :size="size"
          @change="chageFatherHandler"
        >
          <el-option
            v-for="option in fatherOptions"
            :key="option.id || Symbel(0)"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </title-group>
    </slot>
    <slot name="center">
      <span>/</span>
    </slot>
    <slot name="child">
      <title-group :title="childName">
        <el-autocomplete
          v-if="childType === 'suggest'"
          v-model="childValue"
          :size="size"
          :fetch-suggestions="findsuggests"
          @change="chageChildHandler"
        />
        <el-select
          v-if="childType ==='select'"
          v-model="childValue"
          :size="size"
          :loading="childLoading"
          @change="chageChildHandler"
        >
          <el-option
            v-for="option in childOptions"
            :key="option.id || Symbel(0)"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </title-group>
    </slot>
  </div>
</template>
<script>
import TitleGroup from './TitleGroup.vue';
export default {
  components: {
    TitleGroup
  },
  props: {
    fatherName: {
      default: 'father'
    },
    childName: {
      default: 'child'
    },
    options: {
      default: () => []
    },
    size: {
      default: 'mini'
    },
    childType: {
      default: 'select'
    }
  },
  data () {
    return {
      childValue: '',
      fatherValue: ''
    };
  },
  computed: {

    fatherOptions () {
      return this.options.filter(i => i.pid === '');
    },
    childOptions () {
      if (this.fatherValue === '') return [];
      return this.options.filter(i => i.pid === this.fatherValue);
    },
    suggestOptions () {
      return this.childOptions.map(x => { return { value: x.label }; });
    }
  },
  methods: {
    chageChildHandler () {
      this.$emit('childChange', this.childValue);
    },
    chageFatherHandler () {
      this.childValue = '';
      this.chageChildHandler();
      this.$emit('fatherChange', this.fatherValue);
    },
    findsuggests (val, cb) {
      if (val === '') {
        cb(this.suggestOptions);
      } else {
        cb(this.suggestOptions.filter(x => x.value.indexOf(val) !== -1));
      }
    }
  }

};
</script>
<style scoped>
.link{
    display: flex;
    width: 100%;
    align-items: flex-end;
}
</style>
