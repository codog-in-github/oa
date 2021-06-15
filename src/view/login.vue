<template>
  <div class="container">
    <div class="login-card">
        <el-form :model='form' ref="form">
          <el-form-item>
            <el-input placeholder="Enter your name" v-model='form.username'/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Enter your password" type="password" v-model='form.password'/>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">login</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { doLogin } from '@/api/main'

export default {
  data(){
    return {
      form:{
        username:'',
        password:'',
      },
    }
  },
  methods:{
    check(){
      if(this.form.username == ''){
        //no user name
        return 
      }
      if(this.form.password == ''){
        //no user password
        return 
      }
      doLogin(
        this.form.username, 
        this.form.password,
        this.$store,
        this.$router,
      );
    },
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>