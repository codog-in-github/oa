<template>
  <div :v-loading="true">
    111
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created(){
    // console.log();
    if(!this.$store.state.loginState.isLogin)
      this.open();
  },
  methods:{
    open() {
        this.$alert('checkyourmessage', 'OASystem', {
      confirmButtonText: '确定',
      callback: action => {
        this.$message({
          type: '',
          message: `action: ${ action }`
        });
      }
    });
    }
  }
};
</script>

<style>
</style>
