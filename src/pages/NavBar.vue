<script>
import {log10} from "chart.js/helpers";

export default {
  methods: {log10},
  el: 'body',
  data() {
    return {
      ActiveMenu: '/'
    }
  },
  watch: {
    '$route' (to) {
      this.ActiveMenu = to.fullPath;
      console.log(to.fullPath)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <header class="header d-flex justify-content-between align-items-center">
          <div class="logo-title">FITNESS</div>
          <div class="menu">
            <ul class="d-flex justify-content-between align-items-center ">
              <li :class="{active: ActiveMenu === '/'}"><router-link to="/" >Главная</router-link></li>
              <li :class="{active: ActiveMenu === '/clients'|| ActiveMenu==='/user-page'}"><router-link to="/clients">Клиенты</router-link></li>
              <li><a href="#">Персонал</a></li>
              <li :class="{active: ActiveMenu === '/services'}"><router-link to="/services">Услуги</router-link></li>
              <li :class="{active: ActiveMenu === '/services'}">
                <router-link to="/services" class="trigger-hover">Курсы</router-link>
                <ul class="hidden-hover bg-gray p-0 position-absolute">
                  <li :class="{active: ActiveMenu === '/individual-courses'}"><router-link to="/individual-courses" class="m-3">Курсы индивидуальные</router-link></li>
                  <li :class="{active: ActiveMenu === '/reviews-page'}"><router-link to="/reviews-page" class="m-3">Курсы индивидуальные Отзывы</router-link></li>
                </ul>
              </li>
              <li :class="{active: ActiveMenu === '/newsletters'}"><router-link to="/newsletters">Рассылки</router-link></li>
              <li><a href="#">Управление</a></li>
              <li><a href="#">Финансы</a></li>
              <li><a href="#">Шкафчики</a></li>
              <li><a href="#">Продукты</a></li>
            </ul>
          </div>
          <div class="user-icon">
            <img height="24" width="24" src="@/assets/images/icons/user-icon.png" alt="user">
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
