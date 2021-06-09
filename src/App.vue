<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",

  components: {},
  beforeUpdate() {
    if (this.$route.path !== '/login' && !this.$store.state.loginState.logined) {
      this.$router.push("/login"); 
    }
  },
  methods: {},
};
</script>

<style>
</style>
