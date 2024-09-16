<script>
import gets from "@/components/axios/get.js";
import Cookies from "js-cookie";
export default {
  data(){
    return{
      Warehouse: [],
    }
  },
  methods:{
    setup(){
      const token = Cookies.get("token");
      gets(
          "http://fitness.abdurazzoq.beget.tech/public/wh",
          token
      )
      .then((response) => {
        this.Warehouse = response.data.data;
        console.log(this.Warehouse)
      })
      .catch((error) => {
        this.error = error;
      });
    },
    truncatedTitle(title) {
      return title.length > 10 ? title.substring(0, 10) + '...' : title;
    }
  },
  mounted() {
    this.setup()
  },
}
</script>

<template>
    <div class="container">
      <div class="row relative">
        <div class="col">
          <div class="d-flex justify-content-between title-block align-items-center">
            <div class="page-title"><router-link to="/">Склад</router-link></div>
            <div
                class="user-add-btn d-flex justify-content-center align-items-center"
            >
              <button @click="addModal = true" class="add-user-btn py-2 px-3">
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4" v-for="item in Warehouse">
          <div class="bg-gray card-block h-auto position-relative">
            <div class="d-flex justify-content-between">
              <div class="col-4"><img src="@/assets/images/sal.png" class="warehouse-img"></div>
              <div class="col-9 px-3">
                <h3>{{ truncatedTitle(item.title) }}</h3>
                <div class="fs-7">
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Кол-во:</span>
                    <span class="color-yellow fw-bold">{{ item.count }} шт</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">В наличии:</span>
                    <span class="color-yellow fw-bold">{{ item.balance }} шт</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Закуп. цена:</span>
                    <span class="color-yellow fw-bold">{{ item.purchase }} TJS</span>
                  </div>
                  <div class="d-flex">
                    <span class="me-3 fw-bold">Прод. цена:</span>
                    <span class="color-yellow fw-bold">{{ item.sale }} TJS</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="menu-btn">
              <button class="bg-transparent border-0 position-absolute menu-icon"><img src="@/assets/images/icons/menu.png" alt=""></button>
              <div class="menu">
                <div class="menu-card">
                  <ul>
                    <li>Редактировать</li>
                    <li class="text-danger">Удалить</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">
.warehouse-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.menu-btn {
  position: relative; /* Ensure the .menu is positioned relative to the .menu-btn */

  .menu-icon {
    right: 10px;
    padding: 0 0 0 20px;
    bottom: 0;

    img {
      transform: scale(1.2); /* Updated for better support */
    }
  }

  .menu-card {
    display: none;
    position: absolute;
    right: 0;
    background: #000;
    border-radius: 14px;
    padding: 20px 30px;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        cursor: pointer;
        margin: 0;

        &:first-of-type {
          margin-bottom: 10px;
        }
      }
    }
  }
  &:hover .menu-card {
    display: block;
  }
}

.fs-7 {
  font-size: 14px;
}
</style>
