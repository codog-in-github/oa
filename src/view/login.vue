<template>
    <div class="container">
        <div class="animation-position">
            <img src="~@/assets/img/32.png" class="ship-img">
            <div class="animation-logo">
                <div>H</div><div>A</div><div>R</div><div>U</div><div>M</div><div>I</div><div>G</div><div>U</div><div>M</div><div>I</div>
            </div>
        </div>
        <div class="login-card">
            <div class="login-title">LOGIN</div>
            <el-form :model='form' ref="form" label-position="top" :rules="rules">
                <el-form-item label="USERNAME" prop="username">
                    <el-input placeholder="Enter your name" v-model='form.username'/>
                </el-form-item>
                <el-form-item label="PASSWORD" prop="password">
                    <el-input placeholder="Enter your password" type="password" v-model='form.password'/>
                </el-form-item>
                <el-form-item style="margin-top:30px;">
                <el-button type="primary" @click="login" style="width:100%" :loading="loading">login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { doLogin } from '@/api/main'
export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: { required: true, message: 'PLEASE ENTER USERNAME' },
                password: { required: true, message: 'PLEASE ENTER PASSWORD' }
            },
            loading: false
        }
    },
    methods: {
        async login () {
            try {
                this.loading = true
                await this.$refs.form.validate()
                const userInfo = await doLogin(this.form.username, this.form.password)
                this.$store.commit('doLogin', userInfo)
            } catch (e) {
                console.log(e)
                // this.$message.error(e)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #86C1F4 , #546CD8);
  overflow: hidden;
}
/deep/ .el-form-item__label::before{
    content: '' !important;
}
.ship-img{
  height: 50vh;
  position: relative;
  animation: 1.4s hidden,2s raceup 1.4s;
}
.login-card{
  width: 300px;
  background: #fff;
  border-radius: .5rem;
  padding: 40px;
}
.login-card > *{
  margin: 0 !important;
}.login-card > *:nth-child(2){
  margin-top: 20px !important;
}
.login-title{
  margin:  0 0 50px 0;
  line-height: 1em;
}
.login-title::before{
  content: '';
  display: inline-block;
  background: #6170B5;
  width: .4rem;
  height: 1em;
  border-radius: .2rem;
  margin-right: .5rem;
}
.animation-position{
  position: relative;
  font-size: 60px;
  display: block;
  margin-right: 80px;
}
.animation-logo{
  display: flex;
  color: #fff;
  margin-right: 40px;
  position: absolute;
  top: -80px;
  animation: 1s rollin;
}
.animation-logo>div:nth-child(1){
    animation: .9s hidden,.5s show .9s;
}
.animation-logo>div:nth-child(2){
    animation: .8s hidden,.5s show .8s;
}
.animation-logo>div:nth-child(3){
    animation: .7s hidden,.5s show .7s;
}
.animation-logo>div:nth-child(4){
    animation: .6s hidden,.5s show .6s;
}
.animation-logo>div:nth-child(5){
    animation: .5s hidden,.5s show .5s;
}
.animation-logo>div:nth-child(6){
    animation: .4s hidden,.5s show .4s;
}
.animation-logo>div:nth-child(7){
    animation: .3s hidden,.5s show .3s;
}
.animation-logo>div:nth-child(8){
    animation: .2s hidden,.5s show .2s;
}
.animation-logo>div:nth-child(9){
    animation: .1s hidden,.5s show .1s;
}
.animation-logo>div:nth-child(10){
    animation: .5s show;
}
@keyframes hidden{
  0%{opacity: 0;}
  100%{opacity: 0;}
}
@keyframes show{
  0%{opacity: 0;}
  100%{opacity: 1;}
}
@keyframes rollin {
  0%{ left: -4em;}
  100%{ left: 0;}
}
@keyframes raceup{
  0%{
    opacity: 0;
    top: 3em;
  }
  100%{
    opacity: 1;
    top: 0;
  }
}
@media screen and (max-width:930px) {
  .animation-position{
    display: none;
  }
}
</style>
