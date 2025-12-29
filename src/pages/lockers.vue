<template>

  <section class="mb-4">
    <div class="container">
      <div class="row relative">
        <div :class="[toaster ? 'show-false' : 'show-add']" class="added-user-message">
          <div class="result-true" :class="{ 'error-toast': !success }">
            <div class="result-true-card d-flex align-items-center">
              <img class="m-4 img-width-40" v-show="success" src="@/assets/images/icons/check_add.png">
              <img class="m-4 img-width-40" v-show="!success" src="@/assets/images/icons/dell.png">
              <div class="result-true-content ">
                <div class="result-true-title">{{ toastMessage }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-between title-block align-items-center">
          <div class="page-title">
            <router-link to="/">
              <img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png">Шкафчики</router-link>
          </div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <!-- <button @click="editStatus = false, editStatusPicked = false, toggleModal('.add-user-modal')" -->
            <button @click="pushCloset()" class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-user-modal')"
    class="add-user-modal d-flex justify-content-center align-items-center d-none">
    <div @click.stop class="content">
      <div v-if="editStatus ? messageRead = 'РЕДАКТИРОВАТЬ' : messageRead = 'ДОБАВИТЬ ШКАФЧИК'" class="title">{{
        messageRead }}</div>
      <div class="position-relative">
        <label for="name" class="color-yellow" style="margin: 10px 0px 10px 20px;">Выберите владельца</label>
        <input type="text" id="present" class="mb-3" v-model="activeTR" @click="presentMenu2 = !presentMenu2" />
        <img @click="presentMenu2 = !presentMenu2" :class="{ 'rotate-90': presentMenu2 }" class="row-right-icon mt-2"
          src="@/assets/images/icons/row-right.png" />
        <div :class="{ 'd-block': presentMenu2 }" class="menu-type-1 pt-4 pb-3 px-3">
          <h1 class="ps-2">Все пользователи</h1>
          <div class="scroll-new">
            <div role="button" v-for="wh in filteredUsers" @click="
              addLockers.user_id = wh.id;
            presentMenu2 = false;
            activeTR = wh.name + ' ' + wh.surname;
            " class="statistics h-auto m-0 p-2">
              <hr class="m-0 p-1" />
              {{ wh.name }} {{ wh.surname }}
            </div>
          </div>
        </div>
      </div>
      <div class="d-none">{{ editStatusPicked ? picked = addLockers.status : newPicked = picked }}</div>
      <div class="form position-relative">
        <label for="name">Статус шкафчика*</label>
        <input id="present" name="menu" :value="statuses[picked]" @click="presentMenu = !presentMenu"
          placeholder="Выберите статус шкафчика" type="text" readonly>
        <img @click="presentMenu = !presentMenu" :class="{ 'rotate-90': presentMenu }" class="row-right-icon"
          src="@/assets/images/icons/row-right.png">
        <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-3 px-3 pb-3 mt-3">
          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="free" name="menu" value="1" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="free">
              <p class="m-0 fw-bolder" style="color: #D0FD3E;">Свободно</p>
            </label>
          </div>

          <hr class="m-0">

          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="used" name="menu" value="2" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="used">
              <p class="fw-bolder m-0" style="color: #f00;">Занято</p>
            </label>
          </div>

          <hr class="m-0">
          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="ooo" name="menu" value="3" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="ooo">
              <p class="fw-bolder text-warning m-0">Не работает</p>
            </label>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-5">
          <button @click="toggleModal('.add-user-modal')" class="button-type-1">Отмена</button>
          <button v-if="!editStatus" @click="pushCloset(), toggleModal('.add-user-modal')"
            class="button-type-1 bg-yellow">Добавить</button>
          <button v-if="editStatus" @click="editCloset(), toggleModal('.add-user-modal')" class="button-type-1"
            :class="{ 'bg-yellow': picked, 'text-secondary': !picked }" :disabled="!picked">Сохранить</button>
        </div>
      </div>
    </div>
  </div>



  <div class="container">
    <div class="lockers-list mt-5 row">
      <div v-for="i in collection" :key="i.id" class="col-2">
        <div @click="toggleFilterBlock(i, collection)" :class="{
          'bg-yellow': i.statusTranslate === 'Свободно',
          'bg-red': i.statusTranslate === 'Занято',
          'bg-gray-2': i.statusTranslate === 'Не работает',
        }" class="locker-col position-relative mt-4">
          <div>{{ i.id }}</div>
          <div>
            <div class="menu-btn" ref="menuBtn" @click.stop="toggleMenu(i)">
              <button class="bg-transparent border-0 position-absolute menu-icon">
                <img src="@/assets/images/icons/menu.png" alt="">
              </button>

              <div class="menu">
                <div class="menu-card" :class="{ 'show': i.showMenu }">
                  <ul>
                    <li class="text-left text-white fs-6"
                      @click="toggleModal('.add-user-modal'); editStatus = true; edit = i.id; addLockers.id = i.id; addLockers.status = i.status; addLockers.user_id = i.user_id;">
                      Редактировать
                    </li>
                    <li class="text-left text-danger fs-6" @click="deleter = i.id; removeCloset()">
                      Удалить
                    </li>
                  </ul>
                </div>
              </div>
            </div>


          </div>
          <div class="fs-6 position-absolute top-0 right pe-3">{{ i.statusTranslate }}</div>
        </div>
      </div>
    </div>
  </div>


  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center mt-2">
      <div class="spinner-border text-warning" v-show="!error" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="error-div" v-show="error">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256"
          height="256" viewBox="0 0 256 256" xml:space="preserve">
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
              d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <path
              d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z"
              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          </g>
        </svg>
      </div>
      <div class="mt-2 text-light text-center" v-show="!error">{{ loadingText }}</div>
      <div class="mt-2 text-light text-center" v-show="error">Ошибка ! <p>{{ error }}</p>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import Cookies from "js-cookie";
import gets from "@/components/axios/get.js";
import { color } from 'chart.js/helpers';
import posts from '@/components/axios/posts';
import deletes from '@/components/axios/deletes';
import Patch from '@/components/axios/Patch';
</script>
<script>
export default {

  data() {
    return {
      activeTR: '',
      picked: '',
      isLoading: true,
      statuses: [null, "Свободно", "Занято", "Не работает"],
      collection: [
        // {
        //   id: null,
        //   status: 1,
        //   user_id: 1,
        //   user_name: 1,
        // }
      ],
      deleter: false,
      edit: false,
      users: [],
      filteredUsers: [],
      isActive: false,
      loadingText: "Загрузка...",
      error: false,
      success: false,
      addLockers: {
        id: '',
        status: '',
        user_id: '',
      },
      editStatus: false,
      presentMenu: false,
      presentMenu2: false,
      filterStatus: false,
      editStatusPicked: true,
      searchActive: '',
      addStatus: true,
      addCard: false,
      modal: 'auto',
      modalSelector: '',
      newPicked: '',
      message: '',
      messageBlock: '',
      toastMessage: "",
      toaster: false,
    }
  },
  methods: {
    toggleMenu(item) {
      // Открываем/закрываем текущее
      item.showMenu = !item.showMenu;

      // Закрываем остальные
      this.collection.forEach(el => {
        if (el.id !== item.id) el.showMenu = false;
      });
    },

    handleClickOutside(e) {
      // закрываем если клик вне меню
      const btn = this.$refs.menuBtn;
      if (!btn || btn.contains(e.target)) return;

      this.collection.forEach(el => el.showMenu = false);
    },
    async loadCollection() {
      this.id = this.$route.params.id

      const token = Cookies.get("token");

      gets(
        `https://missfitnessbackend.tajsoft.tj/api/closet/all`,
        token
      )
        .then((response) => {
          this.collection = response.data.closets;
          this.collection.forEach((val) => {
            val.statusTranslate = this.statuses[val.status];
          })
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error;
        });

    },
    async loadUsers() {
      const token = Cookies.get("token");

      posts(
        "https://missfitnessbackend.tajsoft.tj/users",
        { form: "0", to: "0" },
        token
      )
        .then((response) => {
          this.users = response.data.users;
          this.filteredUsers = this.users;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
        });

    },
    async pushCloset() {
      let formData = new FormData();
      this.error = false;
      this.loadingText = "Загрузка...";
      this.isLoading = true;

      posts('https://missfitnessbackend.tajsoft.tj/api/closet/create', formData)
        .then((response) => {

          if (response.status === 200) {
            this.toastMessage = "Шкафчик успешно добавлен"
            this.toaster = true
            this.success = true
            setTimeout(() => {
              this.toaster = false
            }, 3000);
            this.isLoading = false;
          }
          this.loadCollection();

        })
    },
    async removeCloset() {
      this.error = false;
      this.loadingText = "Загрузка...";
      this.isLoading = true;

      deletes(`https://missfitnessbackend.tajsoft.tj/api/closet/delete/${this.deleter}`)
        .then((response) => {
          this.isLoading = false;
          this.loadingText = "Удаление...";
          this.toastMessage = "Шкафчик успешно удален"
          this.toaster = true
          this.success = true
          setTimeout(() => {
            this.toaster = false
          }, 3000);
          this.loadCollection()
        })
    },
    async editCloset() {
      console.log(this.picked);
      let formData = {
        status: this.picked,
        user_id: this.addLockers.user_id,
      }
      this.error = false;
      this.loadingText = "Загрузка...";
      this.isLoading = true;

      posts(`https://missfitnessbackend.tajsoft.tj/api/closet/update/${this.edit}`, formData)
        .then((response) => {

          if (response.status === 200) {
            this.toastMessage = "Шкафчик успешно отредактирован"
            this.toaster = true
            this.success = true
            setTimeout(() => {
              this.toaster = false
            }, 3000);
            this.isLoading = false;

            this.picked='';
            this.addLockers.user_id = '';
          }
          this.loadCollection();

        })
    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector = modalSelector;
    },
    updateToggleModal() {
      if (this.modal === "auto") {
        document.querySelector(this.modalSelector).classList.add("d-none")
        document.body.style.overflow = this.modal
      } else {
        document.body.style.overflow = this.modal
        document.querySelector(this.modalSelector).classList.remove("d-none")
      }

    },
    toggleFilterBlock(locker, i) {
      locker.showFilterBlock = !locker.showFilterBlock;
      for (let item of i) {
        if (item.id !== locker.id) {
          item.showFilterBlock = false
        }
      }
    },
    addInfo(data, arr) {
      let index = this.lockersArr.findIndex(item => item.id === this.addLockers.id);
      if (index === -1) {
        data.status = this.newPicked
        arr.push({ ...data })
      }
    },
    dellLockers(id) {
      let index = this.lockersArr.findIndex(item => item.id === id);
      if (index !== -1) {
        this.lockersArr.splice(index, 1)
      }
    },
    editLockers(id) {
      let ed = this.lockersArr.find(item => item.id === id)
      this.addLockers = { ...ed }
      console.log(ed)
    },
    saveLockers(f, id) {
      if (f === 'openClose') {
        let ed = this.lockersArr.find(item => item.id === id)
        let index = this.lockersArr.findIndex(item => item.id === id);
        if (index !== -1) {
          ed.open = !ed.open
          this.lockersArr.splice(index, 1, { ...ed })
        }
      }
      else {
        let index = this.lockersArr.findIndex(item => item.id === this.addLockers.id);
        if (index !== -1) {
          this.addLockers.status = this.newPicked
          this.lockersArr.splice(index, 1, { ...this.addLockers })
        }
      }
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    },
    activeTR(newVal) {
      this.filteredUsers = this.users.filter(user =>
        `${user.name} ${user.surname}`.toLowerCase().includes(newVal.toLowerCase())
      );
    }
  },
  mounted() {
    this.loadCollection();
    this.loadUsers();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
}
</script>

<style lang="scss" scoped>
.menu-btn {
  position: relative;

  .menu-icon {
    position: absolute;
    right: 0;
    padding: 0 15px;
    bottom: 0;

    img {
      filter: contrast(550%);
      transform: scale(1.2);
    }
  }

  .menu {
    position: relative;

    .menu-card {
      display: none;
      position: absolute;
      right: 0;
      translate: 50% 5%;
      background: #000;
      border-radius: 14px;
      padding: 20px 30px;
      z-index: 2;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: left;

        li {
          cursor: pointer;

          &:first-of-type {
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .menu-card.show {
    display: block;
  }
}
</style>
