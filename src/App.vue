<template>
<div class="root">
  <router-view></router-view>
  </div>
</template>

<script>
// import { checkLoginStatus } from '@/api/main'

export default {
  name: "App",

  components: {},
  beforeCreate() {
    this.$clearStrage();
    this.$checkLoginStatus();
  },
  methods: {

  },
};
</script>
