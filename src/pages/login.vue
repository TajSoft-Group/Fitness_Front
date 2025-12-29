<template>
  <div v-if="!statusReg" class="container-fluid">
    <div class="row">
      <div class="col-6 p-0">
        <img class="full-screen-image" src="@/assets/images/login-bg.jpg" alt="Login Background">
      </div>

      <div class="col-6 p-0 d-flex justify-content-center align-items-center">
        <div class="login-form">
          <form @submit.prevent="submitData">
            <div class="sign-in">Войти</div>
            <div class="sign-in-bottom">
              Пожалуйста, введите логин и пароль
            </div>




            <div class="login">
              <input v-model="username" type="text" :class="{ 'input-error': error }" id="phoneNumberInput"
                @input="error = false">
              <span class="line"></span>
            </div>

            <div class="password">
              <input v-model="password" type="password" :class="{ 'input-error': error }" placeholder="Пароль"
                id="password" @input="error = false">
              <button type="button" id="togglePassword">
                <i class="fa fa-eye-slash"></i>
              </button>
            </div>

            <div class="remember-me">
              <label class="custom-checkbox d-flex align-items-center">
                <input type="checkbox">
                <span class="checkmark"></span>
                <span class="remember-password">Запомнить пароль</span>
              </label>
            </div>

            <div class="text-center">
              <b class="badge bg-danger mt-4 mb-2">{{ error ? 'Неверный логин или пароль' : "" }}</b>
            </div>

            <!-- BUTTON -->
            <div class="sign-in-btn">
              <button type="submit" :disabled="loading">
                {{ loading ? 'Вход...' : 'Войти' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- AUTHORIZED -->
  <div v-else>
    <h1>вы авторизованы</h1>
    <h2>
      <router-link to="/" class="color-yellow">
        главная страница
      </router-link>
    </h2>
    <h3 @click="logout" class="w-100 text-end px-4" style="cursor: pointer">
      Выйти
    </h3>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index.js";

export default {
  data() {
    return {
      statusReg: true,
      username: '',
      password: '',
      loading: false,
      error: false
    };
  },

  methods: {
    submitData() {
      if (this.loading) return;

      this.loading = true;
      this.error = false;

      const dataToSend = {
        username: this.username,
        password: this.password
      };

      axios
        .post('https://api.mubingym.com/login_check', dataToSend)
        .then(response => {
          const token = response.data.token;
          this.setCookie('token', token, 31);
          router.push("/");
        })
        .catch(err => {
          this.error = true;
          console.log(this.error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${value}${expires}; path=/`;
    },

    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    },

    getToken() {
      this.statusReg = !this.getCookie('token');
    },

    logout() {
      this.setCookie('token', '', -1);
      this.statusReg = false;
    }
  },

  mounted() {
    this.getToken();
  }
};
</script>

<style lang="scss" scoped>
/* дизайн не меняли */
</style>
