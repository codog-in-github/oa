<template>
<div>
  <router-view></router-view>
  </div>
</template>

<script>
// import { checkLoginStatus } from '@/api/main'

export default {
  name: "App",

  components: {},
  created() {
    this.$checkLoginStatus();
  },
  methods: {

  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
