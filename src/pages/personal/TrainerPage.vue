<template>
  <div v-for="user in DataUsers">
    <div class="container">
      <div class="row">
        <div class="col">
          <div
            class="d-flex justify-content-between title-block align-items-center"
          >
            <div class="page-title">
              <router-link to="/personal"
                ><img class="px-3 pb-2" src="@/assets/images/icons/Stroke.png"
              /></router-link>
            </div>
            <div
              class="filter-icon d-flex justify-content-center align-items-center"
            >
              <img
                height="29"
                width="37"
                src="@/assets/images/icons/filter.png"
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="m-0 p-0 position-relative">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner slider-inner height-400 my-4">
                <div class="carousel-item active">
                  <img
                    src="@/assets/images/Rectangle.png"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="@/assets/images/avatar.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="@/assets/images/woman.png"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="@/assets/images/login-bg.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div class="title-trainer">
              <div
                class="teacher-img img-width-200 border-9px"
                :style="{ borderColor: user.color }"
              >
                <img
                  :src="
                    'https://api.mubingym.com/' + user.avatar
                  "
                  alt=""
                />
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
            <div
              class="trainer-info-title d-flex justify-content-between align-items-center"
            >
              <div class="trainer-name color-yellow">
                {{ user.name + " " + user.surname }}
                <img class="mx-3" src="@/assets/images/icons/pencel.png" />
              </div>
              <img
                class="w-auto px-3 trainer-menu"
                src="@/assets/images/icons/menu-2.png"
              />
              <div
                class="trainer-status statistics bg-black h-auto position-absolute w-25"
              >
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
                  <div
                    class="d-flex percentage align-items-center justify-content-center"
                  >
                    <div>
                      <img
                        class="arrow-down"
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
                      <img
                        height="12"
                        src="@/assets/images/icons/arrow-up.png"
                      />
                    </div>
                    <div class="div">0%</div>
                  </div>
                  <div>от предыдущего периода</div>
                </div>
              </div>
              <div class="card-right d-flex align-items-end">
                <img
                  width="152"
                  height="115"
                  src="@/assets/images/icons/vector.png"
                  alt="vector"
                />
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
                    <div
                      class="d-flex percentage align-items-center justify-content-center"
                    >
                      <div>
                        <img
                          class="arrow-down"
                          height="12"
                          src="@/assets/images/icons/arrow-up.png"
                        />
                        <img
                          height="12"
                          src="@/assets/images/icons/arrow-up.png"
                        />
                      </div>
                      <div class="div">0%</div>
                    </div>
                    <div>от предыдущего периода</div>
                  </div>
                </div>
                <div class="card-right d-flex align-items-end">
                  <img
                    width="152"
                    height="115"
                    src="@/assets/images/icons/vector.png"
                    alt="vector"
                  />
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

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="statistics bg-gray">
            <div class="load-info d-flex flex-row-reverse">
              <div class="year time fs-3">
                2024<span class="fs-5 ms-2">г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="statistics bg-gray">
            <div class="load-info d-flex">
              <div class="year time fs-3">< Октябрь</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <div class="row">
        <div class="col d-flex fw-500 full-name">
          <div class="">Групповой <span class="color-yellow">(53)</span></div>
          <div class="ml-6 opacity-25">Индивидуальный (50)</div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="users-block">
            <table id="dataTable" class="personal-table">
              <thead>
                <tr>
                  <th style="vertical-align: middle">
                    <div class="d-flex justify-content-center">
                      ФИО <button-sorting style="margin-left: 10px" />
                    </div>
                  </th>
                  <th style="vertical-align: middle">
                    <div class="d-flex justify-content-center">
                      Телефон <button-sorting style="margin-left: 10px" />
                    </div>
                  </th>
                  <th style="vertical-align: middle">Цена</th>
                  <th style="vertical-align: middle">Скидка</th>
                  <th style="vertical-align: middle">Цена со %</th>
                  <th style="vertical-align: middle">Вид</th>
                  <th style="vertical-align: middle">Период</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between mt-4 px-5">
            <div class="d-flex align-items-center align-content-center">
              <div class="teacher-img img-width-70 border-5px border-color-red">
                <img src="@/assets/images/woman.png" alt="" />
              </div>
              <div class="card-statistics align-items-center m-0">
                <div class="card-title fs-4">Мунира Камолова</div>
                <div class="card-left fs-6 m-0">Силовые нагрузки</div>
              </div>
            </div>
            <div class="card-title fs-4 align-content-center">Урок 4</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="users-block">
            <table id="dataTable" class="personal-table">
              <tbody>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between mt-4 px-5">
            <div class="d-flex align-items-center align-content-center">
              <div class="teacher-img img-width-70 border-5px border-color-red">
                <img src="@/assets/images/woman.png" alt="" />
              </div>
              <div class="card-statistics align-items-center m-0">
                <div class="card-title fs-4">Мунира Камолова</div>
                <div class="card-left fs-6 m-0">Силовые нагрузки</div>
              </div>
            </div>
            <div class="card-title fs-4 align-content-center">Урок 4</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="users-block">
            <table id="dataTable" class="personal-table">
              <tbody>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between mt-4 px-5">
            <div class="d-flex align-items-center align-content-center">
              <div class="teacher-img img-width-70 border-5px border-color-red">
                <img src="@/assets/images/woman.png" alt="" />
              </div>
              <div class="card-statistics align-items-center m-0">
                <div class="card-title fs-4">Мунира Камолова</div>
                <div class="card-left fs-6 m-0">Силовые нагрузки</div>
              </div>
            </div>
            <div class="card-title fs-4 align-content-center">Урок 4</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="users-block">
            <table id="dataTable" class="personal-table">
              <tbody>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
                <tr class="align-items-center personal-tr">
                  <td>
                    <a href="#">Азиза Султанова</a>
                  </td>
                  <td>92 000 00 00</td>
                  <td>50 TJS</td>
                  <td>-5%</td>
                  <td>480 TJS</td>
                  <td>Кардио</td>
                  <td>
                    05.11.2023 <br />
                    06.11.2023
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="load-info d-flex flex-row-reverse">
            <div
              style="font-weight: 500; font-size: 16px; padding-right: 30px"
              class="year time"
            >
              Еще
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="statistics bg-gray h-auto">
            <div class="justify-content-between d-flex">
              <div class="text-width-600 h1">Отзывы</div>
              <div class="d-flex align-items-center">
                <div
                  class="rounded-circle row-user-margin bg-yellow text-center teacher-img align-content-center fs-5"
                >
                  +10
                </div>
                <div class="teacher-img row-user-margin">
                  <img src="@/assets/images/woman.png" alt="" />
                </div>
                <div class="teacher-img row-user-margin">
                  <img src="@/assets/images/avatar.jpg" alt="" />
                </div>
                <div class="teacher-img row-user-margin">
                  <img src="@/assets/images/woman.png" alt="" />
                </div>
              </div>
            </div>

            <div class="fw-500 h3 mt-5">Положительные</div>
            <div class="trainer-reviewer-positive d-flex">
              <div class="statistics me-4 my-3 p-3 h-auto bg-gray">
                <div class="d-flex align-items-center align-content-center">
                  <div class="teacher-img img-width-55">
                    <img src="@/assets/images/woman.png" alt="" />
                  </div>
                  <div class="align-items-center m-0 d-flex">
                    <div class="text-width-600 fs-5">Рахима</div>
                    <div class="ms-5 fs-6 bg-yellow br-20 px-3">4.6</div>
                    <div class="ms-2 fw-normal fs-6">28.10.2023</div>
                  </div>
                </div>
                <br />
                <div class="trainer-text fs-6 fw-normal">
                  Провели замечательный урок с тренером. Она оценила уровень
                  моей физической подготовки и скорректировала тренировку так,
                  чтобы она мне подошла. Лучшая в совем деле!
                </div>
              </div>
              <div class="statistics my-3 me-4 p-3 h-auto bg-gray">
                <div class="d-flex align-items-center align-content-center">
                  <div class="teacher-img img-width-55">
                    <img src="@/assets/images/woman.png" alt="" />
                  </div>
                  <div class="align-items-center m-0 d-flex">
                    <div class="text-width-600 fs-5">Рахима</div>
                    <div class="ms-5 fs-6 bg-green br-20 px-3">5.0</div>
                    <div class="ms-2 fw-normal fs-6">28.10.2023</div>
                  </div>
                </div>
                <br />
                <div class="trainer-text fs-6 fw-normal">
                  Провели замечательный урок с тренером. Она оценила уровень
                  моей физической подготовки и скорректировала тренировку так,
                  чтобы она мне подошла. Лучшая в совем деле!
                </div>
              </div>
              <div class="statistics my-4 p-3 h-auto bg-gray">
                <div class="d-flex align-items-center align-content-center">
                  <div class="teacher-img img-width-55">
                    <img src="@/assets/images/woman.png" alt="" />
                  </div>
                  <div class="align-items-center m-0 d-flex">
                    <div class="text-width-600 fs-5">Рахима</div>
                    <div class="ms-5 fs-6 bg-yellow br-20 px-3">4.6</div>
                    <div class="ms-2 fw-normal fs-6">28.10.2023</div>
                  </div>
                </div>
                <br />
                <div class="trainer-text fs-6 fw-normal">
                  Провели замечательный урок с тренером. Она оценила уровень
                  моей физической подготовки и скорректировала тренировку так,
                  чтобы она мне подошла. Лучшая в совем деле!
                </div>
              </div>
            </div>

            <div class="fw-500 h3 mt-5">Заблокированные</div>
            <div class="trainer-reviewer-positive col-4 d-flex">
              <div class="statistics me-4 my-3 p-3 h-auto bg-gray">
                <div class="d-flex align-items-center align-content-center">
                  <div class="teacher-img img-width-55">
                    <img src="@/assets/images/woman.png" alt="" />
                  </div>
                  <div class="align-items-center m-0 d-flex">
                    <div class="text-width-600 fs-5">Рахима</div>
                    <div class="ms-5 fs-6 bg-red br-20 px-3">2.2</div>
                    <div class="ms-2 fw-normal fs-6">28.10.2023</div>
                  </div>
                </div>
                <br />
                <div class="trainer-text fs-6 fw-normal">
                  Совсем не понравился тренер! Опоздала на урок, занятие прошло
                  непродуктивно, не понравился подобранный список занятий.
                </div>
              </div>
            </div>
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

<style lang="scss" scoped></style>
