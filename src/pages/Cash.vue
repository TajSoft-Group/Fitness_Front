<template>
  <div class="container">
    <div class="row">
      <div class="col position-relative">
        <div :class="{'search-input':searchActive.length>0}"  class="d-flex justify-content-between align-items-center search-block">
            <img src="@/assets/images/icons/search.png" alt="search">
            <input v-model="searchActive" type="text" id="searchInput" placeholder="Поиск по номеру телефона">
        </div>
        <div class="col">
          <div v-if="searchActive.length>0" class="users-block p-0  bg-gray search-result-block ">
            <table>
              <thead>
                <tr style="opacity: 0">
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td><router-link to="userpage">Азиза Султанова</router-link></td>
                    <td>92 000 00 00</td>
                    <td>Bronze</td>
                  </tr>
                  <tr>
                    <td><router-link to="userpage">Азиза Султанова</router-link></td>
                    <td>92 000 00 00</td>
                    <td>Bronze</td>
                  </tr>
                  <tr>
                    <td><router-link to="userpage">Азиза Султанова</router-link></td>
                    <td>92 000 00 00</td>
                    <td>Bronze</td>
                  </tr>
                  <tr>
                    <td><router-link to="userpage">Азиза Султанова</router-link></td>
                    <td>92 000 00 00</td>
                    <td>Bronze</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-6 p-4 statistics h-auto bg-gray">
          <div class="left d-flex align-items-center">
            <div class="teacher-img img-width-70 border-2px border-color-yellow">
              <img src="@/assets/images/avatar.jpg" >
            </div>
            <div>
                <div class="h4">АЗИЗА СУЛТАНОВА </div>
                <div class="d-flex justify-content-between ">
                  <div>
                    <div class="fs-5">+992 92 000 0000</div>
                    <div class="fs-5 color-yellow">Bronze</div>
                  </div>
                  <div class="ms-5 ps-5">
                    <div class="fs-5 ">500 TJS</div>
                    <div class="fs-5 ">20 баллов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 statistics bg-gray h-auto">
          <div class="d-flex justify-content-between ">
            <div>
              <div class="fs-5">Цена:</div>
              <div class="fs-5">Бонус:</div>
              <div class="h5">Итого:</div>
            </div>
            <div class="ms-5 ps-5">
              <div class="fs-5 ">333 c</div>
              <div class="fs-5 ">20</div>
              <div class="h5 ">113 c</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="users-block p-4">
          <table id="dataTable">
            <thead>
            <tr>
              <th class="col-3 text-start">Название </th>
              <th>Кол-во (шт)</th>
              <th>Цена</th>
              <th>Скидка</th>
              <th>Итого</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="col-2 d-flex ">1.<div class="text-start ms-2">Батончик протеиновый</div></td>
              <td><input class="bg-gray w-25 border-1px text-white" type="number" min="1" max="99" oninput="this.value = this.value.slice(0, 2)"  ></td>
              <td>18 сом</td>
              <td>-5%</td>
              <td>15 сом<br></td>
            </tr>
            <tr>
              <td class="col-2 d-flex ">1.<div class="text-start ms-2">Печенье протеиновое</div></td>
              <td><input class="bg-gray w-25 border-1px text-white" type="number" min="1" max="99" oninput="this.value = this.value.slice(0, 2)"  ></td>
              <td>18 сом</td>
              <td>-5%</td>
              <td>15 сом<br></td>
            </tr>
            <tr>
              <td class="col-2 d-flex ">1.<div class="text-start ms-2">Индивидуальный курс</div></td>
              <td></td>
              <td>150 сом</td>
              <td></td>
              <td>150 сом<br></td>
            </tr>
            <tr>
              <td class="col-2 d-flex ">1.<div class="text-start ms-2">Абонемент</div></td>
              <td><input class="bg-gray w-25 border-1px text-white" type="number" min="1" max="99" oninput="this.value = this.value.slice(0, 2)"  ></td>
              <td>150 сом</td>
              <td></td>
              <td>150 сом<br></td>
            </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between">
            <button class="button-type-1 ms-5">Отмена</button>
            <button class="button-type-1 bg-yellow me-5">Оплатить</button>
          </div>
        </div>
      </div>
      <div class="col-12 statistics bg-gray h-auto p-4">
        <div class="row">
          <h3>УСЛУГИ</h3>
          <div class="col product-catalog ">
            <button
                class="mt-3  py-2 me-3"
                v-for="(item, index) in buttonsCategory"
                :key="index"
                :class="{'active': isActive(index), 'add-button': item === '+'}"
                @click="toggleButton(index)"
            >{{ item }}</button>
          </div>
        </div>
        <div class="row">
          <div class="uslug-card  p-0 position-relative">
            <img src="@/assets/images/masaj.png">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">Массаж</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white ">/ 1 посещение
              </span>
              </div>
            </div>
          </div>
          <div class="uslug-card  p-0 position-relative">
            <img src="@/assets/images/sal.png">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">Солярий</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white ">/ 1 посещение
              </span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h3>КУРСЫ</h3>
          <div class="col product-catalog ">
            <button
                class="mt-3  py-2 me-3"
                v-for="(item, index) in buttonsCategory"
                :key="index"
                :class="{'active': isActive(index), 'add-button': item === '+'}"
                @click="toggleButton(index)"
            >{{ item }}</button>
          </div>
        </div>
        <div class="row">
          <div class="uslug-card  p-0 position-relative">
            <img src="@/assets/images/kurs.png">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">Индивидуальные</div>
              <div class="product-price color-yellow d-flex ">15 TJS
              </div>
            </div>
          </div>
          <div class="uslug-card  p-0 position-relative">
            <img src="@/assets/images/curs2.png">
            <div class="product-info ">
              <div class="product-title mb-2 border-color-yellow">Групповые</div>
              <div class="product-price color-yellow d-flex ">15 TJS
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col product-catalog ">
            <button
                class="mt-3  py-2 me-3"
                v-for="(item, index) in buttonsCategory"
                :key="index"
                :class="{'active': isActive(index), 'add-button': item === '+'}"
                @click="toggleButton(index)"
            >{{ item }}</button>
          </div>
        </div>
        <div class="row">
          <h3 class="pt-3">ПРОДУКТЫ</h3>
          <div class=" product-card p-0 position-relative">
            <img src="@/assets/images/woman.png">
            <div class="product-info ">
              <div class="product-title mb-2">Батончик протеиновый</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white "><s>22 c</s>
              </span>
              </div>
            </div>
          </div>
          <div class="product-card p-0 position-relative">
            <img src="@/assets/images/woman.png">
            <div class="product-info ">
              <div class="product-title mb-2">Батончик протеиновый</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white "><s>22 c</s>
              </span>
              </div>
            </div>
          </div>
          <div class="product-card p-0 position-relative">
            <img src="@/assets/images/woman.png">
            <div class="product-info ">
              <div class="product-title mb-2">Батончик протеиновый</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white "><s>22 c</s>
              </span>
              </div>
            </div>
          </div>
          <div class="product-card p-0 position-relative">
            <img src="@/assets/images/woman.png">
            <div class="product-info ">
              <div class="product-title mb-2">Батончик протеиновый</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white "><s>22 c</s>
              </span>
              </div>
            </div>
          </div>
          <div class="product-card p-0 position-relative">
            <img src="@/assets/images/woman.png">
            <div class="product-info ">
              <div class="product-title mb-2">Батончик протеиновый</div>
              <div class="product-price color-yellow d-flex ">15 TJS
                <span class="product-old-price text-white "><s>22 c</s>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      searchActive:'',
      buttonsCategory: ['Все', 'Батончики', 'Печенья', 'Коктейли'],
      activeButtons: [0],
    }
  },
  methods:{
    toggleButton(index) {
      const position = this.activeButtons.indexOf(index);
        if (position !== -1) {
          this.activeButtons.splice(position, 1);
        }
        else {
          this.activeButtons.push(index);
        }
    },
    isActive(index) {
      return this.activeButtons.includes(index);
    },
  }
}
</script>

<style lang="scss" scoped>
button.active {
  background-color: #c3ff00;
  color: #333;
}
</style>