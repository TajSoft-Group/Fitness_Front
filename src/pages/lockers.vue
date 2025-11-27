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
          <div class="page-title"><router-link to="/"><img class="px-3 pb-2"
                src="@/assets/images/icons/Stroke.png">Шкафчики</router-link></div>
          <div class="user-add-btn d-flex justify-content-center align-items-center">
            <button @click="editStatus = false, editStatusPicked = false, toggleModal('.add-user-modal')"
              class="add-user-btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.add-user-modal')"
    class="add-user-modal d-flex justify-content-center align-items-center d-none">
    <div @click.stop class="content">
      <div v-if="editStatus ? messageRead = 'РЕДАКТИРОВАТЬ' : messageRead = 'ДОБАВИТЬ ШКАФЧИК'" class="title">{{
        messageRead }}
      </div>
      <div class="form">
        <label for="name">Номер шкафчика*</label>
        <input v-model="addLockers.id" maxlength="3" type="number" placeholder="Введите номер шкафчика" id="name">
      </div>
      <div class="d-none">{{ editStatusPicked ? picked = addLockers.status : newPicked = picked }}</div>
      <div class="form position-relative">
        <label for="name">Статус шкафчика*</label>
        <input id="present" name="menu" v-model="picked" placeholder="Выберите статус шкафчика" type="text" readonly>
        <img @click="presentMenu = !presentMenu" :class="{ 'rotate-90': presentMenu }" class="row-right-icon"
          src="@/assets/images/icons/row-right.png">
        <div :class="{ 'd-block': presentMenu }" class="menu-type-1 pt-4 px-4 ">
          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" name="menu" value="Занято" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-red me-3"></div>
              <div class="h5 text-white m-0">Занято</div>
            </label>
          </div>
          <hr>
          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" name="menu" value="Свободно" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-yellow me-3"></div>
              <div class="h5 text-white m-0">Свободно</div>
            </label>
          </div>
          <hr>
          <div @click="editStatusPicked = false"
            class="menu-type-2 d-flex justify-content-between align-items-center flex-row-reverse">
            <input type="radio" id="yoga" name="menu" value="Не работает" v-model="picked" />
            <label class="text-white d-flex align-items-center" for="yoga">
              <div class="locker-status bg-gray-2 me-3"></div>
              <div class="h5 text-white m-0">Не работает</div>
            </label>
          </div>
          <hr>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button @click="toggleModal('.add-user-modal')" class="button-type-1">Отмена</button>
          <button v-if="!editStatus" @click="addInfo(addLockers, lockersArr), toggleModal('.add-user-modal')"
            class="button-type-1 bg-yellow">Добавить</button>
          <button v-if="editStatus" @click="saveLockers(), toggleModal('.add-user-modal')"
            class="button-type-1 bg-yellow">Сохранить</button>
        </div>
      </div>
    </div>
  </div>


  <div class="container relative">
    <div class="row">
      <div class="col justify-content-between align-items-center mt-4">
        <div :class="{ 'search-input': searchActive.length > 0 }"
          class="d-flex justify-content-between align-items-center search-block m-0">
          <img src="@/assets/images/icons/search.png" alt="search">
          <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по всем параметрам">
          <a @click="filterStatus = !filterStatus" class="position-relative">
            <div class="filter-icon d-flex justify-content-center align-items-center position-relative">
              <img class="position-static " src="/src/assets/images/icons/filter.png" alt="user">
            </div>

            <div v-if="filterStatus" class="position-absolute filter-block p-4 bg-black h-auto right">
              <div class="d-flex align-items-center">
                <div class="locker-status bg-red me-3"></div>
                <div class="h5 text-white m-0">Занято</div>
              </div>
              <hr>
              <div class="d-flex align-items-center">
                <div class="locker-status bg-yellow me-3"></div>
                <div class="h5 text-white m-0">Свободно</div>
              </div>
              <hr>
              <div class="d-flex align-items-center">
                <div class="locker-status bg-gray-2 me-3"></div>
                <div class="h5 text-white m-0">Не работает</div>
              </div>
              <hr>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="col">
      <div v-show="searchActive.length > 0" class="users-block search-result-block p-4">
        <div v-for="i in filteredLockers" :key="i.id" class="locker-col position-relative mt-4">
          <div @click="toggleFilterBlock(i)" :class="{
            'bg-yellow': i.status === 'Свободно',
            'bg-red': i.status === 'Занято',
            'bg-gray-2': i.status === 'Не работает',
          }" class="locker-col position-relative mt-4">
            <div>{{ i.id }}</div>
            <div>
              <img class="position-absolute top-0 pt-4 right pe-3" src="@/assets/images/icons/menu-3.png">
              <div v-if="i.showFilterBlock" class="position-absolute filter-block p-4 top-0 mt-4 bg-black h-auto">
                <div
                  @click="editLockers(i.id), searchActive = '', toggleModal('.add-user-modal'), editStatus = true, editStatusPicked = true"
                  class="d-flex align-items-center justify-content-between">
                  <div class="h5 text-white m-0">Редактировать</div>
                  <img class="img-width-20" src="@/assets/images/icons/pencel.png">
                </div>
                <hr>
                <div class="d-flex align-items-center justify-content-between">
                  <div v-show="i.open ? message = 'Открыть шкафчик' : message = 'Закрыть шкафчик'"
                    class="h5 text-white m-0">{{ message }}</div>
                  <img :class="{ 'rotate-180': !i.open }" class="img-width-20"
                    src="@/assets/images/icons/take-money.png">
                </div>
                <hr>
                <div v-if="i.status !== 'Занято'" class="d-flex align-items-center justify-content-between">
                  <div v-show="i.open ? messageBlock = 'Заблокировать' : messageBlock = 'Разблокировать'"
                    class="h5 text-white m-0">{{ messageBlock }}</div>
                  <img class="img-width-20" src="@/assets/images/icons/blocked.png">
                </div>
                <hr>
                <div @click="dellLockers(i.id)" v-if="i.status !== 'Занято'"
                  class="d-flex align-items-center justify-content-between">
                  <div class="h5 text-white blocked m-0">Удалить</div>
                  <img class="img-width-20" src="@/assets/images/icons/delete.png">
                </div>
              </div>
            </div>
            <div class="fs-6 position-absolute bottom-0 right pe-3">{{ i.status }}</div>
          </div>
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
            <img class="position-absolute top-0 pt-4 right pe-3" src="@/assets/images/icons/menu-3.png">
            <div v-if="i.showFilterBlock" class="position-absolute filter-block p-4 top-0 mt-4 bg-black h-auto">
              <div
                @click="editLockers(i.id), toggleModal('.add-user-modal'), editStatus = true, editStatusPicked = true"
                class="d-flex align-items-center justify-content-between">
                <div class="h5 text-white m-0">Редактировать</div>
                <img class="img-width-20" src="@/assets/images/icons/pencel.png">
              </div>
              <hr>
              <div class="d-flex align-items-center justify-content-between">
                <div @click="saveLockers('openClose', i.id)"
                  v-show="i.open ? message = 'Открыть шкафчик' : message = 'Закрыть шкафчик'" class="h5 text-white m-0">
                  {{
                    message }}</div>
                <img :class="{ 'rotate-180': !i.open }" class="img-width-20" src="@/assets/images/icons/take-money.png">
              </div>
              <hr>
              <div v-if="i.statusTranslate !== 'Занято'" class="d-flex align-items-center justify-content-between">
                <div v-show="i.open ? messageBlock = 'Заблокировать' : messageBlock = 'Разблокировать'"
                  class="h5 text-white m-0">{{ messageBlock }}</div>
                <img class="img-width-20" src="@/assets/images/icons/blocked.png">
              </div>
              <hr>
              <div @click="dellLockers(i.id)" v-if="i.statusTranslate !== 'Занято'"
                class="d-flex align-items-center justify-content-between">
                <div class="h5 text-white blocked m-0">Удалить</div>
                <img class="img-width-20" src="@/assets/images/icons/delete.png">
              </div>
            </div>
          </div>
          <div class="fs-6 position-absolute bottom-0 right pe-3">{{ i.statusTranslate }}</div>
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
const picked = ref(``)
</script>
<script>
export default {

  data() {
    return {
      isLoading: true,
      statuses : [ null, "Свободно", "Занято", "Не работает" ],
      collection: [
        // {
        //   id: null,
        //   status: 1,
        //   user_id: 1,
        //   user_name: 1,
        // }
      ],
      loadingText: "Загрузка...",
      error: false,
      success: false,
      addLockers: { id: '', status: 'Не работает', open: true, blocked: 0 },
      editStatus: false,
      presentMenu: false,
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

    async loadCollection() {
      this.id = this.$route.params.id

      const token = Cookies.get("token");

      gets(
        `https://api.mubingym.com/api/closet/all`,
        token
      )
        .then((response) => {
          this.collection = response.data.closets;
          this.collection.forEach((val)=>{
            val.statusTranslate = this.statuses[val.status]; 
          })
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error;
        });

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
  },
  mounted() {
    this.loadCollection()
  },
}
</script>

<style lang="scss" scoped></style>
