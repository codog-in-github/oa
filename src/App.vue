<template>
  <div class="" @click="test">1</div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created(){
    
  },
  methods:{
    test(){
      this.$store.commit('doLogin',{});
    },
  }
};
</script>

<style>
</style>
