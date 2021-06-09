<template>
<div>
  <router-view></router-view>
  </div>
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
*{
  margin: 0;
  padding: 0;
}
</style>
