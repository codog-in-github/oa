<template>
  <div class="container">
    <div class="login-card">
        <el-form :model='form' ref="form">
          <el-form-item>
            <el-input placeholder="Enter your name" v-model='form.name'/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Enter your password" type="password" v-model='form.password'/>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      form:{
        name:'1',
        password:'12',
      },
    }
  },
  methods:{
    change(e){
      console.log('1',e)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>