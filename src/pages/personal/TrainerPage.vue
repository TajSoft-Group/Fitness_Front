<template>
  <div v-for="user in DataUsers">
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
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                  aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                  aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner slider-inner height-400 my-4">
                
                <div v-for="value in DataUsers.cover_imgs" class="carousel-item active">
                  <img src="@/assets/images/Rectangle.png" class="d-block w-100" alt="..." />
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
              <div class="teacher-img img-width-200 border-9px" :style="{ borderColor: user.color }">
                <img :src="'https://api.mubingym.com/' + user.avatar
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
                {{ user.name + " " + user.surname }}
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
                {{ user.phone_number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="bg-gray card-block">
            <div class="d-flex justify-content-between">
              <div class="card-left">
                <div class="card-title">Количество курсов</div>
                <div class="card-quantity">{{ user.courses_completed }}</div>
                <div class="card-statistics d-flex align-items-center">
                  <div class="d-flex percentage align-items-center justify-content-center">
                    <div>
                      <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png" />
                      <img height="12" src="@/assets/images/icons/arrow-up.png" />
                    </div>
                    <div class="div">0%</div>
                  </div>
                  <div>от предыдущего периода</div>
                </div>
              </div>
              <div class="card-right d-flex align-items-end">
                <img width="152" height="115" src="@/assets/images/icons/vector.png" alt="vector" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="">
            <div class="bg-gray card-block">
              <div class="d-flex justify-content-between">
                <div class="card-left">
                  <div class="card-title">Выручка</div>
                  <div class="card-quantity">4800 TJS</div>
                  <div class="card-statistics d-flex align-items-center">
                    <div class="d-flex percentage align-items-center justify-content-center">
                      <div>
                        <img class="arrow-down" height="12" src="@/assets/images/icons/arrow-up.png" />
                        <img height="12" src="@/assets/images/icons/arrow-up.png" />
                      </div>
                      <div class="div">0%</div>
                    </div>
                    <div>от предыдущего периода</div>
                  </div>
                </div>
                <div class="card-right d-flex align-items-end">
                  <img width="152" height="115" src="@/assets/images/icons/vector.png" alt="vector" />
                </div>
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
              {{ user.work_experience }} <span class="fs-4">года</span>
            </div>
          </div>
        </div>
        <div class="col-3">
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
        </div>
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
      DataUsers: "",
    };
  },
  methods: {
    getInfo() {
      const token = Cookies.get("token");
      gets(
        `https://api.mubingym.com/api/coach/${this.id}`,
        token
      )
        .then((response) => {
          this.DataUsers = response.data;
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
.carousel-control-next, .carousel-control-prev {
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
.carousel-control-prev>div{
  translate: 50% 0;
}

.carousel-control-next-icon,
.carousel-control-prev-icon {
  width: 20px;
  filter: brightness(0);
}
</style>
