<template>
  <component
    :is="componentsMap"
    :config="config"
    :value="value"
    :async-method="asyncMethod"
    :class="`${config.params_name}-${config.id}`"
    @change="changeHandler"
  />
</template>
<script>
// 根据配置自动选择表单录入组件并渲染数据
export default {
  props: ['config', 'value'],
  computed: {
    componentsMap () {
      switch (this.config.type) {
          case 'number': case 'text': {
            return () => import('./formitem/Text.vue');
          }
          case 'date': {
            return () => import('./formitem/Date.vue');
          }
          case 'linkDefault': {
            return () => import('./formitem/LinkDefault.vue');
          }
          case 'userSelect': case 'select': {
            return () => import('./formitem/Select.vue');
          }
          case 'countrySelect': case 'linkSelect': {
            return () => import('./formitem/LinkSelect.vue');
          }
          case 'timeRange': {
            return () => import('./formitem/TimeRange.vue');
          }
          default: {
            return () => import('./formitem/Text.vue');
          }
      }
    },
    asyncMethod () {
      if (this.config.type === 'countrySelect') {
        return 'getPort';
      } else {
        return false;
      }
    }
  },
  methods: {
    changeHandler (...payload) {
      this.$emit('change', ...payload);
    }
  }
};
</script>
