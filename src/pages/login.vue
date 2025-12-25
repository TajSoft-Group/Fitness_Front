<template>
  <div v-if="!statusReg" class="container-fluid">
    <div class="row">
      <div class="col-6 p-0">
        <img class="full-screen-image" src="@/assets/images/login-bg.jpg" alt="Login Background">
      </div>
      <div class="col-6 p-0 d-flex justify-content-center align-items-center">
        <div class="login-form">
          <div class="sign-in">Войти</div>
          <div class="sign-in-bottom">Пожалуйста, введите логин и пароль</div>
          <div class="login">
            <input  v-model="username" type="text" placeholder="" id="phoneNumberInput" >
            <span class="line"></span>
          </div>
          <div class="password">
            <input v-model="password" type="password" placeholder="Пароль" id="password">
            <button type="button" id="togglePassword"><i class="fa fa-eye-slash"></i></button>
          </div>
          <div class="remember-me">
            <label class="custom-checkbox d-flex align-items-center">
              <input type="checkbox">
              <span class="checkmark"></span>
              <span class="remember-password">Запомить пароль</span>
            </label>
          </div>
          <div class="password-error">
            Неверный логин или пароль. Попробуйте еще раз
          </div>
          <div class="sign-in-btn">
            <button @click="submitData()">Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>вы авторизованы</h1>
    <h2><router-link to="/" class="color-yellow">главная страница</router-link></h2>
    <h3 @click="deleteCookie('token')" class="w-100 text-end px-4" style="cursor: pointer">Выйти</h3>
  </div>

</template>

<script>
import axios from "axios";
import router from "@/router/index.js";

export default {
  data() {
    return {
      statusReg:true,
      username:'',
      password:'',
    }
  },
  methods: {
    validateInput() {
      this.username = this.username.replace(/\D/g, '');
      if (this.username.length > 11) {
        this.username = this.username.slice(0, 10);
      }
    },
    submitData() {
      const dataToSend = {
        username: this.username,
        password: this.password
      };
      axios.post('https://api.mubingym.com/login_check', dataToSend)
          .then(response => {
            const t = response.data.token;
            this.setCookie('token', t, 31)
            console.log(t);
            // this.statusReg=this.getCookie('token')
            setTimeout(()=>{
              router.push("/");
            },0)
          })
          .catch(error => {
            console.error('Ошибка при отправке данных:', error);
          });
    },
    setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${value}${expires}; path=/`;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    getToken(){
      this.statusReg=this.getCookie('token')
    },
    deleteCookie(name) {
      this.setCookie(name, '', -1);
      this.statusReg=null
    },
  },
  mounted () {
    this.getToken()
  }
}
</script>

<style lang="scss" scoped>

</style>