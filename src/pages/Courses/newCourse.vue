<template>
   <section class="mb-4">
        <div class="container">
        <div class="row relative">
            <div :class="[addStatus ? 'show-false' : 'show-add']"  class="added-user-message">
            <div class="result-true">
                <div class="result-true-card d-flex align-items-center">
                <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png">
                <div class="result-true-content ">
                    <div class="result-true-title">Пользователь <span class="color-yellow">{{formData.name+' '+formData.surname}}</span> добавлен</div>
                    <div class="result-true-body mt-2">Новый пользователь успешно добавлен в список клиентов</div>
                </div>
                </div>
            </div>
            </div>
    
            <div class="col mt-2">
                <div class="d-flex justify-content-between title-block align-items-center">
                    <div @click="addStatus=!addStatus" class="page-title">Новый курс</div>
                </div>
            </div>
        </div>
        </div>
   </section>
  
   <section class="mb-5 pb-5">
        <div class="container">
            <form class="form" @submit.prevent="submitForm(),toggleModal('.add-curs')">
                <div @click.stop  class="col content cardBlack">
                    <div class="menu-type-2 w-50 m-auto d-flex justify-content-between">
                        <div class="form-recipients">
                            <input autocomplete="off" class="form-check-input" type="checkbox" id="ind" name="type" value="1" v-model="formData.individual">
                            <label for="ind" class="text-white">Индивидуальные</label>
                        </div>
                        <div class="form-recipients">
                            <input autocomplete="off" class="form-check-input" type="checkbox" id="type" name="type" checked value="2" v-model="formData.group">
                            <label for="type" class="text-white">Групповые</label>
                        </div>
                    </div>
                    <div class="mx-5">
                        
                        <label for="title" class="m-0 mb-3" v-if="formData.individual && !formData.group">Индивидуальный</label>
                        <label for="title" class="m-0 mb-3" v-if="formData.group && !formData.individual">Группа</label>
                        <label for="title" class="m-0 mb-3" v-if="(formData.individual && formData.group) || (!formData.individual && !formData.group)">Название</label>

                        <input autocomplete="off" type="text" placeholder="Введите название курса" id="title" class="inp" v-model="formData.title">
                    </div>
                    <!-- <div class="form position-relative">
                    <label for="phone">Описание*</label>
                    <textarea type="text" v-model="formData.description" placeholder="Введите текст" class="description pt-2"></textarea>
                    </div> -->
                    <div class="form position-relative mt-3 mb-5 mx-5">
                        <!-- <label for="phone">Добавить фотографию</label> -->
                        <div class="img-card row p-3 flex-wrap">
                            <div v-for="(image, index) in images" :key="index" class="card-add-img m-2">
                                <img :src="image" class="card-img-top" alt="Product Image">
                            </div>
                            <div class="card-button align-content-center text-center m-2" @click="selectImage">
                            <div class="border py-3 m-2">
                                    <button type="button" class="add-button border-0">+</button>
                                    <br>
                                    <span>Добавить фотографию</span>
                                    <br>
                                    <span>Минимальный размер 393x315 px</span>
                                    <br>
                                    <span>Максимальное кол-во фотографий: 5</span>
                            </div>
                            </div>
                        </div>
                        <input autocomplete="off" type="file" ref="fileInput" @change="handleFileChange" style="display: none">
                    </div>
                    <div class="col mt-5 mx-5 px-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4>Преимущества курса</h4>
                            <button class="buttons-primary border-0" type="button" @click="AppendBenefits()">+</button>
                        </div>
                    </div>
                    <div class="img-card benefitsBg px-4 py-5 mt-4 mx-5" v-for="(item, index) in formData.benefits_course" :key="index">
                        <div class="d-flex mt-2 mb-4">
                            <input autocomplete="off" type="text" placeholder="Заголовок" id="price" v-model="formData.price">
                            <!-- <div class="cardBg img-card p-3 ms-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <path d="M21 0C32.5981 0 42 9.40286 42 21.0021C42 32.5992 32.5981 42 21 42C9.40192 42.0021 0 32.5992 0 21.0021C0 9.40286 9.40192 0 21 0ZM21 3.14968C18.6397 3.12408 16.2977 3.56691 14.1096 4.45254C11.9216 5.33818 9.93087 6.64902 8.25274 8.30922C6.57461 9.96941 5.24238 11.946 4.33316 14.1245C3.42394 16.3031 2.95578 18.6403 2.95578 21.001C2.95578 23.3618 3.42394 25.699 4.33316 27.8776C5.24238 30.0561 6.57461 32.0327 8.25274 33.6929C9.93087 35.3531 11.9216 36.6639 14.1096 37.5496C16.2977 38.4352 18.6397 38.878 21 38.8524C25.7005 38.8014 30.1911 36.8982 33.497 33.556C36.8028 30.2137 38.657 25.7023 38.657 21.001C38.657 16.2998 36.8028 11.7884 33.497 8.44612C30.1911 5.10388 25.7005 3.20067 21 3.14968ZM13.5717 26.8458C14.4554 27.9708 15.5834 28.88 16.8704 29.5047C18.1573 30.1293 19.5695 30.453 21 30.4512C22.4289 30.4529 23.8396 30.1298 25.1254 29.5063C26.4112 28.8828 27.5384 27.9752 28.422 26.8521C28.5502 26.6898 28.7091 26.5544 28.8897 26.4535C29.0702 26.3527 29.2689 26.2884 29.4743 26.2643C29.6797 26.2402 29.8878 26.2568 30.0868 26.3132C30.2857 26.3696 30.4717 26.4646 30.6339 26.5928C30.7962 26.721 30.9316 26.8799 31.0324 27.0605C31.1333 27.2411 31.1976 27.4397 31.2217 27.6451C31.2457 27.8506 31.2291 28.0587 31.1728 28.2577C31.1164 28.4567 31.0214 28.6426 30.8932 28.8049C29.7149 30.3013 28.2122 31.5105 26.4984 32.3413C24.7846 33.1721 22.9045 33.6028 21 33.6008C19.0927 33.6027 17.21 33.1708 15.4942 32.3377C13.7784 31.5047 12.2745 30.2923 11.0963 28.7923C10.9683 28.6298 10.8737 28.4436 10.8177 28.2445C10.7617 28.0453 10.7455 27.8371 10.7699 27.6317C10.7944 27.4263 10.8591 27.2277 10.9603 27.0473C11.0615 26.8668 11.1972 26.7081 11.3598 26.5802C11.5223 26.4522 11.7085 26.3576 11.9076 26.3016C12.1067 26.2456 12.3149 26.2293 12.5203 26.2538C12.7257 26.2783 12.9243 26.343 13.1047 26.4442C13.2851 26.5454 13.4437 26.6812 13.5717 26.8437M14.7013 14.1778C15.052 14.1679 15.4012 14.2284 15.7282 14.3558C16.0551 14.4832 16.3532 14.6748 16.6048 14.9194C16.8564 15.164 17.0564 15.4566 17.193 15.7799C17.3296 16.1032 17.4 16.4505 17.4 16.8015C17.4 17.1524 17.3296 17.4998 17.193 17.823C17.0564 18.1463 16.8564 18.4389 16.6048 18.6835C16.3532 18.9281 16.0551 19.1198 15.7282 19.2472C15.4012 19.3746 15.052 19.4351 14.7013 19.4252C14.0183 19.4058 13.3699 19.1209 12.8936 18.631C12.4174 18.1411 12.151 17.4847 12.151 16.8015C12.151 16.1182 12.4174 15.4619 12.8936 14.9719C13.3699 14.482 14.0183 14.1971 14.7013 14.1778ZM27.2987 14.1778C27.6495 14.1679 27.9987 14.2284 28.3256 14.3558C28.6526 14.4832 28.9507 14.6748 29.2023 14.9194C29.4539 15.164 29.6539 15.4566 29.7905 15.7799C29.9271 16.1032 29.9974 16.4505 29.9974 16.8015C29.9974 17.1524 29.9271 17.4998 29.7905 17.823C29.6539 18.1463 29.4539 18.4389 29.2023 18.6835C28.9507 18.9281 28.6526 19.1198 28.3256 19.2472C27.9987 19.3746 27.6495 19.4351 27.2987 19.4252C26.6158 19.4058 25.9673 19.1209 25.4911 18.631C25.0149 18.1411 24.7485 17.4847 24.7485 16.8015C24.7485 16.1182 25.0149 15.4619 25.4911 14.9719C25.9673 14.482 26.6158 14.1971 27.2987 14.1778Z" fill="white" fill-opacity="0.35"/>
                                </svg>
                            </div> -->
                        </div>
                        <textarea type="text" v-model="formData.description" placeholder="Описание" class="description pt-2"></textarea>
                        
                        <label for="discount_price" class="text-end d-none">Итого: <span v-if="formData.price!==''">{{formData.discount_price=formData.price-Math.round((formData.price/100) * formData.discount)}}</span></label><!--        <div class="form position-relative">-->
                        <button type="button" class="removeBenefits" @click="RemoveBenefits(index)">&times;</button>        
                    </div>
                    <div class="d-flex justify-content-between align-items-start my-4 mt-5 listInput mx-5 px-2">
                        <input autocomplete="off" type="text" class="" placeholder="Цена" id="price" v-model="formData.price">
                        <input autocomplete="off" type="text" class="" placeholder="Скидка" id="discount" v-model="formData.discount">
                        <input autocomplete="off" type="text" class="" placeholder="Итого" id="total" v-model="formData.discount_price">
                        <div class="mincountDiv">
                            <input autocomplete="off" type="text" class="" placeholder="Мин. кол-во" id="total" v-model="formData.discount_price" v-show="!formData.individual || formData.group">
                            <span>*Минимальное количество людей в группе</span>
                        </div>
                    </div>
                    
                    <!-- <div class="position-relative">
                        <label  for="name">Выбор тренера</label>
                        <input autocomplete="off" type="text" id="present" v-model="activeTR">
                        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
                        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4">
                            <h1>Все тренеры</h1>
                            <div role="button"  v-for="treners in DataUsers" @click="idTr=treners.id,presentMenu=false,activeTR=treners.name+' '+treners.surname" class="statistics h-auto m-0 p-2"><hr class="m-0 p-1">
                                {{treners.name+' '+ treners.surname}}
                            </div>
                        </div>
                    </div>
                    <label for="benefits_course">преимущества курса</label>
                    <input autocomplete="off" type="text" placeholder="преимущества курса" id="benefits_course" v-model="formData.benefits_course">
                    <label for="create_date">начало курса*</label>
                    <input autocomplete="off" type="date" placeholder="1994-11-23" id="create_date" v-model="formData.create_date"> -->
                </div>
                <div class="col mt-3 mb-4">
                    <div class="d-flex justify-content-between title-block align-items-center">
                        <div @click="addStatus=!addStatus" class="page-title">Дни тренировок</div>
                    </div>
                </div>
                <div @click.stop  class="col content cardBlack mt-4">
                    <div class="accordion" v-for="(item, index) in formData.trainning_days" :key="index" :id="'accordionExample' + index">
                        <div class="accordion-item borderBlack">
                            <h2 class="accordion-header">
                                <button class="accordion-button trainingDaysBg" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index" aria-expanded="true" :aria-controls="'collapseOne' + index">
                                    <p class="ms-3 mt-1 mb-1">{{ item.day }}</p>
                                </button>
                            </h2>
                            <div :id="'collapseOne' + index" class="accordion-collapse collapse" :aria-labelledby="'headingOne' + index" :data-bs-parent="'#accordionExample' + index">
                                <div class="accordion-body">
                                    <div class="img-card benefitsBg px-4 py-5 mt-4">
                                        <div class="d-flex mt-2 mb-4">
                                            <input autocomplete="off" type="text" placeholder="Заголовок" id="price" v-model="formData.price">
                                        </div>
                                        <textarea type="text" v-model="formData.description" placeholder="Описание" class="description pt-2"></textarea>

                                        <label for="discount_price" class="text-end d-none">Итого: <span v-if="formData.price !== ''">{{ formData.discount_price = formData.price - Math.round((formData.price / 100) * formData.discount) }}</span></label>
                                    </div>
                                    <div class="form position-relative mt-5 mb-5">
                                        <div class="img-card row p-3 flex-wrap">
                                            <div v-for="(image, imgIndex) in images" :key="imgIndex" class="card-add-img m-2">
                                                <img :src="image" class="card-img-top" alt="Product Image">
                                            </div>
                                            <div class="card-button align-content-center text-center m-2" @click="selectImage">
                                                <div class="border py-3 m-2">
                                                    <button type="button" class="add-button border-0">+</button>
                                                    <br>
                                                    <span>Добавить фотографию</span>
                                                    <br>
                                                    <span>Минимальный размер 393x315 px</span>
                                                    <br>
                                                    <span>Максимальное кол-во фотографий: 5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <input autocomplete="off" type="file" ref="fileInput" @change="handleFileChange" style="display: none">
                                    </div>

                                    <div class="accordion" :id="'accordionExample' + index + 'alfa'">
                                        <div class="accordion-item borderBlack">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button trainingDaysBg" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index + 'alfa'" aria-expanded="true" :aria-controls="'collapseOne' + index + 'alfa'">
                                                    <p class="ms-3 mt-1 mb-1">Упражнения</p>
                                                </button>
                                            </h2>
                                            <div :id="'collapseOne' + index + 'alfa'" class="accordion-collapse collapse" :aria-labelledby="'headingOne' + index + 'alfa'" :data-bs-parent="'#accordionExample' + index + 'alfa'">
                                                <div class="accordion-body pb-3 clearfix">
                                                    <div class="img-card benefitsBg px-4 py-5 mt-4 mb-3" v-for="(value, index2) in formData.trainning_days[index].exercises" :key="index2">
                                                        <div class="d-flex mt-2 mb-4">
                                                            <input autocomplete="off" type="text" placeholder="Заголовок" id="price">
                                                        </div>
                                                        <input autocomplete="off" type="text" class="mb-4" placeholder="Ссылка на видео">
                                                        <textarea type="text" placeholder="Описание" class="description pt-2"></textarea>
                                                    </div>
                                                    <div class="cardBlack button float-end" @click="AppendExercises(index)">
                                                        <button class="buttons-primary border-0" type="button">+</button>
                                                        <span>Добавить ещё упражнение</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    
                    <!-- <div class="position-relative">
                        <label  for="name">Выбор тренера</label>
                        <input autocomplete="off" type="text" id="present" v-model="activeTR">
                        <img @click="presentMenu=!presentMenu" :class="{'rotate-90':presentMenu}" class="row-right-icon" src="@/assets/images/icons/row-right.png">
                        <div :class="{'d-block':presentMenu}" class="menu-type-1 pt-4 px-4">
                            <h1>Все тренеры</h1>
                            <div role="button"  v-for="treners in DataUsers" @click="idTr=treners.id,presentMenu=false,activeTR=treners.name+' '+treners.surname" class="statistics h-auto m-0 p-2"><hr class="m-0 p-1">
                                {{treners.name+' '+ treners.surname}}
                            </div>
                        </div>
                    </div>
                    <label for="benefits_course">преимущества курса</label>
                    <input autocomplete="off" type="text" placeholder="преимущества курса" id="benefits_course" v-model="formData.benefits_course">
                    <label for="create_date">начало курса*</label>
                    <input autocomplete="off" type="date" placeholder="1994-11-23" id="create_date" v-model="formData.create_date"> -->
                </div>
                <button class="buttons-primary border-0 my-3 me-5 float-end" type="button" @click="AppendTrainingDays()">+</button>
            </form>
        </div>
   </section>
  
  <!--  <div class="container">-->
  <!--    <div class="row">-->
  <!--      <div class="col">-->
  <!--        <div class="users-block">-->
  <!--          <table id="dataTable">-->
  <!--            <thead>-->
  <!--            <tr>-->
  <!--              <th>ФИО</th>-->
  <!--              <th>Телефон</th>-->
  <!--              <th>Статус</th>-->
  <!--              <th>Абонемент</th>-->
  <!--              <th>Курсы</th>-->
  <!--              <th>Услуги</th>-->
  <!--            </tr>-->
  <!--            </thead>-->
  <!--&lt;!&ndash;            <tbody v-show="!loading" v-for="(users, index) in DataUsers" :key="users.id" >&ndash;&gt;-->
  <!--&lt;!&ndash;            <tr>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td><router-link :to="{ name: 'UserPage', params: { id: users.id } }">{{users.name+' '+ users.surname}}</router-link></td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>{{ users.username }}</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>{{ users.status }}</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td class="d-flex justify-content-center"><div class="abonent">1</div></td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td>Кардио</td>&ndash;&gt;-->
  <!--&lt;!&ndash;              <td class="d-flex justify-content-center">&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi blue">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi red">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;                <div class="uslugi green">1</div>&ndash;&gt;-->
  <!--&lt;!&ndash;              </td>&ndash;&gt;-->
  <!--&lt;!&ndash;            </tr>&ndash;&gt;-->
  <!--&lt;!&ndash;            </tbody>&ndash;&gt;-->
  <!--            <tbody v-if="loading">-->
  <!--            <tr>-->
  <!--              <td class="color-yellow w-100 d-flex justify-content-center">Загрузка...</td>-->
  <!--            </tr>-->
  <!--            </tbody>-->
  <!--          </table>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  
  <!--    <div class="row">-->
  <!--      <div class="col">-->
  <!--        <div class="user-block-bottom">-->
  <!--          <div class="d-flex justify-content-between">-->
  <!--            <div class="left">Общее количество пользователей: <span class="users-quantity">2504</span></div>-->
  <!--            <div class="right">-->
  <!--              <a class="active" href="#">1</a>-->
  <!--              <a href="#">2</a>-->
  <!--              <a href="#">3</a>-->
  <!--              <a href="#">4</a>-->
  <!--              <a href="#">5</a>-->
  <!--              <a href="#">6</a>-->
  <!--              <a href="#">7</a>-->
  <!--              <a href="#">8</a>-->
  <!--              <a href="#">9</a>-->
  <!--              <a href="#">10</a>-->
  <!--              <a>...</a>-->
  <!--              <a href="#">30</a>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  </template>
  <script>
  import posts from "@/components/axios/posts.js";
  import gets from "@/components/axios/get.js"
  import form_Data from "@/components/axios/formData.js";
  export default {
    data(){
      return{
        activeTR:'',
        idTr:'',
        images: [],
        imagesPost: [],
        addCurs:'',
        formData: {
          title:"",
        //   type_courses:"",
          individual : false,
          group : true,
          description:"",
          coach_id:"",
          benefits_course: [
            {
                title: "",
                description: "",
            }
          ],
          img:"",
          status:"1",
          trainning_days: [ 
            {
                day : "День 1",
                title: "",
                description: "",
                images : "",
                exercises: [
                    {
                        title: "",
                        link: "",
                        description: ""
                    }
                ],
                sample_report: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
                max_report: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
            }
          ],
          create_date:'',
          price:"",
          discount:"",
          discount_price : "",
          direction_id:"1",
          user_count:"1",
        },
        DataUsers: null,
        userData: null,
        cursList: '',
        cursData:{
          user_id:'',
          courses_id:'',
          count:''
        },
        modal:'auto',
        error: null,
        loading: true,
        searchActive:'',
        addStatus:false,
        addCard:false,
        modalSelector:'',
        presentMenu:false
      }
    },
    methods:{
      coursesFn(){
        posts('http://fitness.abdurazzoq.beget.tech/public/enroll/courses', {...this.cursData})
            .then(response => {
              this.Delay('loading', 1)
              console.log(this.cursData)
            })
            .catch(error => {
              this.error = error;
              this.Delay('loading', 1)
            });
      },
      selectImage() {
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          this.imagesPost=file
          reader.onload = (e) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      },
      getInfoUsers(){
        posts('http://fitness.abdurazzoq.beget.tech/public/users', {"form": "0", "to": '21'})
            .then(response => {
              this.userData = response.data.users;
              this.Delay('loading', 1)
            })
            .catch(error => {
              this.error = error;
              this.Delay('loading', 1)
            });
      },
      getInfo (url,dataStore,id) {
  
        gets(url)
            .then(response => {
              this[dataStore]=[]
              if (id===1){
                this[dataStore]=response.data.data
              }else if (id===2) {
                this[dataStore]=response.data
              }
            })
            .catch(error => {
              console.log(error)
              this.error = error;
            });
      },
      AppendBenefits(){
        this.formData.benefits_course.push({
            title: "",
            description: "",
        });
        console.log('works');
      },
      RemoveBenefits(index) {
        this.formData.benefits_course.splice(index, 1);
      },
      AppendTrainingDays(){
        this.formData.trainning_days.push({
                day : "День "+(this.formData.trainning_days.length + 1),
                title: "",
                description: "",
                images : "",
                exercises: [
                    {
                        title: "",
                        link: "",
                        description: ""
                    }
                ],
                sample_report: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
                max_report: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
        });
        console.log('works');
      },
      RemoveTrainingDays(index) {
        this.formData.trainning_days.splice(index, 1);
      },
      AppendExercises(index){
        this.formData.trainning_days[index].exercises.push({
            title: "",
            link: "",
            description: ""
        });
        console.log('works');
      },
      RemoveExercises(idx, index) {
        this.formData.trainning_days[idx].exercises.splice(index, 1);
      },
  
      async submitForm() {
        let FormData = this.formData
        FormData.img=this.imagesPost
        FormData.coach_id=this.idTr
        try {
          const response = await form_Data('http://fitness.abdurazzoq.beget.tech/api/courses/create', FormData);
          if (response.status === 200) {
            this.addStatus = true;
            await this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
            await this.getInfo('http://fitness.abdurazzoq.beget.tech/api/courses/all','cursList', 2)
            await this.getInfoUsers()
            this.Delay('addStatus', 7);
          } else {
            console.error(`Запрос завершился с ошибкой: ${response.status}`);
          }
        } catch (error) {
          console.error('Ошибка при отправке данных:', error);
        }
      },
      Delay(target,t){
        setTimeout(()=>{
          this[target]=false
        },t*1000)
      },
      clearData(data){
        for (let key in data){
          data[key]=''
        }
      },
      toggleModal(modalSelector) {
        this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
        this.modalSelector=modalSelector
      },
      updateToggleModal() {
        if (this.modal==="auto"){
          document.querySelector(this.modalSelector).classList.add("d-none")
          document.body.style.overflow=this.modal
        }else{
          document.body.style.overflow=this.modal
          document.querySelector(this.modalSelector).classList.remove("d-none")
        }
  
      },
    },
    mounted() {
      this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
      this.getInfo('http://fitness.abdurazzoq.beget.tech/api/courses/all','cursList', 2)
      this.getInfoUsers()
    },
    watch: {
      modal() {
        this.updateToggleModal();
      }
    },
  }
  
  </script>
  
  <style lang="scss" scoped>
  button.active {
    background-color: #c3ff00;
    color: #333;
  }
  button.add-button {
    background: url("@/assets/images/icons/add.png") center;
    color: #333;
    border-radius: 50%;
    min-width: 43px;
    min-height: 43px;
    padding: 0;
  }
  .add-user-modal .content {
    max-height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
  }
  input[type=text], input[type=text], textarea, .img-card, .cardBg{
    background-color: #1E1E20 !important;
  }
  .card-add-img{
    width: 300px;
    min-height: 174px !important;
  }
  .img-card .card-button{
    width: 300px;
    min-height: 174px;
    background: #28282B;
    border-radius: 20px;
  }
  .img-card .card-button span{
    font-size: 11px;
    color: #7c7c7c;
    line-height: auto;
    width: 100%;
  }
  .border{
    border: 1px dashed #7c7c7c !important;
    border-radius: 15px;
  }
  .benefitsBg{
    background: #232325 !important;
    position: relative;
  }
  .benefitsBg input,textarea,.inp{
    font-size: 18px;
    padding: 18px !important;
    border-radius: 18px;
  }
  .benefitsBg textarea{
    min-height: 155px;
  }
  .listInput input, .listInput div{
    width: 23%;
  }
  .buttons-primary{
    background: url(/src/assets/images/icons/add.png) center;
    color: #333;
    border-radius: 50%;
    min-width: 43px;
    min-height: 43px;
    padding: 0;
  }
  .removeBenefits{
    background: transparent;
    border: none;
    color:#F5f5f5;
    font-size: 25px;
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .trainingDaysBg, .accordion-body{
    background: #111112 !important;
    border: none !important;
    color: #fff !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .borderBlack{
    border-color: #111112;
    border-radius: 18px !important;
  }
  .mincountDiv input{
    width: 100%;
  }
  .mincountDiv span{
    font-size: 11px;
  }
  .accordion-button:not(.collapsed)::after {
        content: "";
        display: inline-block;
        width: 26px;
        height: 16px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M0.999176 0.951139C1.71162 0.233138 2.86672 0.233138 3.57916 0.951139L13.2351 10.6824L22.8911 0.951142C23.6035 0.233142 24.7586 0.233142 25.4711 0.951142C26.1835 1.66914 26.1835 2.83325 25.4711 3.55126L14.5251 14.5826C13.8127 15.3006 12.6576 15.3006 11.9451 14.5826L0.999176 3.55125C0.286733 2.83325 0.286733 1.66914 0.999176 0.951139Z" fill="%23D0FD3E"/%3E%3C/svg%3E') !important;
   }

    .accordion-button.collapsed::after {
        content: "";
        display: inline-block;
        width: 26px;
        height: 16px;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M0.999176 0.951139C1.71162 0.233138 2.86672 0.233138 3.57916 0.951139L13.2351 10.6824L22.8911 0.951142C23.6035 0.233142 24.7586 0.233142 25.4711 0.951142C26.1835 1.66914 26.1835 2.83325 25.4711 3.55126L14.5251 14.5826C13.8127 15.3006 12.6576 15.3006 11.9451 14.5826L0.999176 3.55125C0.286733 2.83325 0.286733 1.66914 0.999176 0.951139Z" fill="%23D0FD3E"/%3E%3C/svg%3E') !important;
    }

    .cardBlack.button{
        width: fit-content !important;
        font-size: 10px;
        cursor: pointer;
        padding: 5px 10px;
        text-align: right;
        background-color: #232325;
    }
    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

    .cardBlack.button>button{
        transform: scale(0.6)
    }

  </style>