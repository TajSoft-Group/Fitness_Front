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
            <form class="form" @submit.prevent="submitForm()">
                <div @click.stop  class="col content cardBlack">
                    <div class="menu-type-2 w-50 m-auto d-flex justify-content-between">
                        <div class="form-recipients">
                            <input autocomplete="off" class="form-check-input" type="checkbox" id="ind" name="type" :checked="individual" value="1" v-model="individual">
                            <label for="ind" class="text-white">Индивидуальные</label>
                        </div>
                        <div class="form-recipients">
                            <input autocomplete="off" class="form-check-input" type="checkbox" id="type" name="type" :checked="group" value="2" v-model="group">
                            <label for="type" class="text-white">Групповые</label>
                        </div>
                    </div>
                    <div class="mx-5">

                        <label for="title" class="m-0 mb-3" v-if="individual && !group">Индивидуальный</label>
                        <label for="title" class="m-0 mb-3" v-if="group && !individual">Группа</label>
                        <label for="title" class="m-0 mb-3" v-if="(individual && group) || (!individual && !group)">Название</label>

                        <input required autocomplete="off" type="text" placeholder="Введите название курса" id="title" class="inp" v-model="formData.title">
                    </div>

                    <div ref="imageScroll" class="form position-relative mt-3 mb-5 mx-5">
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
                                    <span>Минимальный размер 393x315px</span>
                                    <br>
                                    <span>Максимальное кол-во фотографий: 5</span>
                            </div>
                            </div>
                          <div class="text-danger" v-if="errMessage !== ''">{{ errMessage }}</div>
                        </div>
                        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
                    </div>
                    <div class="col mt-5 mx-5 px-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4>Преимущества курса</h4>
                            <button class="buttons-primary border-0" type="button" @click="AppendBenefits()">+</button>
                        </div>
                    </div>
                    <div class="img-card benefitsBg px-4 py-5 mt-4 mx-5" v-for="(item, index) in formData.benefits_course" :key="index">
                        <div class="d-flex mt-2 mb-4">
                            <input required autocomplete="off" type="text" placeholder="Заголовок" v-model="formData.benefits_course[index].title">
                        </div>
                        <textarea required type="text" v-model="formData.benefits_course[index].description" placeholder="Описание" class="description pt-2"></textarea>

                        <button type="button" class="removeBenefits" @click="RemoveBenefits(index)">&times;</button>
                      </div>
                      <div class="d-flex justify-content-between align-items-start my-4 mt-5 listInput mx-5 px-2">
                        <input required autocomplete="off" type="text" class="" placeholder="Цена" id="price" v-model="formData.price">
                        <input autocomplete="off" type="text" class="" placeholder="Скидка" id="discount" v-model="formData.discount">
                        <input required autocomplete="off" type="text" class="" placeholder="Итого" id="total" v-model="formData.discount_price">

                        <label for="discount_price" class="text-end d-none">Итого: <span v-if="formData.price!==''">{{formData.discount_price=formData.price-Math.round((formData.price/100) * formData.discount)}}</span></label><!--        <div class="form position-relative">-->

                          <div class="mincountDiv" v-show="!individual || group">
                            <input autocomplete="off" type="text" class="" placeholder="Мин. кол-во" id="total" v-model="formData.user_count">
                            <span>*Минимальное количество людей в группе</span>
                        </div>
                    </div>
                </div>
                <div class="col mt-3 mb-4">
                    <div class="d-flex justify-content-between title-block align-items-center">
                        <div @click="addStatus=!addStatus" class="page-title">Дни тренировок</div>
                    </div>
                </div>

                <div @click.stop  class="col content cardBlack mt-4">
                    <div class="accordion" v-for="(item, index) in formData.training_days" :key="index" :id="'accordionExample' + index">
                        <div class="accordion-item borderBlack">
                            <h2 class="accordion-header">
                                <button class="accordion-button trainingDaysBg" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index" aria-expanded="true" :aria-controls="'collapseOne' + index">
                                    <p class="ms-3 mt-1 mb-1">{{ item.day }}</p>
                                </button>
                            </h2>
                            <div :id="'collapseOne' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" :aria-labelledby="'headingOne' + index" :data-bs-parent="'#accordionExample' + index">
                                <div class="accordion-body">
                                    <div class="img-card benefitsBg px-4 py-5 mt-4">
                                        <div class="d-flex mt-2 mb-4">
                                            <input required autocomplete="off" type="text" placeholder="Заголовок" v-model="formData.training_days[index].title">
                                        </div>
                                        <textarea required type="text" v-model="formData.training_days[index].description" placeholder="Описание" class="description pt-2"></textarea>
                                    </div>
                                    <div class="form position-relative mt-5 mb-5">
                                        <div class="img-card row p-3 flex-wrap">
                                          <!-- v-for="(image, imgIndex) in images" :key="imgIndex"   -->
                                            <div v-for="(image, imgIndex2) in formData.training_days[index].images" :key="imgIndex2" class="card-add-img m-2">
                                                <img :src="image" class="card-img-top" alt="Product Image">
                                            </div>
                                            <!-- @click="selectImage" -->
                                            <div ref="imageScroll2" class="card-button align-content-center text-center m-2" @click="selectDaysImage('fileInputDays' + index)">
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
                                        <!-- @change="handleFileChange" -->
                                        <input autocomplete="off" type="file" @change="handleFileChangeDays(index, $event)" :ref="'fileInputDays' + index"  style="display: none">
                                    </div>

                                    <div class="accordion" :id="'Exercises' + index">
                                        <div class="accordion-item borderBlack">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button trainingDaysBg" type="button" data-bs-toggle="collapse" :data-bs-target="'#exerciseItem' + index" aria-expanded="false" :aria-controls="'#exerciseItem' + index">
                                                    <p class="ms-3 mt-1 mb-1">Упражнения</p>
                                                </button>
                                            </h2>
                                            <div :id="'exerciseItem' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" :data-bs-parent="'Exercises' + index">
                                                <div class="accordion-body pb-3 clearfix">
                                                    <div class="img-card benefitsBg px-4 py-5 mt-4 mb-3" v-for="(value, index2) in formData.training_days[index].exercises" :key="index2">
                                                        <div class="d-flex mt-2 mb-4">
                                                            <input required autocomplete="off" type="text" placeholder="Заголовок" v-model="formData.training_days[index].exercises[index2].title">
                                                        </div>
                                                        <input autocomplete="off" type="text" class="mb-4" placeholder="Ссылка на видео" v-model="formData.training_days[index].exercises[index2].link">
                                                        <textarea required type="text" placeholder="Описание" class="description pt-2" v-model="formData.training_days[index].exercises[index2].description"></textarea>
                                                    </div>
                                                    <div class="cardBlack button float-end" @click="AppendExercises(index)">
                                                        <button class="buttons-primary border-0" type="button">+</button>
                                                        <span>Добавить ещё упражнение</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="ms-5 ps-5 mt-5">Примерный отчёт</p>
                                    <div class="d-flex justify-content-between my-4">
                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="33" viewBox="0 0 25 33" fill="none">
                                          <path d="M24.9288 19.321C24.5469 14.3995 22.2324 11.3153 20.1904 8.59372C18.2997 6.07412 16.6667 3.89831 16.6667 0.688677C16.6667 0.430865 16.5208 0.195224 16.2896 0.0770818C16.0576 -0.0417697 15.7789 -0.0223049 15.568 0.129418C12.5014 2.30187 9.94264 5.96339 9.04883 9.45701C8.42832 11.8893 8.34622 14.6236 8.3347 16.4295C5.50267 15.8307 4.86113 11.6369 4.85436 11.5912C4.82246 11.3736 4.68822 11.1843 4.4929 11.081C4.29557 10.9789 4.06361 10.9715 3.86354 11.0696C3.71504 11.1407 0.218359 12.8996 0.0149086 19.9225C0.000650799 20.1562 0 20.3905 0 20.6248C0 27.4476 5.60775 32.999 12.5 32.999C12.5095 32.9996 12.5197 33.0009 12.5278 32.999C12.5305 32.999 12.5332 32.999 12.5366 32.999C19.4119 32.9794 25 27.4356 25 20.6248C25 20.2817 24.9288 19.321 24.9288 19.321ZM12.5 31.624C10.2023 31.624 8.33333 29.653 8.33333 27.2301C8.33333 27.1476 8.33268 27.0643 8.33874 26.9623C8.36654 25.9405 8.56256 25.243 8.77754 24.7791C9.1804 25.6357 9.90059 26.4232 11.0704 26.4232C11.4543 26.4232 11.7649 26.1157 11.7649 25.7357C11.7649 24.7569 11.7853 23.6277 12.0314 22.6086C12.2505 21.705 12.774 20.7436 13.4373 19.9729C13.7323 20.9732 14.3074 21.7828 14.8689 22.573C15.6726 23.7035 16.5033 24.8724 16.6492 26.8656C16.6579 26.9837 16.6668 27.1026 16.6668 27.2301C16.6667 29.6529 14.7977 31.624 12.5 31.624Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Калории" v-model="formData.training_days[index].simple_reports.calorie">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 18.0101C0.5 8.35094 8.35473 0.5 18 0.5C27.6453 0.5 35.5 8.35094 35.5 18.0101C35.5 27.6491 27.6453 35.5 18 35.5C8.35473 35.5 0.5 27.6491 0.5 18.0101ZM24.419 19.782C24.6048 19.5963 24.8413 19.3093 24.892 19.2417C25.1622 18.8872 25.2974 18.4482 25.2974 18.0109C25.2974 17.5196 25.1453 17.0637 24.8582 16.6923C24.8346 16.6688 24.7886 16.6186 24.7285 16.5533C24.6162 16.431 24.4549 16.2554 24.3007 16.1014C22.9156 14.6156 19.3007 12.1843 17.4088 11.4415C17.1217 11.325 16.3953 11.07 16.0068 11.0531C15.6352 11.0531 15.2805 11.1375 14.9426 11.3064C14.5203 11.5428 14.1825 11.9142 13.9967 12.3532C13.8784 12.6571 13.6926 13.5688 13.6926 13.5857C13.5068 14.5818 13.4055 16.2027 13.4055 17.9923C13.4055 19.6993 13.5068 21.2509 13.6588 22.2639C13.663 22.2681 13.6776 22.3406 13.7001 22.4531C13.7688 22.7953 13.9117 23.5081 14.0643 23.8004C14.4359 24.5095 15.1622 24.9484 15.9393 24.9484H16.0068C16.5136 24.9316 17.5778 24.4926 17.5778 24.4757C19.3683 23.7328 22.8987 21.4197 24.3176 19.8833L24.419 19.782Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Время" v-model="formData.training_days[index].simple_reports.time">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68393 5.73825C5.6176 4.49437 7.9023 4 9.5 4H29.3636C30.3176 4 31.0909 4.74619 31.0909 5.66667C31.0909 6.58714 30.3176 7.33333 29.3636 7.33333H9.5C8.50679 7.33333 6.90513 7.6723 5.60016 8.51175C4.3658 9.30578 3.45455 10.493 3.45455 12.3333C3.45455 14.1737 4.3658 15.3609 5.60016 16.1549C6.90513 16.9944 8.50679 17.3333 9.5 17.3333H28.5C30.0977 17.3333 32.3824 17.8277 34.3161 19.0716C36.3204 20.3609 38 22.507 38 25.6667C38 28.8263 36.3204 30.9724 34.3161 32.2617C32.3824 33.5056 30.0977 34 28.5 34H8.63636C7.68242 34 6.90909 33.2538 6.90909 32.3333C6.90909 31.4129 7.68242 30.6667 8.63636 30.6667H28.5C29.4932 30.6667 31.0949 30.3277 32.3998 29.4882C33.6342 28.6942 34.5455 27.507 34.5455 25.6667C34.5455 23.8263 33.6342 22.6391 32.3998 21.8451C31.0949 21.0056 29.4932 20.6667 28.5 20.6667H9.5C7.9023 20.6667 5.6176 20.1723 3.68393 18.9284C1.67965 17.6391 0 15.493 0 12.3333C0 9.17368 1.67965 7.02755 3.68393 5.73825Z" fill="white"/>
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1541 1.51772C30.1259 0.54594 31.4439 0 32.8182 0C34.1925 0 35.5105 0.54594 36.4823 1.51772C37.4541 2.4895 38 3.80751 38 5.18182C38 6.55612 37.4541 7.87414 36.4823 8.84592C35.5105 9.8177 34.1925 10.3636 32.8182 10.3636C31.4439 10.3636 30.1259 9.8177 29.1541 8.84592C28.1823 7.87414 27.6364 6.55612 27.6364 5.18182C27.6364 3.80751 28.1823 2.4895 29.1541 1.51772ZM32.8182 3.45455C32.3601 3.45455 31.9207 3.63653 31.5968 3.96045C31.2729 4.28438 31.0909 4.72372 31.0909 5.18182C31.0909 5.63992 31.2729 6.07926 31.5968 6.40318C31.9207 6.72711 32.3601 6.90909 32.8182 6.90909C33.2763 6.90909 33.7156 6.72711 34.0395 6.40318C34.3635 6.07926 34.5455 5.63992 34.5455 5.18182C34.5455 4.72372 34.3635 4.28438 34.0395 3.96045C33.7156 3.63653 33.2763 3.45455 32.8182 3.45455ZM1.51772 29.1541C2.4895 28.1823 3.80751 27.6364 5.18182 27.6364C6.55612 27.6364 7.87414 28.1823 8.84592 29.1541C9.8177 30.1259 10.3636 31.4439 10.3636 32.8182C10.3636 34.1925 9.8177 35.5105 8.84592 36.4823C7.87414 37.4541 6.55612 38 5.18182 38C3.80751 38 2.4895 37.4541 1.51772 36.4823C0.54594 35.5105 0 34.1925 0 32.8182C0 31.4439 0.54594 30.1259 1.51772 29.1541ZM5.18182 31.0909C4.72372 31.0909 4.28438 31.2729 3.96045 31.5968C3.63653 31.9207 3.45455 32.3601 3.45455 32.8182C3.45455 33.2763 3.63653 33.7156 3.96045 34.0395C4.28438 34.3635 4.72372 34.5455 5.18182 34.5455C5.63992 34.5455 6.07926 34.3635 6.40318 34.0395C6.72711 33.7156 6.90909 33.2763 6.90909 32.8182C6.90909 32.3601 6.72711 31.9207 6.40318 31.5968C6.07926 31.2729 5.63992 31.0909 5.18182 31.0909Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Дистанция" v-model="formData.training_days[index].simple_reports.distance">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="0 0 38 44" fill="none">
                                          <path d="M7.53894 31.378C6.36695 31.5504 4.43767 31.8712 3.15423 30.41C1.87079 28.9488 0.76091 25.4204 0.273111 22.267C-0.446712 17.6194 0.26763 13.7023 2.28277 11.2382C3.4703 9.78712 5.0287 8.94651 6.78989 8.81267C8.29805 8.69625 10.5516 9.28844 12.7275 12.7719C14.0904 14.9545 15.1272 17.854 15.5721 20.726C16.1092 24.193 16.6326 27.8928 14.8011 29.2192C13.768 29.9682 13.0262 30.2276 11.2733 30.6465C9.83178 30.9903 8.71185 31.2048 7.53894 31.378ZM5.45438 34.36L15.4013 32.3011C16.2417 32.127 16.9158 32.5908 17.2282 33.9805C18.2532 38.542 16.7843 44 12.184 44C7.8276 44 4.92456 39.0168 4.45046 36.3383C4.23397 35.1236 4.54272 34.548 5.45438 34.36ZM26.7266 21.8472C24.9736 21.4301 24.2319 21.1688 23.1988 20.4199C21.3672 19.0934 21.8906 15.3936 22.4278 11.9267C22.8726 9.05468 23.9094 6.15151 25.2724 3.97252C27.4464 0.489085 29.7 -0.1031 31.21 0.01332C32.9694 0.148074 34.5287 0.98685 35.7162 2.43798C37.7332 4.90205 38.4475 8.81909 37.7258 13.4667C37.2371 16.6202 36.1309 20.1366 34.8402 21.6097C33.5494 23.0829 31.6311 22.7501 30.4555 22.5778C29.2798 22.4054 28.1672 22.19 26.7266 21.8472ZM32.5446 25.5598L22.5977 23.5009C21.7573 23.3267 21.0831 23.7905 20.7707 25.1803C19.7467 29.7417 21.2156 35.1997 25.8159 35.1997C30.1723 35.1997 33.0753 30.2166 33.5494 27.538C33.765 26.3234 33.4562 25.7477 32.5446 25.5598Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Шаги" v-model="formData.training_days[index].simple_reports.steps">
                                      </div>
                                    </div>
                                    <p class="ms-5 ps-5">Максимальный отчёт</p>
                                    <div class="d-flex justify-content-between my-4">
                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="33" viewBox="0 0 25 33" fill="none">
                                          <path d="M24.9288 19.321C24.5469 14.3995 22.2324 11.3153 20.1904 8.59372C18.2997 6.07412 16.6667 3.89831 16.6667 0.688677C16.6667 0.430865 16.5208 0.195224 16.2896 0.0770818C16.0576 -0.0417697 15.7789 -0.0223049 15.568 0.129418C12.5014 2.30187 9.94264 5.96339 9.04883 9.45701C8.42832 11.8893 8.34622 14.6236 8.3347 16.4295C5.50267 15.8307 4.86113 11.6369 4.85436 11.5912C4.82246 11.3736 4.68822 11.1843 4.4929 11.081C4.29557 10.9789 4.06361 10.9715 3.86354 11.0696C3.71504 11.1407 0.218359 12.8996 0.0149086 19.9225C0.000650799 20.1562 0 20.3905 0 20.6248C0 27.4476 5.60775 32.999 12.5 32.999C12.5095 32.9996 12.5197 33.0009 12.5278 32.999C12.5305 32.999 12.5332 32.999 12.5366 32.999C19.4119 32.9794 25 27.4356 25 20.6248C25 20.2817 24.9288 19.321 24.9288 19.321ZM12.5 31.624C10.2023 31.624 8.33333 29.653 8.33333 27.2301C8.33333 27.1476 8.33268 27.0643 8.33874 26.9623C8.36654 25.9405 8.56256 25.243 8.77754 24.7791C9.1804 25.6357 9.90059 26.4232 11.0704 26.4232C11.4543 26.4232 11.7649 26.1157 11.7649 25.7357C11.7649 24.7569 11.7853 23.6277 12.0314 22.6086C12.2505 21.705 12.774 20.7436 13.4373 19.9729C13.7323 20.9732 14.3074 21.7828 14.8689 22.573C15.6726 23.7035 16.5033 24.8724 16.6492 26.8656C16.6579 26.9837 16.6668 27.1026 16.6668 27.2301C16.6667 29.6529 14.7977 31.624 12.5 31.624Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Калории" v-model="formData.training_days[index].max_reports.calorie">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 18.0101C0.5 8.35094 8.35473 0.5 18 0.5C27.6453 0.5 35.5 8.35094 35.5 18.0101C35.5 27.6491 27.6453 35.5 18 35.5C8.35473 35.5 0.5 27.6491 0.5 18.0101ZM24.419 19.782C24.6048 19.5963 24.8413 19.3093 24.892 19.2417C25.1622 18.8872 25.2974 18.4482 25.2974 18.0109C25.2974 17.5196 25.1453 17.0637 24.8582 16.6923C24.8346 16.6688 24.7886 16.6186 24.7285 16.5533C24.6162 16.431 24.4549 16.2554 24.3007 16.1014C22.9156 14.6156 19.3007 12.1843 17.4088 11.4415C17.1217 11.325 16.3953 11.07 16.0068 11.0531C15.6352 11.0531 15.2805 11.1375 14.9426 11.3064C14.5203 11.5428 14.1825 11.9142 13.9967 12.3532C13.8784 12.6571 13.6926 13.5688 13.6926 13.5857C13.5068 14.5818 13.4055 16.2027 13.4055 17.9923C13.4055 19.6993 13.5068 21.2509 13.6588 22.2639C13.663 22.2681 13.6776 22.3406 13.7001 22.4531C13.7688 22.7953 13.9117 23.5081 14.0643 23.8004C14.4359 24.5095 15.1622 24.9484 15.9393 24.9484H16.0068C16.5136 24.9316 17.5778 24.4926 17.5778 24.4757C19.3683 23.7328 22.8987 21.4197 24.3176 19.8833L24.419 19.782Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Время" v-model="formData.training_days[index].max_reports.time">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68393 5.73825C5.6176 4.49437 7.9023 4 9.5 4H29.3636C30.3176 4 31.0909 4.74619 31.0909 5.66667C31.0909 6.58714 30.3176 7.33333 29.3636 7.33333H9.5C8.50679 7.33333 6.90513 7.6723 5.60016 8.51175C4.3658 9.30578 3.45455 10.493 3.45455 12.3333C3.45455 14.1737 4.3658 15.3609 5.60016 16.1549C6.90513 16.9944 8.50679 17.3333 9.5 17.3333H28.5C30.0977 17.3333 32.3824 17.8277 34.3161 19.0716C36.3204 20.3609 38 22.507 38 25.6667C38 28.8263 36.3204 30.9724 34.3161 32.2617C32.3824 33.5056 30.0977 34 28.5 34H8.63636C7.68242 34 6.90909 33.2538 6.90909 32.3333C6.90909 31.4129 7.68242 30.6667 8.63636 30.6667H28.5C29.4932 30.6667 31.0949 30.3277 32.3998 29.4882C33.6342 28.6942 34.5455 27.507 34.5455 25.6667C34.5455 23.8263 33.6342 22.6391 32.3998 21.8451C31.0949 21.0056 29.4932 20.6667 28.5 20.6667H9.5C7.9023 20.6667 5.6176 20.1723 3.68393 18.9284C1.67965 17.6391 0 15.493 0 12.3333C0 9.17368 1.67965 7.02755 3.68393 5.73825Z" fill="white"/>
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1541 1.51772C30.1259 0.54594 31.4439 0 32.8182 0C34.1925 0 35.5105 0.54594 36.4823 1.51772C37.4541 2.4895 38 3.80751 38 5.18182C38 6.55612 37.4541 7.87414 36.4823 8.84592C35.5105 9.8177 34.1925 10.3636 32.8182 10.3636C31.4439 10.3636 30.1259 9.8177 29.1541 8.84592C28.1823 7.87414 27.6364 6.55612 27.6364 5.18182C27.6364 3.80751 28.1823 2.4895 29.1541 1.51772ZM32.8182 3.45455C32.3601 3.45455 31.9207 3.63653 31.5968 3.96045C31.2729 4.28438 31.0909 4.72372 31.0909 5.18182C31.0909 5.63992 31.2729 6.07926 31.5968 6.40318C31.9207 6.72711 32.3601 6.90909 32.8182 6.90909C33.2763 6.90909 33.7156 6.72711 34.0395 6.40318C34.3635 6.07926 34.5455 5.63992 34.5455 5.18182C34.5455 4.72372 34.3635 4.28438 34.0395 3.96045C33.7156 3.63653 33.2763 3.45455 32.8182 3.45455ZM1.51772 29.1541C2.4895 28.1823 3.80751 27.6364 5.18182 27.6364C6.55612 27.6364 7.87414 28.1823 8.84592 29.1541C9.8177 30.1259 10.3636 31.4439 10.3636 32.8182C10.3636 34.1925 9.8177 35.5105 8.84592 36.4823C7.87414 37.4541 6.55612 38 5.18182 38C3.80751 38 2.4895 37.4541 1.51772 36.4823C0.54594 35.5105 0 34.1925 0 32.8182C0 31.4439 0.54594 30.1259 1.51772 29.1541ZM5.18182 31.0909C4.72372 31.0909 4.28438 31.2729 3.96045 31.5968C3.63653 31.9207 3.45455 32.3601 3.45455 32.8182C3.45455 33.2763 3.63653 33.7156 3.96045 34.0395C4.28438 34.3635 4.72372 34.5455 5.18182 34.5455C5.63992 34.5455 6.07926 34.3635 6.40318 34.0395C6.72711 33.7156 6.90909 33.2763 6.90909 32.8182C6.90909 32.3601 6.72711 31.9207 6.40318 31.5968C6.07926 31.2729 5.63992 31.0909 5.18182 31.0909Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Дистанция" v-model="formData.training_days[index].max_reports.distance">
                                      </div>

                                      <div class="d-flex align-items-center mx-5 cardBg borderBlack px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="0 0 38 44" fill="none">
                                          <path d="M7.53894 31.378C6.36695 31.5504 4.43767 31.8712 3.15423 30.41C1.87079 28.9488 0.76091 25.4204 0.273111 22.267C-0.446712 17.6194 0.26763 13.7023 2.28277 11.2382C3.4703 9.78712 5.0287 8.94651 6.78989 8.81267C8.29805 8.69625 10.5516 9.28844 12.7275 12.7719C14.0904 14.9545 15.1272 17.854 15.5721 20.726C16.1092 24.193 16.6326 27.8928 14.8011 29.2192C13.768 29.9682 13.0262 30.2276 11.2733 30.6465C9.83178 30.9903 8.71185 31.2048 7.53894 31.378ZM5.45438 34.36L15.4013 32.3011C16.2417 32.127 16.9158 32.5908 17.2282 33.9805C18.2532 38.542 16.7843 44 12.184 44C7.8276 44 4.92456 39.0168 4.45046 36.3383C4.23397 35.1236 4.54272 34.548 5.45438 34.36ZM26.7266 21.8472C24.9736 21.4301 24.2319 21.1688 23.1988 20.4199C21.3672 19.0934 21.8906 15.3936 22.4278 11.9267C22.8726 9.05468 23.9094 6.15151 25.2724 3.97252C27.4464 0.489085 29.7 -0.1031 31.21 0.01332C32.9694 0.148074 34.5287 0.98685 35.7162 2.43798C37.7332 4.90205 38.4475 8.81909 37.7258 13.4667C37.2371 16.6202 36.1309 20.1366 34.8402 21.6097C33.5494 23.0829 31.6311 22.7501 30.4555 22.5778C29.2798 22.4054 28.1672 22.19 26.7266 21.8472ZM32.5446 25.5598L22.5977 23.5009C21.7573 23.3267 21.0831 23.7905 20.7707 25.1803C19.7467 29.7417 21.2156 35.1997 25.8159 35.1997C30.1723 35.1997 33.0753 30.2166 33.5494 27.538C33.765 26.3234 33.4562 25.7477 32.5446 25.5598Z" fill="white"/>
                                        </svg>
                                        <input required type="text" class="outline-none" placeholder="Шаги" v-model="formData.training_days[index].max_reports.steps">
                                      </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="buttons-primary border-0 my-3 me-5 float-end" type="button" @click="AppendTrainingDays()">+</button>
                <div class="w-100 mt-5 pt-5 d-flex justify-content-around">
                  <button class="cardBg borderBlack border-0 text-white px-5 py-3">Отмена</button>
                  <button class="active border-0 px-5 py-3" type="submit">Сохранить</button>
                </div>
            </form>
        </div>
   </section>

  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="mt-2 text-light text-center">Идет загрузка...</div>
    </div>
  </div>

  </template>
  <script>
  import posts from "@/components/axios/posts.js";
  import gets from "@/components/axios/get.js"
  import form_Data from "@/components/axios/formData.js";
  import { Fragment } from "vue";
  import router from "@/router";
  export default {
    data(){
      return{
        isLoading: false,
        errMessage: '',
        activeTR:'',
        images: [],
        imagesPost: [],
        addCurs:'',
        individual : true,
        group : false,
        formData: {
          title:"",
          img:"",
          type_courses: "",
          coach_id: "27",
          benefits_course: [
            {
                title: "",
                description: "",
            }
          ],
          price:"",
          discount:"",
          discount_price : "",
          training_days: [ 
            {
                courses_id: "",
                day : "День 1",
                title: "",
                description: "",
                images : [],
                imagesPost : [],
                exercises: [
                    {
                        title: "",
                        link: "",
                        description: ""
                    }
                ],
                simple_reports: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
                max_reports: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
            }
          ],
          description : 'none',
          create_date:'31.03.2024',
          direction_id:"1",
          user_count:"1",
          status:"1",
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
      selectDaysImage(refName) {
        // console.log(this.$refs[refName][0]);
        this.$refs[refName][0].click();
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
      handleFileChangeDays(idx, event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          this.formData.training_days[idx].imagesPost=file
          reader.onload = (e) => {
            console.log(this.formData.training_days[idx])
            this.formData.training_days[idx].images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
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
      },
      RemoveBenefits(index) {
        this.formData.benefits_course.splice(index, 1);
      },
      AppendTrainingDays(){
        this.formData.training_days.push( {
                day : "День " + (this.formData.training_days.length+1),
                title: "",
                description: "",
                images : [],
                imagesPost : [],
                exercises: [
                    {
                        title: "",
                        link: "",
                        description: ""
                    }
                ],
                simple_reports: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
                max_reports: {
                    calorie: "",
                    time: "",
                    distance: "",
                    steps: "",
                },
            });
      },
      RemoveTrainingDays(index) {
        this.formData.training_days.splice(index, 1);
      },
      AppendExercises(index){
        this.formData.training_days[index].exercises.push({
            title: "",
            link: "",
            description: ""
        });
      },
      RemoveExercises(idx, index) {
        this.formData.training_days[idx].exercises.splice(index, 1);
      },
  
      async submitForm() {
        // SETTING COURSETYPE
        if(this.individual && this.group)
          this.formData.type_courses = 3;
        else if(this.individual && !this.group)
          this.formData.type_courses = 1
        else
          this.formData.type_courses = 2

        let FormData = {...this.formData}
        FormData.img=this.imagesPost
        FormData.benefits_course = JSON.stringify(FormData.benefits_course)
        console.log(FormData.benefits_course);
        // FormData.benefits_course = (FormData.benefits_course)
        delete FormData.training_days;

        if(FormData.img.length === 0){
          this.$refs.imageScroll.scrollIntoView({ behavior: 'smooth' });
          this.errMessage = 'Выберите изображение'
          return
        }

        this.isLoading = true
        try {
          const response = await form_Data('http://fitness.abdurazzoq.beget.tech/api/courses/create', FormData);
          this.isLoading = false

          console.log(response)
          if (response.status === 201) {
            let TDformData = this.formData.training_days;
            let course_id = response.data.courses_id;
            TDformData.forEach(td => {


              td.courses_id = course_id;
              td.images = td.imagesPost;
              delete td.imagesPost;
              td.exercises = JSON.stringify(td.exercises)
              td.simple_reports = JSON.stringify(td.simple_reports)
              td.max_reports = JSON.stringify(td.max_reports)
              console.log(td)
              try {
                const response = form_Data('http://fitness.abdurazzoq.beget.tech/api/training/create', td);
                if (response.status === 201) {
                  this.addStatus = true;
                  // await this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
                  // await this.getInfo('http://fitness.abdurazzoq.beget.tech/api/courses/all','cursList', 2)
                  // await this.getInfoUsers()
                  router.push("/courses");
                  this.Delay('addStatus', 7);
                } else {
                  console.error(`Запрос завершился с ошибкой: ${response.status}`);
                  router.push("/courses");
                }
              } catch (error) {
                this.isLoading = false
                console.error('Ошибка при отправке данных:', error);
              }
            });
            this.addStatus = true;
            // await this.getInfo('http://fitness.abdurazzoq.beget.tech/public/api/coach/all','DataUsers', 1)
            // await this.getInfo('http://fitness.abdurazzoq.beget.tech/api/courses/all','cursList', 2)
            // await this.getInfoUsers()
            this.Delay('addStatus', 7);
          } else {
            this.isLoading = false

            console.error(`Запрос завершился с ошибкой: ${response.status}`);
          }
        } catch (error) {
          this.isLoading = false
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
      // this.getInfoUsers()
    },
    watch: {
      modal() {
        this.updateToggleModal();
      }
    },
  }
  
  </script>
  
  <style lang="scss" scoped>
  .overlay {
    pointer-events: all; /* Блокирует все клики под элементом */
    overflow: hidden; /* Блокирует прокрутку под элементом */
    z-index: 9999; /* Убедитесь, что z-index достаточно высок */
  }

  body {
    overflow: auto;
  }
  button.active {
    background-color: #c3ff00;
    color: #333;
    border-radius: 18px;
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
        content: "" !important;
        display: table !important;
        clear: both !important;
    }

    .cardBlack.button>button{
        transform: scale(0.6)
    }
    .outline-none{
      outline: none;
    }
    body{
      overflow: auto !important;
    }
  </style>