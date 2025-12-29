<script>
import lottie from 'lottie-web'
import animationData from '@/assets/images/enter.json'
import posts from '@/components/axios/posts';

export default {
  methods: {
    playOnce() {
      if (!this.anim) return
      this.anim.goToAndPlay(0, true)
    },
    openDoor() {
      posts('https://api.mubingym.com/post/door')
        .then((response) => {
          console.log('Турникет открыт:', response.data);
        })
        .catch((error) => {
          console.error('Ошибка при открытии турникета:', error);
        });
    }
  },
  data() {
    return {
      anim: null,
      ActiveMenu: '/',
    }
  },
  watch: {
    '$route'(to) {
      this.ActiveMenu = to.fullPath;
    },
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lottie,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData
    })
  },
  beforeUnmount() {
    if (this.anim) {
      this.anim.destroy()
      this.anim = null
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <header class="header d-flex justify-content-between align-items-center">
          <div class="logo-img"><img src="@/assets/images/logo%20gum.png" alt="Logo"></div>

          <nav class="menu">
            <ul class="d-flex justify-content-between align-items-center">
              <li :class="{ active: ActiveMenu === '/' }"><router-link to="/">Главная</router-link></li>
              <li :class="{ active: ActiveMenu === '/clients' || ActiveMenu === '/user-page' }"><router-link
                  to="/clients">Клиенты</router-link></li>
              <li :class="{ active: ActiveMenu === '/personal' || ActiveMenu === '/trainer-page' }"><router-link
                  to="/personal">Персонал</router-link></li>
              <li :class="{ active: ActiveMenu === '/services' }"><router-link to="/services">Услуги</router-link></li>
              <li :class="{ active: ActiveMenu === '/courses' }"><router-link to="/courses">Курсы</router-link></li>

              <li :class="{ active: ['/finance', '/transactions', '/newsletters'].includes(ActiveMenu) }"
                class="trigger-hover">
                <a>Управление</a>
                <ul class="hidden-hover bg-gray p-0 position-absolute mt-0 pt-4 rounded-3">
                  <li :class="{ active: ActiveMenu === '/transactions' }"><router-link
                      to="/transactions">Транзакции</router-link></li>
                  <li :class="{ active: ActiveMenu === '/finance' }"><router-link to="/finance">Финансы</router-link>
                  </li>
                  <li :class="{ active: ActiveMenu === '/newsletters' }"><router-link
                      to="/newsletters">Рассылки</router-link></li>
                  <li :class="{ active: ActiveMenu === '/report' }"><router-link
                      to="/report">Отчет</router-link></li>
                </ul>
              </li>

              <li :class="{ active: ActiveMenu === '/lockers' }"><router-link to="/lockers">Шкафчики</router-link></li>
              <li :class="{ active: ActiveMenu.startsWith('/warehouse') }"><router-link
                  to="/warehouse">Склад</router-link></li>
              <li :class="{ active: ActiveMenu === '/cash' }"><router-link to="/cash">Касса</router-link></li>
            </ul>
          </nav>

          <router-link to="/login">
            <div class="user-icon">
              <img height="24" width="24" src="@/assets/images/icons/user-icon.png" alt="Пользователь">
            </div>
          </router-link>
        </header>
      </div>
    </div>
  </div>

  <!-- <button @click="playOnce(), openDoor()"
    class="turnstile-btn d-flex align-items-center gap-2 mt-3 bg-yellow rounded-3 px-3 py-2 position-fixed end-0 bottom-0 m-4">
    <div ref="lottie" class="lottie-icon"></div>
    Открыть турникет
  </button> -->


</template>

<style scoped>
.trigger-hover {
  position: relative;
}

.hidden-hover {
  display: none;
  margin-top: 23px;
  background: #2c2c2e;
  min-width: 200px;
  z-index: 1000;
}

.trigger-hover:hover .hidden-hover {
  display: block;
}

@media screen and (max-width: 1290px) {
  .menu ul {
    gap: 18px;
  }

  .menu ul li a {
    font-size: 14px;
  }
}

.lottie-icon {
  width: 40px;
  height: 40px;
}

.hidden-hover {
  padding: 10px 0 10px 0 !important;
}

.hidden-hover li a {
  padding: 15px 10px !important;
  margin: 10px;
}
</style>