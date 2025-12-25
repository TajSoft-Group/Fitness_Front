<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between title-block align-items-center">
            <div class="page-title">
              <router-link to="/personal"><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png" /></router-link>
            </div>
            <div class="filter-icon d-flex justify-content-center align-items-center">
              <img height="29" width="37" src="@/assets/images/icons/filter.png" alt="user" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="m-0 p-0 position-relative">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                
                <button type="button" v-for="(value, index) in DataUsers.cover_imgs"
                  data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
                  :class="index === 0 ? 'active' : ''" :aria-current="index === 0 ? 'true' : null"
                  :aria-label="`Slide ${index + 1}`">
                </button>

              </div>
              <div class="carousel-inner slider-inner height-400 my-4">
                <div v-for="(value, index) in DataUsers.cover_imgs" :class="['carousel-item', { active: index === 0 }]">
<<<<<<< HEAD
                  <img :src="'https://api.mubingym.com/' + value" class="d-block w-100" alt="..." />
=======
                  <img :src="'https://api.mubingym.com//' + value" class="d-block w-100" alt="..." />
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                </div>

              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <div>
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </div>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <div>
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </div>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div class="title-trainer">
              <div class="teacher-img img-width-200 border-9px" :style="{ borderColor: DataUsers.color }">
<<<<<<< HEAD
                <img :src="'https://api.mubingym.com/' + DataUsers.avatar
=======
                <img :src="'https://api.mubingym.com//' + DataUsers.avatar
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
                  " alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <div class="statistics position-relative bg-gray h-auto py-4">
            <div class="trainer-info-title d-flex justify-content-between align-items-center">
              <div class="trainer-name color-yellow">
                {{ DataUsers.name + " " + DataUsers.surname }}
                <img class="mx-3" src="@/assets/images/icons/pencel.png" />
              </div>
              <img class="w-auto px-3 trainer-menu" src="@/assets/images/icons/menu-2.png" />
              <div class="trainer-status statistics bg-black h-auto position-absolute w-25">
                <div>На работе</div>
                <hr />
                <div>На карантине</div>
              </div>
            </div>
            <div class="trainer-info-body d-flex justify-content-between mt-3">
              <div class="trainer-info">
                Тренер по кардио нагрузкам<br />На работе
              </div>
              <div class="color-yellow align-content-end">
                {{ DataUsers.phone_number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container user-page-cards">
      <div class="row">
        <div class="col-3">
          <div class="user-page-card h3 p-4">
            <div class="title">Опыт работы</div>
            <div class="desc-number">
              {{ DataUsers.work_experience }} <span class="fs-4">года</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="user-page-card h3 p-4">
            <div class="title">Завершенные курсы</div>
            <div class="desc-number">
              {{ DataUsers.courses_completed }}
            </div>
          </div>
        </div>
        <!-- <div class="col-3">
          <div class="user-page-card h3 m-0 pb-3 p-4">
            <div class="title">Курсы индивидуальные</div>
            <div class="desc-number m-0">40</div>
          </div>
        </div>
        <div class="col-3">
          <div class="user-page-card h3 p-4">
            <div class="title">Курсы групповые</div>
            <div class="desc-number">25</div>
          </div>
        </div>
        <div class="col-3">
          <div class="user-page-card h3 p-4">
            <div class="title">Средняя оценка</div>
            <div class="desc-number">4.8</div>
          </div>
        </div> -->
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

<script>
import Cookies from "js-cookie";
import ButtonSorting from "@/UI/ButtonSorting.vue";
import gets from "@/components/axios/get.js";

export default {
  components: { ButtonSorting },
  data() {
    return {
      isLoading: true,
      loadingText: "Загрузка персонала...",
      error : false,
      DataUsers: "",
    };
  },
  methods: {
    getInfo() {
      const token = Cookies.get("token");
      gets(
<<<<<<< HEAD
        `https://api.mubingym.com/api/coach/${this.id}`,
=======
        `https://api.mubingym.com//api/coach/${this.id}`,
>>>>>>> 5edc2b79a871b8df02cdcacfb27fbde3b8d02c8b
        token
      )
        .then((response) => {
          this.isLoading = false;
          this.DataUsers = response.data.data;
          console.log(this.DataUsers);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
    },
  },
  mounted() {
    this.getInfo();
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-control-next,
.carousel-control-prev {
  background: none !important;
}

.carousel-control-next>div,
.carousel-control-prev>div {
  background-color: var(--green);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
  translate: -50% 0;
}

.carousel-control-prev>div {
  translate: 50% 0;
}

.carousel-control-next-icon,
.carousel-control-prev-icon {
  width: 20px;
  filter: brightness(0);
}
</style>
