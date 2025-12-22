<template>

  <div v-for="user in User">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="my-5"><router-link to="/clients" class="blocked"><img class="px-3 pb-2 blocked "
                src="@/assets/images/icons/Stroke.png"></router-link></div>
        </div>
      </div>
    </div>

    <!-- B A L A N C E //balance -->

    <section class="mb-4">
      <div class="container">
        <div class="row relative">
          <div :class="[payed ? 'show-false' : 'show-add']" class="added-user-message">
            <div class="result-true">
              <div class="result-true-card d-flex align-items-center">
                <img class="m-4 img-width-40" src="@/assets/images/icons/check_add.png" />
                <div class="result-true-content">
                  <div class="result-true-title">Счёт успешно пополнен !</div>
                  <div class="result-true-body mt-2">
                    {{ user.name }} ( Баланс: {{ user.cards[0].balance }} )
                  </div>
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
          <div class="user-page-header d-flex align-items-center justify-content-between">
            <div class="left d-flex align-items-center">
              <div class="user-photo">
                <img src="@/assets/images/avatar-user-empty.png" v-if="!user.img">
                <img :src="'https://api.mubingym.com/' + user.img" v-else="">
              </div>
              <div class="user-info">
                <div class="full-name">{{ user.name + ' ' + user.surname }}</div>
                <div class="phone">{{ user.username }}</div>
              </div>
            </div>
            <div class="right d-flex align-items-center text-center">
              <div class="item">
                <div class="age">Возраст</div>
                <div class="age-value">{{ new Date().getFullYear() - new Date(user.birthday).getFullYear() }}</div>
                <div class="line"></div>
              </div>
              <div class="item">
                <div class="age">Рост</div>
                <div class="age-value">{{ user.height ? user.height : '-' }}</div>
                <div class="line"></div>
              </div>
              <div class="item">
                <div class="age">Вес</div>
                <div class="age-value">{{ user.weight ? user.weight : '-' }}</div>
                <div class="line"></div>
              </div>
            </div>
            <div @click="UserConfigModal = !UserConfigModal" class="user-configs-modal-icon">
              <img src="@/assets/images/icons/nav-icon.png" height="26">
            </div>
            <div v-show="UserConfigModal" class="user-configs-modal ">
              <div v-if="false" class="user-configs-modal-item">
                <a href="#">Добавить услугу</a>
                <img src="@/assets/images/icons/plus.png" height="22">
              </div>
              <div @click="editedUser(), toggleModal('.user-change-modal')" class="user-configs-modal-item">
                <a class="change-user-btn">Ред. профиль</a>
                <img src="@/assets/images/icons/pen.png" height="22">
              </div>
              <div @click="toggleModal('.add-money-modal')" class="user-configs-modal-item">
                <a class="add-money-btn">Пополнить счёт</a>
                <img src="@/assets/images/icons/add-money.png" height="22">
              </div>
              <!-- <div @click="toggleModal('.user-block-modal')" class="user-configs-modal-item">
              <a class="block-user-btn">Заблокировать</a>
              <img src="@/assets/images/icons/ban.png" height="22">
            </div> -->
              <div @click="toggleModal('.user-delete-modal')" class="user-configs-modal-item red">
                <a class="delete-user-btn">Удалить</a>
                <img src="@/assets/images/icons/delete.png" height="22">
              </div>
              <div v-if="false" @click="toggleModal('.take-money-modal')" class="user-configs-modal-item">
                <a class="take-money-btn">Снять деньги</a>
                <img src="@/assets/images/icons/take-money.png" height="22">
              </div>
              <div v-if="false" @click="toggleModal('.up-card-modal')" class="user-configs-modal-item">
                <a class="up-card-btn">Повысить карту</a>
                <img src="@/assets/images/icons/up.png" height="22">
              </div>
              <div v-if="false" @click="toggleModal('.down-card-modal')" class="user-configs-modal-item">
                <a class="down-card-btn">Понизить карту</a>
                <img src="@/assets/images/icons/down.png" height="22">
              </div>
              <div v-if="false" @click="toggleModal('.pin-card-modal')" class="user-configs-modal-item yellow">
                <a class="pin-card-btn">Закрепить карту</a>
                <img src="@/assets/images/icons/crown.png" height="22">
              </div>
              <div v-if="false" @click="toggleModal('.unpin-card-modal')" class="user-configs-modal-item yellow">
                <a class="unpin-card-btn">Открепить карту</a>
                <img src="@/assets/images/icons/crown.png" height="22">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="toggleModal('.user-change-modal')"
      class="add-user-modal user-change-modal  d-flex justify-content-center align-items-center d-none">
      <div @click.stop class="content">
        <h5>РЕДАКТИРОВАНИЕ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label for="name">Имя</label>
            <input type="text" placeholder="Имя" id="name" v-model="formData.name" required>
          </div>
          <div class="form mt-3">
            <label for="surname">Фамилия</label>
            <input type="text" placeholder="Фамилия" id="surname" v-model="formData.surname" required>
          </div>
          <div class="form mt-3">
            <label for="password">Пароль</label>
            <input type="password" id="password" v-model="formData.password" required>
          </div>
          <div class="form mt-3">
            <label for="date">Дата рождения</label>
            <input type="date" v-model="formData.birthday" required>
          </div>

          <div class="menu-type-2 d-flex justify-content-between pt-3 mt-3">
            <div class="form-recipients">
              <input :checked="user.gender === '1'" type="radio" id="man" name="recipients" value="Мужчина" required>
              <label for="man">Мужчина</label>
            </div>
            <div class="form-recipients">
              <input :checked="user.gender === '2'" type="radio" id="woman" name="recipients" value="Женщина" required>
              <label for="woman">Женщина</label>
            </div>
          </div>

          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont" @click="toggleModal('.user-change-modal')">Отмена</button>
              <button class="submit" type="button"
                @click="saveUser(), toggleModal('.user-change-modal')">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="toggleModal('.user-delete-modal')"
      class="add-user-modal user-delete-modal d-none d-flex justify-content-center align-items-center" style="z-index: 10 !important;">
      <div @click.stop class="content">
        <div class="text-center mb-5">
          <img src="@/assets/images/icons/info.png" height="70px">
        </div>
        <h3 class="text-center">Вы действительно хотите удалить этого пользователя?</h3>
        <p class="text-center mt-3 text-gray">При удалении аккаунт пользователя все данные будут уничтожены</p>
        <div class="courses mt-3">
          <div class="cards-infos delete-user-info">
            <div class="info ms-5 ps-4 pe-0 me-5">
              <div class="d-flex justify-content-between" v-for="(service, index) in user.services">
                <div>{{ service.service_name }}:</div>
                <div>{{ service.count }}</div>
              </div>
            </div>
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont" @click="toggleModal('.user-delete-modal')">Отмена</button>
              <button class="submit red" @click="deleteUser" type="button">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div @click="toggleModal('.user-block-modal')"
      class="add-user-modal user-block-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <div class="text-center mb-5">
          <img src="@/assets/images/icons/info.png" height="70px">
        </div>
        <h3 class="text-center">Вы действительно
          хотите заблокировать этого
          пользователя?</h3>
        <!--      <div class="form mt-3">-->
        <!--        <label for="because">Причина блокировки</label>-->
        <!--        <textarea  name="because" id="because" cols="30" rows="6" placeholder="Укажите причину блокировки" maxlength="150"></textarea>-->
        <!--      </div>-->
        <div class="courses mt-3">
          <div class="cards-infos delete-user-info">
            <div class="info ms-5 ps-4 pe-0 me-5">
              <div class="d-flex justify-content-between" v-for="(service, index) in user.services">
                <div>{{ service.service_name }}:</div>
                <div>{{ service.count }}</div>
              </div>
            </div>
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont" @click="toggleModal('.user-block-modal')">Отмена</button>
              <button class="submit red block-btn" type="button" @click="disableUser()">Блокировать</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div @click="toggleModal('.add-money-modal')"
      class="add-user-modal add-money-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>ПОПОЛНИТЬ КАРТУ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label for="sum">Сумма</label>
            <input v-model="payCash" type="number" placeholder="Введите сумму" id="sum">
          </div>

          <div class="info mt-5">
            <div class="d-flex justify-content-between">
              <div>На счету</div>
              <div>{{ user.cards[0].balance }} TJS</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Бонусов</div>
              <div>{{ user.cards[1].balance }}</div>
            </div>
          </div>
          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button @click="toggleModal('.add-money-modal')" class="dont">Отмена</button>
              <button @click="payment(payCash)" class="submit" type="button">Пополнить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" @click="toggleModal('.take-money-modal')"
      class="add-user-modal take-money-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>СНЯТЬ НАЛИЧНЫЕ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label for="take-sum">Сумма</label>
            <input type="text" placeholder="Введите сумму" id="take-sum">
          </div>

          <div class="form mt-3">
            <label for="becauses">Причина снятия</label>
            <textarea name="because" id="becauses" cols="30" rows="6" placeholder="Укажите причину снятия наличных"
              maxlength="150"></textarea>
          </div>

          <div class="info mt-5">
            <div class="d-flex justify-content-between">
              <div>На счету</div>
              <div>{{ user.cards[0].balance }} TJS</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Бонусов</div>
              <div>{{ user.cards[1].balance }}</div>
            </div>
          </div>
          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Снять</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" @click="toggleModal('.up-card-modal')"
      class="add-user-modal up-card-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>ПОВЫСИТЬ КАРТУ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label>Причина повышения</label>
            <input type="text" placeholder="Укажите причину повышения карты">
          </div>
          <div class="form mt-3">
            <textarea name="because" cols="30" rows="6" placeholder="Укажите причину повышения карты"
              maxlength="150"></textarea>
          </div>


          <div class="form relative">
            <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
            <label>Карта</label>
            <select>
              <option value="" disabled selected>Выберите карту</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Повысить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" @click="toggleModal('.down-card-modal')"
      class="add-user-modal down-card-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>ПОНИЗИТЬ КАРТУ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label>Причина понижения</label>
            <input type="text" placeholder="Укажите причину понижения карты">
          </div>
          <div class="form mt-3">
            <textarea name="because" cols="30" rows="6" placeholder="Укажите причину понижения карты"
              maxlength="150"></textarea>
          </div>


          <div class="form relative">
            <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
            <label>Карта</label>
            <select>
              <option value="" disabled selected>Выберите карту</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Понизить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" @click="toggleModal('.pin-card-modal')"
      class="add-user-modal pin-card-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>ЗАКРЕПИТЬ КАРТУ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label>Причина закрепления</label>
            <input type="text" placeholder="Укажите причину закрепления карты">
          </div>
          <div class="form mt-3">
            <textarea name="because" cols="30" rows="6" placeholder="Описание для клиента" maxlength="150"></textarea>
          </div>

          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Закрепить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" @click="toggleModal('.unpin-card-modal')"
      class="add-user-modal unpin-card-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <h5>ОТКРЕПИТЬ КАРТУ</h5>
        <div class="courses mt-3">
          <div class="form mt-3">
            <label>Причина открепления</label>
            <input type="text" placeholder="Укажите причину открепления карты">
          </div>
          <div class="form mt-3">
            <textarea name="because" cols="30" rows="6" placeholder="Описание для клиента" maxlength="150"></textarea>
          </div>

          <div class="cards-infos">
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Открепить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container user-page-cards">
      <div class="row">
        <div class="col-3" v-for="(service, index) in user.services">
          <div class="bg-gray card-block h-100 m-0">
            <div class="card-left">
              <div class="h5 mh-40">{{ service.service_name }}</div>
              <div class="card-quantity mb-0 text-center color-yellow">{{ service.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h5 class="page-title credit-cards-title">Карты</h5>
        </div>
      </div>
      <!--    @click="toggleModal('.cards-modal')"-->
      <div class="row">
        <div class="col-6">
          <div v-if="user.cards.length > 0" class="credit-card">
            <img src="@/assets/images/card.png">
            <div class="info">
              <div class="type">{{ user.cards[0].name }}</div>
              <div class="price">{{ user.cards[0].balance }} TJS</div>
              <div class="bottom">
                <div class="">{{ user.name + ' ' + user.surname }}</div>
                <div class="">{{ user.cards[0].card_number }}</div>
              </div>
            </div>
          </div>
          <div v-else class="h3 color-yellow ms-4">карты отсутствуют</div>
        </div>
        <div class="col-6">
          <div v-if="user.cards.length > 0" class="credit-card">
            <img src="@/assets/images/card.png">
            <div class="info ">
              <div class="bonus-title">{{ user.cards[1].balance }} БОНУСОВ</div>
              <div class="bottom">
                <div class="">{{ user.name + ' ' + user.surname }}</div>
                <div class="">{{ user.cards[1].card_number }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" @click="toggleModal('.cards-modal')"
      class="cards-modal d-none d-flex justify-content-center align-items-center">
      <div @click.stop class="content">
        <div class="cards-header d-flex justify-content-between align-items-center">
          <div class="titles">
            <div>НА СЧЕТУ</div>
            <div>БОНУСОВ</div>
          </div>
          <div class="results">
            <div>500 TJS</div>
            <div>100</div>
          </div>
        </div>
        <div class="choose-type d-flex align-items-center">
          <div :class="{ checked: uslugi }" @click="uslugi = !uslugi" class=" uslugi-btn">Услуги</div>
          <div :class="{ checked: !uslugi }" @click="uslugi = !uslugi" class="courses-btn">Курсы</div>
        </div>
        <div v-show="uslugi" class="uslugis">
          <div class="form relative">
            <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
            <label for="usluga">Услуга</label>
            <select id="usluga">
              <option value="" disabled selected>Услуга</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div class="form mt-3">
            <label for="quantity">Количество</label>
            <input type="text" placeholder="Количество" id="quantity">
          </div>
          <div class="form mt-3">
            <label for="bonuses">Оплата бонусами</label>
            <input type="text" placeholder="Бонусы" id="bonuses">
          </div>
          <div class="cards-infos">
            <div class="d-flex justify-content-between align-items-center">
              <div>Сумма без скидки</div>
              <div>0.00 TJS</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>Сумма скидки</div>
              <div>0.00 TJS</div>
            </div>
            <div>Оплата бонусами</div>
            <div>Получение бонусов</div>
            <div class="itog d-flex justify-content-between align-items-center">
              <div>ИТОГО</div>
              <div>=0.00 TJS</div>
            </div>
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Добавить</button>
            </div>
          </div>
        </div>
        <div v-show="uslugi === false" class="coursess ">
          <div class="form relative">
            <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
            <label for="uslugas">Курсы</label>
            <select id="uslugas">
              <option value="" disabled selected>Курсы</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div class="form mt-3">
            <label for="bonusess">Оплата бонусами</label>
            <input type="text" placeholder="Бонусы" id="bonusess">
          </div>
          <div class="cards-infos">
            <div class="d-flex justify-content-between align-items-center">
              <div>Сумма без скидки</div>
              <div>0.00 TJS</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>Сумма скидки</div>
              <div>0.00 TJS</div>
            </div>
            <div>Оплата бонусами</div>
            <div>Получение бонусов</div>
            <div class="itog d-flex justify-content-between align-items-center">
              <div>ИТОГО</div>
              <div>=0.00 TJS</div>
            </div>
            <div class="d-flex justify-content-between add-user-buttons">
              <button class="dont">Отмена</button>
              <button class="submit" type="button">Добавить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="container">
        <div class="row">
          <h5 class="page-title credit-cards-title">Транзакции</h5>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">Основная карта</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">Бонусная карта</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="row py-5">
                <div v-if="mainCardT.length == 0">
                  Нету транзакций по основной карте
                </div>
                <div class="col-md-6" v-for="(transaction, maincardIdx) in mainCardT">
                  <div class="user-page-card user-page-card-bottom h-auto">
                    <div class="d-flex head d-flex align-items-center mb-3">
                      <div class="img border-0">
                        <svg v-if="transaction.payment_type !== 'cash' && transaction.payment_type !== 'refill'"
                          xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 70 70" fill="none">
                          <circle cx="35" cy="35" r="35" fill="#FD3E3E" />
                          <path
                            d="M42.2465 34.6233C42.2465 31.7311 41.3889 28.9038 39.782 26.499C38.1752 24.0942 35.8914 22.2199 33.2193 21.1131C30.5473 20.0063 27.607 19.7167 24.7704 20.281C21.9338 20.8452 19.3282 22.238 17.2831 24.2831C15.238 26.3282 13.8452 28.9338 13.281 31.7704C12.7167 34.607 13.0063 37.5473 14.1131 40.2193C15.2199 42.8914 17.0942 45.1752 19.499 46.782C21.9038 48.3889 24.7311 49.2465 27.6233 49.2465C31.5016 49.2465 35.2211 47.7058 37.9635 44.9635C40.7058 42.2211 42.2465 38.5016 42.2465 34.6233ZM28.8685 40.0613V40.7643C28.8685 41.2231 28.7209 41.3707 28.2621 41.3707H27.0178C26.5784 41.3707 26.4114 41.2231 26.4114 40.7643V40.0929C24.8058 39.8468 23.7574 39.0445 23.2477 37.7008C23.1001 37.2749 23.2465 36.9802 23.6871 36.8167L24.8014 36.423C25.2769 36.2473 25.5045 36.3413 25.7189 36.8167C25.9825 37.4881 26.5872 37.8159 27.5213 37.8159C28.7666 37.8159 29.3888 37.4715 29.3888 36.7667C29.3888 36.1119 28.7499 35.8984 27.4554 35.7675C26.5379 35.6523 26.0625 35.6031 25.2268 35.2762C24.8525 35.1574 24.5069 34.9623 24.2118 34.7032C23.7038 34.2638 23.2776 33.4255 23.2776 32.3612C23.2776 30.6405 24.3752 29.4612 26.407 29.1343V28.462C26.407 28.0226 26.5705 27.8723 27.0134 27.8723H28.2586C28.7174 27.8723 28.865 28.0199 28.865 28.462V29.1343C30.192 29.3636 31.1262 30.0676 31.6824 31.2636C31.9285 31.7223 31.8134 31.9666 31.3054 32.1811L30.1797 32.6899C29.7403 32.8867 29.5241 32.8208 29.278 32.3621C28.9502 31.7232 28.5249 31.4121 27.6241 31.4121C26.4615 31.4121 25.9694 31.6582 25.9694 32.3621C25.9694 32.9685 26.6575 33.1978 27.9185 33.3288C28.5483 33.3806 29.1726 33.4847 29.7851 33.6399C30.0974 33.7202 30.3958 33.8473 30.6701 34.0169C31.4074 34.4563 32.1113 35.3105 32.0463 36.7201C32.0471 38.4724 30.9003 39.6852 28.8685 40.0613Z"
                            fill="white" />
                          <path
                            d="M43.3715 20C41.4409 19.9982 39.5291 20.38 37.7472 21.1231C39.8434 22.6947 41.5449 24.7329 42.7167 27.0761C43.8886 29.4194 44.4987 32.0033 44.4987 34.6233C44.4987 37.2432 43.8886 39.8271 42.7167 42.1704C41.5449 44.5136 39.8434 46.5518 37.7472 48.1234C39.7445 48.9563 41.9018 49.3356 44.0635 49.2339C46.2251 49.1321 48.3372 48.5519 50.2475 47.5351C52.1578 46.5182 53.8185 45.0901 55.1101 43.3537C56.4016 41.6173 57.2916 39.6159 57.7161 37.4939C58.1405 35.3719 58.0886 33.1821 57.5643 31.0826C57.04 28.983 56.0562 27.026 54.684 25.3527C53.3117 23.6793 51.5852 22.3314 49.629 21.4061C47.6728 20.4807 45.5356 20.0011 43.3715 20.0018V20Z"
                            fill="white" />
                        </svg>
                        <svg v-if="transaction.payment_type === 'cash'" xmlns="http://www.w3.org/2000/svg" width="45"
                          height="45" viewBox="0 0 70 70" fill="none">
                          <circle cx="35" cy="35" r="35" fill="#FD3E3E" />
                          <path
                            d="M55 28V30H53C51.6744 29.9986 50.4034 29.4713 49.4661 28.5339C48.5287 27.5966 48.0014 26.3256 48 25V23H50C51.3249 23.0039 52.5944 23.532 53.5312 24.4688C54.468 25.4056 54.9961 26.6751 55 28ZM48 45V47H50C51.3249 46.9961 52.5944 46.468 53.5312 45.5312C54.468 44.5944 54.9961 43.3249 55 42V40H53C51.6744 40.0014 50.4034 40.5287 49.4661 41.4661C48.5287 42.4034 48.0014 43.6744 48 45ZM22 25V23H20C18.6751 23.0039 17.4056 23.532 16.4688 24.4688C15.532 25.4056 15.0039 26.6751 15 28V30H17C18.3256 29.9986 19.5966 29.4713 20.5339 28.5339C21.4713 27.5966 21.9986 26.3256 22 25ZM17 40H15V42C15.0039 43.3249 15.532 44.5944 16.4688 45.5312C17.4056 46.468 18.6751 46.9961 20 47H22V45C21.9986 43.6744 21.4713 42.4034 20.5339 41.4661C19.5966 40.5287 18.3256 40.0014 17 40ZM36.7188 34.6578C36.5638 34.562 36.3952 34.4904 36.2188 34.4453C35.8729 34.3576 35.5204 34.2988 35.1648 34.2695C34.4523 34.1953 34.0641 34.0664 34.0641 33.7227C34.0641 33.325 34.3414 33.1859 35.0016 33.1859C35.5102 33.1859 35.7508 33.3617 35.9391 33.7227C36.0781 33.9812 36.1984 34.0187 36.4477 33.9078L37.0859 33.6211C37.3727 33.5008 37.4375 33.3625 37.2984 33.1031C36.9859 32.4281 36.457 32.0305 35.7078 31.9008V31.5219C35.7078 31.2719 35.625 31.1891 35.3656 31.1891H34.6625C34.4125 31.1891 34.3203 31.2727 34.3203 31.5219V31.9008C33.1734 32.0859 32.5539 32.7516 32.5539 33.7227C32.5539 34.3234 32.7945 34.7953 33.0813 35.0453C33.2481 35.1915 33.4433 35.3016 33.6547 35.3688C34.1234 35.5539 34.3945 35.5812 34.9125 35.6461C35.643 35.7203 36.0063 35.8406 36.0063 36.2102C36.0063 36.6078 35.6547 36.8023 34.9516 36.8023C34.4242 36.8023 34.082 36.6172 33.9359 36.2383C33.8156 35.9703 33.6859 35.9148 33.418 36.0164L32.7891 36.2383C32.5396 36.331 32.4565 36.4974 32.5398 36.7375C32.8266 37.4961 33.4188 37.9492 34.3242 38.0875V38.4664C34.3242 38.7258 34.4172 38.8086 34.6664 38.8086H35.3695C35.6281 38.8086 35.7117 38.7258 35.7117 38.4664V38.0703C36.8586 37.8578 37.5086 37.1734 37.5086 36.1836C37.5352 35.3906 37.1367 34.9078 36.7188 34.6578ZM52.9977 32.0016H55V38.0016H53C51.1438 38.0016 49.3635 38.7388 48.0508 40.0513C46.7381 41.3637 46.0004 43.1438 46 45V47H24V45C24 43.1435 23.2625 41.363 21.9497 40.0503C20.637 38.7375 18.8565 38 17 38H15V32H17C18.8565 32 20.637 31.2625 21.9497 29.9497C23.2625 28.637 24 26.8565 24 25V23H46V25C46 26.8565 46.7375 28.637 48.0503 29.9497C49.363 31.2625 51.1435 32 53 32L52.9977 32.0016ZM43 35C43 33.4177 42.5308 31.871 41.6518 30.5554C40.7727 29.2398 39.5233 28.2145 38.0615 27.609C36.5997 27.0035 34.9911 26.845 33.4393 27.1537C31.8874 27.4624 30.462 28.2243 29.3431 29.3431C28.2243 30.462 27.4624 31.8874 27.1537 33.4393C26.845 34.9911 27.0035 36.5997 27.609 38.0615C28.2145 39.5233 29.2398 40.7727 30.5554 41.6518C31.871 42.5308 33.4177 43 35 43C37.1217 43 39.1566 42.1571 40.6569 40.6569C42.1571 39.1566 43 37.1217 43 35Z"
                            fill="white" />
                        </svg>
                        <svg v-if="transaction.payment_type === 'refill'" xmlns="http://www.w3.org/2000/svg" width="45"
                          height="45" viewBox="0 0 70 70" fill="none">
                          <circle cx="35" cy="35" r="35" fill="#D0FD3E" />
                          <path
                            d="M55 28V30H53C51.6744 29.9986 50.4034 29.4713 49.4661 28.5339C48.5287 27.5966 48.0014 26.3256 48 25V23H50C51.3249 23.0039 52.5944 23.532 53.5312 24.4688C54.468 25.4056 54.9961 26.6751 55 28ZM48 45V47H50C51.3249 46.9961 52.5944 46.468 53.5312 45.5312C54.468 44.5944 54.9961 43.3249 55 42V40H53C51.6744 40.0014 50.4034 40.5287 49.4661 41.4661C48.5287 42.4034 48.0014 43.6744 48 45ZM22 25V23H20C18.6751 23.0039 17.4056 23.532 16.4688 24.4688C15.532 25.4056 15.0039 26.6751 15 28V30H17C18.3256 29.9986 19.5966 29.4713 20.5339 28.5339C21.4713 27.5966 21.9986 26.3256 22 25ZM17 40H15V42C15.0039 43.3249 15.532 44.5944 16.4688 45.5312C17.4056 46.468 18.6751 46.9961 20 47H22V45C21.9986 43.6744 21.4713 42.4034 20.5339 41.4661C19.5966 40.5287 18.3256 40.0014 17 40ZM36.7188 34.6578C36.5638 34.562 36.3952 34.4904 36.2188 34.4453C35.8729 34.3576 35.5204 34.2988 35.1648 34.2695C34.4523 34.1953 34.0641 34.0664 34.0641 33.7227C34.0641 33.325 34.3414 33.1859 35.0016 33.1859C35.5102 33.1859 35.7508 33.3617 35.9391 33.7227C36.0781 33.9812 36.1984 34.0187 36.4477 33.9078L37.0859 33.6211C37.3727 33.5008 37.4375 33.3625 37.2984 33.1031C36.9859 32.4281 36.457 32.0305 35.7078 31.9008V31.5219C35.7078 31.2719 35.625 31.1891 35.3656 31.1891H34.6625C34.4125 31.1891 34.3203 31.2727 34.3203 31.5219V31.9008C33.1734 32.0859 32.5539 32.7516 32.5539 33.7227C32.5539 34.3234 32.7945 34.7953 33.0813 35.0453C33.2481 35.1915 33.4433 35.3016 33.6547 35.3688C34.1234 35.5539 34.3945 35.5812 34.9125 35.6461C35.643 35.7203 36.0063 35.8406 36.0063 36.2102C36.0063 36.6078 35.6547 36.8023 34.9516 36.8023C34.4242 36.8023 34.082 36.6172 33.9359 36.2383C33.8156 35.9703 33.6859 35.9148 33.418 36.0164L32.7891 36.2383C32.5396 36.331 32.4565 36.4974 32.5398 36.7375C32.8266 37.4961 33.4188 37.9492 34.3242 38.0875V38.4664C34.3242 38.7258 34.4172 38.8086 34.6664 38.8086H35.3695C35.6281 38.8086 35.7117 38.7258 35.7117 38.4664V38.0703C36.8586 37.8578 37.5086 37.1734 37.5086 36.1836C37.5352 35.3906 37.1367 34.9078 36.7188 34.6578ZM52.9977 32.0016H55V38.0016H53C51.1438 38.0016 49.3635 38.7388 48.0508 40.0513C46.7381 41.3637 46.0004 43.1438 46 45V47H24V45C24 43.1435 23.2625 41.363 21.9497 40.0503C20.637 38.7375 18.8565 38 17 38H15V32H17C18.8565 32 20.637 31.2625 21.9497 29.9497C23.2625 28.637 24 26.8565 24 25V23H46V25C46 26.8565 46.7375 28.637 48.0503 29.9497C49.363 31.2625 51.1435 32 53 32L52.9977 32.0016ZM43 35C43 33.4177 42.5308 31.871 41.6518 30.5554C40.7727 29.2398 39.5233 28.2145 38.0615 27.609C36.5997 27.0035 34.9911 26.845 33.4393 27.1537C31.8874 27.4624 30.462 28.2243 29.3431 29.3431C28.2243 30.462 27.4624 31.8874 27.1537 33.4393C26.845 34.9911 27.0035 36.5997 27.609 38.0615C28.2145 39.5233 29.2398 40.7727 30.5554 41.6518C31.871 42.5308 33.4177 43 35 43C37.1217 43 39.1566 42.1571 40.6569 40.6569C42.1571 39.1566 43 37.1217 43 35Z"
                            fill="black" />
                        </svg>
                      </div>
                      <div class="h5" v-if="transaction.payment_type !== 'refill'">Покупка</div>
                      <div class="h5" v-else="">Пополнение</div>
                    </div>
                    <div class="d-flex bottom justify-content-between align-items-end">
                      <div class="prices">
                        <p v-if="transaction.payment_type === 'refill'" class="h6">Пополнение счёта на сумму {{
                          transaction.payment }} TJS</p>
                        <p v-if="transaction.payment_type === 'cash'" class="h6">Покупка товаров наличными на сумму {{
                          transaction.payment }} TJS</p>
                        <p v-if="transaction.payment_type === 'purchase'" class="h6"> Покупка товаров со счёта на сумму
                          {{
                            transaction.payment }} TJS</p>
                        <p v-if="transaction.payment_type === 'withdrawal_from_bonus'" class="h6"> Покупка товаров
                          бонусами на сумму {{ transaction.payment }} TJS</p>
                      </div>
                      <div class="dates">
                        <div>{{ formatDate(transaction.create_add) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="row py-5">
                <div v-if="mainCardT.length == 0">
                  Нету транзакций по бонусной карте
                </div>
                <div class="col-md-6" v-for="(transaction, secondcardIdx) in secondCardT">
                  <div class="user-page-card user-page-card-bottom h-auto">
                    <div class="d-flex head d-flex align-items-center mb-3">
                      <div class="img border-0">
                        <svg v-if="transaction.payment_type === 'withdrawal_from_bonus'"
                          xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 70 70" fill="none">
                          <circle cx="35" cy="35" r="35" fill="#FD3E3E" />
                          <path
                            d="M42.2465 34.6233C42.2465 31.7311 41.3889 28.9038 39.782 26.499C38.1752 24.0942 35.8914 22.2199 33.2193 21.1131C30.5473 20.0063 27.607 19.7167 24.7704 20.281C21.9338 20.8452 19.3282 22.238 17.2831 24.2831C15.238 26.3282 13.8452 28.9338 13.281 31.7704C12.7167 34.607 13.0063 37.5473 14.1131 40.2193C15.2199 42.8914 17.0942 45.1752 19.499 46.782C21.9038 48.3889 24.7311 49.2465 27.6233 49.2465C31.5016 49.2465 35.2211 47.7058 37.9635 44.9635C40.7058 42.2211 42.2465 38.5016 42.2465 34.6233ZM28.8685 40.0613V40.7643C28.8685 41.2231 28.7209 41.3707 28.2621 41.3707H27.0178C26.5784 41.3707 26.4114 41.2231 26.4114 40.7643V40.0929C24.8058 39.8468 23.7574 39.0445 23.2477 37.7008C23.1001 37.2749 23.2465 36.9802 23.6871 36.8167L24.8014 36.423C25.2769 36.2473 25.5045 36.3413 25.7189 36.8167C25.9825 37.4881 26.5872 37.8159 27.5213 37.8159C28.7666 37.8159 29.3888 37.4715 29.3888 36.7667C29.3888 36.1119 28.7499 35.8984 27.4554 35.7675C26.5379 35.6523 26.0625 35.6031 25.2268 35.2762C24.8525 35.1574 24.5069 34.9623 24.2118 34.7032C23.7038 34.2638 23.2776 33.4255 23.2776 32.3612C23.2776 30.6405 24.3752 29.4612 26.407 29.1343V28.462C26.407 28.0226 26.5705 27.8723 27.0134 27.8723H28.2586C28.7174 27.8723 28.865 28.0199 28.865 28.462V29.1343C30.192 29.3636 31.1262 30.0676 31.6824 31.2636C31.9285 31.7223 31.8134 31.9666 31.3054 32.1811L30.1797 32.6899C29.7403 32.8867 29.5241 32.8208 29.278 32.3621C28.9502 31.7232 28.5249 31.4121 27.6241 31.4121C26.4615 31.4121 25.9694 31.6582 25.9694 32.3621C25.9694 32.9685 26.6575 33.1978 27.9185 33.3288C28.5483 33.3806 29.1726 33.4847 29.7851 33.6399C30.0974 33.7202 30.3958 33.8473 30.6701 34.0169C31.4074 34.4563 32.1113 35.3105 32.0463 36.7201C32.0471 38.4724 30.9003 39.6852 28.8685 40.0613Z"
                            fill="white" />
                          <path
                            d="M43.3715 20C41.4409 19.9982 39.5291 20.38 37.7472 21.1231C39.8434 22.6947 41.5449 24.7329 42.7167 27.0761C43.8886 29.4194 44.4987 32.0033 44.4987 34.6233C44.4987 37.2432 43.8886 39.8271 42.7167 42.1704C41.5449 44.5136 39.8434 46.5518 37.7472 48.1234C39.7445 48.9563 41.9018 49.3356 44.0635 49.2339C46.2251 49.1321 48.3372 48.5519 50.2475 47.5351C52.1578 46.5182 53.8185 45.0901 55.1101 43.3537C56.4016 41.6173 57.2916 39.6159 57.7161 37.4939C58.1405 35.3719 58.0886 33.1821 57.5643 31.0826C57.04 28.983 56.0562 27.026 54.684 25.3527C53.3117 23.6793 51.5852 22.3314 49.629 21.4061C47.6728 20.4807 45.5356 20.0011 43.3715 20.0018V20Z"
                            fill="white" />
                        </svg>
                        <svg v-if="transaction.payment_type !== 'withdrawal_from_bonus'"
                          xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 70 70" fill="none">
                          <circle cx="35" cy="35" r="35" fill="#D0FD3E" />
                          <path
                            d="M42.2465 34.6233C42.2465 31.7311 41.3889 28.9038 39.782 26.499C38.1752 24.0942 35.8914 22.2199 33.2193 21.1131C30.5473 20.0063 27.607 19.7167 24.7704 20.281C21.9338 20.8452 19.3282 22.238 17.2831 24.2831C15.238 26.3282 13.8452 28.9338 13.281 31.7704C12.7167 34.607 13.0063 37.5473 14.1131 40.2193C15.2199 42.8914 17.0942 45.1752 19.499 46.782C21.9038 48.3889 24.7311 49.2465 27.6233 49.2465C31.5016 49.2465 35.2211 47.7058 37.9635 44.9635C40.7058 42.2211 42.2465 38.5016 42.2465 34.6233ZM28.8685 40.0613V40.7643C28.8685 41.2231 28.7209 41.3707 28.2621 41.3707H27.0178C26.5784 41.3707 26.4114 41.2231 26.4114 40.7643V40.0929C24.8058 39.8468 23.7574 39.0445 23.2477 37.7008C23.1001 37.2749 23.2465 36.9802 23.6871 36.8167L24.8014 36.423C25.2769 36.2473 25.5045 36.3413 25.7189 36.8167C25.9825 37.4881 26.5872 37.8159 27.5213 37.8159C28.7666 37.8159 29.3888 37.4715 29.3888 36.7667C29.3888 36.1119 28.7499 35.8984 27.4554 35.7675C26.5379 35.6523 26.0625 35.6031 25.2268 35.2762C24.8525 35.1574 24.5069 34.9623 24.2118 34.7032C23.7038 34.2638 23.2776 33.4255 23.2776 32.3612C23.2776 30.6405 24.3752 29.4612 26.407 29.1343V28.462C26.407 28.0226 26.5705 27.8723 27.0134 27.8723H28.2586C28.7174 27.8723 28.865 28.0199 28.865 28.462V29.1343C30.192 29.3636 31.1262 30.0676 31.6824 31.2636C31.9285 31.7223 31.8134 31.9666 31.3054 32.1811L30.1797 32.6899C29.7403 32.8867 29.5241 32.8208 29.278 32.3621C28.9502 31.7232 28.5249 31.4121 27.6241 31.4121C26.4615 31.4121 25.9694 31.6582 25.9694 32.3621C25.9694 32.9685 26.6575 33.1978 27.9185 33.3288C28.5483 33.3806 29.1726 33.4847 29.7851 33.6399C30.0974 33.7202 30.3958 33.8473 30.6701 34.0169C31.4074 34.4563 32.1113 35.3105 32.0463 36.7201C32.0471 38.4724 30.9003 39.6852 28.8685 40.0613Z"
                            fill="black" />
                          <path
                            d="M43.3715 20C41.4409 19.9982 39.5291 20.38 37.7472 21.1231C39.8434 22.6947 41.5449 24.7329 42.7167 27.0761C43.8886 29.4194 44.4987 32.0033 44.4987 34.6233C44.4987 37.2432 43.8886 39.8271 42.7167 42.1704C41.5449 44.5136 39.8434 46.5518 37.7472 48.1234C39.7445 48.9563 41.9018 49.3356 44.0635 49.2339C46.2251 49.1321 48.3372 48.5519 50.2475 47.5351C52.1578 46.5182 53.8185 45.0901 55.1101 43.3537C56.4016 41.6173 57.2916 39.6159 57.7161 37.4939C58.1405 35.3719 58.0886 33.1821 57.5643 31.0826C57.04 28.983 56.0562 27.026 54.684 25.3527C53.3117 23.6793 51.5852 22.3314 49.629 21.4061C47.6728 20.4807 45.5356 20.0011 43.3715 20.0018V20Z"
                            fill="black" />
                        </svg>
                      </div>
                      <div class="h5" v-if="'withdrawal_from_bonus' === transaction.payment_type">
                        Покупка
                      </div>
                      <div class="h5" v-if="'withdrawal_from_bonus' !== transaction.payment_type">Бонусы за покупку
                      </div>
                    </div>
                    <div class="d-flex bottom justify-content-between align-items-end">
                      <div class="prices">
                        <p v-if="transaction.payment_type === 'cash'" class="h6">Получены бонусы за покупку на сумму {{
                          transaction.payment }} TJS</p>
                        <p v-if="transaction.payment_type === 'withdrawal_from_bonus'" class="h6"> Покупка товаров
                          бонусами на сумму {{ transaction.payment }} TJS</p>
                      </div>
                      <div class="dates">
                        <div>{{ formatDate(transaction.create_add) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- Loading Overlay -->
  <div v-if="isLoading" class="overlay w-100 h-100 position-fixed top-0 start-0 z-3"
    style="background-color: rgba(0, 0, 0, 0.8);z-index: 99 !important;">
    <div class="position-fixed top-50 start-50 translate-middle z-3 text-center mt-2">
      <div class="spinner-border text-warning" v-show="!error" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="error-div" v-show="apiError">
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
      <div class="mt-2 text-light text-center" v-show="!apiError">{{ loadingText }}</div>
      <div class="mt-2 text-light text-center" v-show="apiError">Ошибка ! <p>{{ apiError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import get from "@/components/axios/get.js";
import Patch from "@/components/axios/Patch.js";
import posts from "@/components/axios/posts.js";
import deletes from "@/components/axios/deletes.js";
import gets from "@/components/axios/get.js";
import form_Data from "@/components/axios/formData";

export default {
  name: 'UserPage',
  data() {
    return {
      isLoading: true,
      apiError: null,
      payed: false,
      formData: {
        gender: '',
        name: '',
        surname: '',
        password: '',
        birthday: '',
      },
      mainCardT: "",
      secondCardT: "",
      payCash: '',
      User: '',
      uslugi: false,
      error: false,
      loading: true,
      UserConfigModal: false,
      modal: 'auto',
      modalSelector: ''
    }
  },
  watch: {
    modal() {
      this.updateToggleModal();
    }
  },
  methods: {
    async apiCall(requestFn) {
      this.isLoading = true;
      this.apiError = null;

      try {
        const response = await requestFn();
        return response;
      } catch (error) {
        console.error(error);

        this.apiError =
          error?.response?.data?.message ||
          'Произошла ошибка. Попробуйте позже';

        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateTime) {
      return dateTime.split(' ')[0];
    },
    updateToggleModal() {
      console.log(this.modal)
      if (this.modal === "auto") {
        document.querySelector(this.modalSelector).classList.add("d-none")
        document.body.style.overflow = this.modal
      } else {
        document.body.style.overflow = this.modal
        document.querySelector(this.modalSelector).classList.remove("d-none")
      }

    },
    toggleModal(modalSelector) {
      this.modal = this.modal === 'auto' ? 'hidden' : 'auto';
      this.modalSelector = modalSelector
    },
    async getInfo() {
      const response = await this.apiCall(() =>
        get(`https://api.mubingym.com/api/user/${this.id}`)
      );

      this.User = response.data;

      this.mainCardT = (
        await this.apiCall(() =>
          get(`https://api.mubingym.com/api/transaction_get/${this.User.user.cards[0].id}`)
        )
      ).data;

      this.secondCardT = (
        await this.apiCall(() =>
          get(`https://api.mubingym.com/api/transaction_get/${this.User.user.cards[1].id}`)
        )
      ).data;
    },
    editedUser() {
      const editUser = this.User.user
      this.formData = {
        ...{
          name: editUser.name,
          surname: editUser.surname,
          gender: editUser.gender,
          password: '',
          birthday: editUser.birthday,
        }
      }
    },
    saveUser() {
      this.isLoading = true;
      form_Data(`https://api.mubingym.com/api/user/update/${this.id}`, { ...this.formData })
        .then(response => {
          this.isLoading = false;
          this.UserConfigModal = false
          console.log(this.User)
          this.getInfo()
        })
        .catch(error => {
          this.error = error;
        });
    },
    disableUser() {
      gets(`https://api.mubingym.com/user/disable/${this.id}`)
        .then(response => {
          console.log(response);
        })
    },
    async deleteUser() {
      await this.apiCall(() =>
        deletes(`https://api.mubingym.com/user/delete/${this.id}`)
      );

      this.toggleModal('.user-delete-modal');
      this.$router.push('/clients');
    },
    payment(payCash) {
      this.isLoading = true;
      const pay = { owner_id: this.id, payment: payCash, payment_type: "refill" }
      posts('https://api.mubingym.com/api/payment', pay)
        .then(response => {
          this.payed = true;
          this.isLoading = false;
          console.log('ok', response)
          payCash = "";
          this.toggleModal('.add-money-modal')
          this.getInfo()
          setTimeout(() => { this.payed = false; }, 2000)
        })
        .catch(error => {
          this.toggleModal('.add-money-modal')
          this.error = error;
        });
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },

  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
.add-money-modal {
  z-index: 2 !important;
}

* {
  user-select: none;
}

.credit-card {
  height: 250px;
}

.info {
  width: 70%;
  top: 30px !important;
  bottom: 30px !important;
}

.info .type,
.info .price,
.info .bonus-title {
  font-size: 30px;
  line-height: normal;
}

.info .bottom {
  position: absolute;
  width: 100%;
  bottom: 0px;
}

.info .bottom>div:first-of-type {
  font-size: 24px;
  font-weight: 500;
}

.info .bottom>div:last-of-type {
  font-size: 20px;
  color: #A6A5A3;
}

.nav-tabs .nav-link.active {
  background-color: #D0FD3E !important;
  border-color: #D0FD3E;
}

.nav-tabs .nav-link {
  color: #fff;
  font-weight: bolder;
}


.error-div {
  text-align: center;
}

.error-div svg {
  width: 35px;
  height: 35px;
}

.error-toast {
  content: "";
  width: 440px;
  height: 120px;
  border-radius: 18px;
  border-left: 5px solid #FF4D4D !important;
  background: linear-gradient(58deg,
      rgba(255, 77, 77, 0.8) 0%,
      rgba(0, 0, 0, 0.8) 35%,
      rgba(20, 0, 0, 0.8) 65%,
      rgba(255, 77, 77, 0.8) 100%) !important;
}
</style>
