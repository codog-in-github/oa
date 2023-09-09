<template>
  <div class="badge">
    <slot>
      <div>{{ title }}</div>
    </slot>
    <div
      class="badge-state"
      :class="'badge-state-'+type"
    >
      {{ value }}
    </div>
  </div>
</template>
<script>
export default {
  props: ['value', 'title', 'type' ]
};
</script>
<style scoped>
.badge{
    position: relative;
}
.badge-state{
    position: absolute;
    border-radius: 3em;
    padding: 0 8px;
    font-size: 3px;
    color: #fff;
    bottom: -3px;
    right: -50%;
}

.badge-state-undefined,
.badge-state-danger{
    background: #F56C6C;
}
.badge-state-info{
    background: #909399;
}
.badge-state-success{
    background: #67C23A;
}
.badge-state-primary{
    background: #409EFF;
}
.badge-state-warning{
    background: #E6A23C;
}
</style>
