<template>
  <div class="container">
    <div class="animation-position">
      <img
        src="~@/assets/img/32.png"
        class="ship-img"
      >
      <div class="animation-logo">
        <div>H</div><div>A</div><div>R</div><div>U</div><div>M</div><div>I</div><div>G</div><div>U</div><div>M</div><div>I</div>
      </div>
    </div>
    <div class="login-card">
      <div class="login-title">
        LOGIN
      </div>
      <el-form ref="form"
               :model="form"
               label-position="top"
               :rules="rules">
        <el-form-item label="USERNAME" prop="username">
          <el-input v-model="form.username" placeholder="Enter your name" />
        </el-form-item>
        <el-form-item label="PASSWORD" prop="password">
          <el-input v-model="form.password" placeholder="Enter your password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="isRememberMe">
            REMABER ME
          </el-checkbox>
          <el-checkbox v-model="isAutoLogin">
            AUTO LOGIN
          </el-checkbox>
        </el-form-item>
        <el-form-item style="margin-top:30px;">
          <el-button
            type="primary"
            style="width:100%"
            :loading="loading"
            @click="login"
          >
            login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/main';
import { AUTO_LOGIN_ENABLE, AUTO_LOGIN_KEY, PASSWORD_KEY, REMABER_ME_ENABLE, REMABER_ME_KEY, USERNAME_KEY } from '@/constant';
import { passwordDecoding, passwordEncoding } from '@/utils';

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
      loading: false,
      isRememberMe: false,
      isAutoLogin: false
    };
  },
  created () {
    this.isAutoLogin = localStorage.getItem(AUTO_LOGIN_KEY) === AUTO_LOGIN_ENABLE;
    this.isRememberMe = localStorage.getItem(REMABER_ME_KEY) === REMABER_ME_ENABLE;

    if (this.isAutoLogin) {
      this.autoLogin();
    } else if (this.isRememberMe) {
      this.form.username = localStorage.getItem(USERNAME_KEY);
    }
  },
  methods: {
    async login () {
      try {
        this.loading = true;
        await this.$refs.form.validate();
        const userInfo = await login(this.form.username, this.form.password);
        this.$store.dispatch('login', userInfo, this.isRememberMe);
        if (this.isRememberMe) {
          localStorage.setItem(REMABER_ME_KEY, REMABER_ME_ENABLE);
          localStorage.setItem(USERNAME_KEY, this.form.username);
        } else {
          localStorage.removeItem(REMABER_ME_KEY);
          localStorage.removeItem(USERNAME_KEY);
        }
        if (this.autoLogin) {
          localStorage.setItem(AUTO_LOGIN_KEY, AUTO_LOGIN_ENABLE);
          localStorage.setItem(PASSWORD_KEY, passwordEncoding(this.form.password));
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    async autoLogin () {
      try {
        const username = localStorage.getItem(USERNAME_KEY);
        const password = passwordDecoding(localStorage.getItem(PASSWORD_KEY));
        const userInfo = await login(username, password);
        this.$store.dispatch('login', userInfo);
      } catch (error) {
        this.$message.error('自動ログインに失敗しました');
      }
    }
  }
};
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
    &> *{
        margin: 0 !important;
    }

    &> *:nth-child(2){
        margin-top: 20px !important;
    }
}
.login-title{
    margin:  0 0 50px 0;
    line-height: 1em;

    &::before{
        content: '';
        display: inline-block;
        background: #6170B5;
        width: .4rem;
        height: 1em;
        border-radius: .2rem;
        margin-right: .5rem;
    }
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

@time: 1s;
.anim(@n) when (@n < 11){
    .animation-logo>div:nth-child(@{n}){
        animation: @time - (@n / 10) hidden,
            .5s show @time - (@n / 10);
    }
    .anim((@n + 1));
}
.anim(1);

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
