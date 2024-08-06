<template>

<div v-for="user in User">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="my-5"><router-link to="/clients" class="blocked"><img class="px-3 pb-2 blocked " src="@/assets/images/icons/Stroke.png"></router-link></div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="user-page-header d-flex align-items-center justify-content-between">
          <div class="left d-flex align-items-center">
            <div class="user-photo">
              <img src="@/assets/images/avatar.jpg" >
            </div>
            <div class="user-info">
              <div class="full-name">{{user.name+' '+user.surname}}</div>
              <div class="phone">{{ user.username }}</div>
            </div>
          </div>
          <div class="right d-flex align-items-center text-center">
            <div class="item">
              <div class="age">Возраст</div>
              <div class="age-value">{{new Date().getFullYear() - new Date(user.birthday).getFullYear() }}</div>
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="age">Рост</div>
              <div class="age-value">{{ user.height }}</div>
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="age">Вес</div>
              <div class="age-value">{{ user.weight }}</div>
              <div class="line"></div>
            </div>
          </div>
          <div @click="UserConfigModal=!UserConfigModal" class="user-configs-modal-icon">
            <img src="@/assets/images/icons/nav-icon.png" height="26">
          </div>
          <div v-show="UserConfigModal" class="user-configs-modal ">
            <div class="user-configs-modal-item">
              <a href="#">Добавить услугу</a>
              <img src="@/assets/images/icons/plus.png" height="22">
            </div>
            <div @click="editedUser(), toggleModal('.user-change-modal')" class="user-configs-modal-item">
              <a class="change-user-btn">Ред. профиль</a>
              <img src="@/assets/images/icons/pen.png" height="22">
            </div>
            <div @click="toggleModal('.user-block-modal')" class="user-configs-modal-item">
              <a class="block-user-btn">Заблокировать</a>
              <img src="@/assets/images/icons/ban.png" height="22">
            </div>
            <div @click="toggleModal('.user-delete-modal')" class="user-configs-modal-item red">
              <a class="delete-user-btn">Удалить</a>
              <img src="@/assets/images/icons/delete.png" height="22">
            </div>
            <div @click="toggleModal('.add-money-modal')" class="user-configs-modal-item">
              <a class="add-money-btn">Пополнить счёт</a>
              <img src="@/assets/images/icons/add-money.png" height="22">
            </div>
            <div @click="toggleModal('.take-money-modal')" class="user-configs-modal-item">
              <a class="take-money-btn">Снять деньги</a>
              <img src="@/assets/images/icons/take-money.png" height="22">
            </div>
            <div @click="toggleModal('.up-card-modal')" class="user-configs-modal-item">
              <a class="up-card-btn">Повысить карту</a>
              <img src="@/assets/images/icons/up.png" height="22">
            </div>
            <div @click="toggleModal('.down-card-modal')" class="user-configs-modal-item">
              <a class="down-card-btn">Понизить карту</a>
              <img src="@/assets/images/icons/down.png" height="22">
            </div>
            <div @click="toggleModal('.pin-card-modal')" class="user-configs-modal-item yellow">
              <a class="pin-card-btn">Закрепить карту</a>
              <img src="@/assets/images/icons/crown.png" height="22">
            </div>
            <div @click="toggleModal('.unpin-card-modal')" class="user-configs-modal-item yellow">
              <a class="unpin-card-btn">Открепить карту</a>
              <img src="@/assets/images/icons/crown.png" height="22">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.user-change-modal')" class="add-user-modal user-change-modal  d-flex justify-content-center align-items-center d-none">
    <div @click.stop class="content">
      <h5>РЕДАКТИРОВАНИЕ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label for="name">Имя</label>
          <input type="text" placeholder="Имя" id="name" v-model="formData.name">
        </div>
        <div class="form mt-3">
          <label for="surname">Фамилия</label>
          <input type="text" placeholder="Фамилия" id="surname" v-model="formData.surname">
        </div>
        <div class="form mt-3">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="formData.password">
        </div>
        <div class="form mt-3">
          <label for="date">Дата рождения</label>
          <input type="date" v-model="formData.birthday">
        </div>

        <div class="menu-type-2 d-flex justify-content-between pt-3 mt-3">
          <div class="form-recipients">
            <input :checked="user.gender==='1'" type="radio" id="man" name="recipients" value="Мужчина">
            <label for="man">Мужчина</label>
          </div>
          <div class="form-recipients">
            <input :checked="user.gender==='2'" type="radio" id="woman" name="recipients" value="Женщина" >
            <label for="woman">Женщина</label>
          </div>
        </div>

        <div class="cards-infos">
          <div class="d-flex justify-content-between add-user-buttons">
            <button class="dont">Отмена</button>
            <button class="submit" type="button" @click="saveUser(), toggleModal('.user-change-modal')">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.user-delete-modal')" class="add-user-modal user-delete-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="text-center mb-5">
        <img src="@/assets/images/icons/info.png" height="70px">
      </div>
      <h3 class="text-center">Вы действительно хотите удалить этого пользователя?</h3>
      <p class="text-center mt-3 text-gray">При удалении аккаунт пользователя все данные будут уничтожены</p>
      <div class="courses mt-3">
        <div class="cards-infos delete-user-info">
          <div class="info">
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Абонемент:</div>
              <div>12</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Массаж:</div>
              <div>12</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Танцы:</div>
              <div>5</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Йога:</div>
              <div>8</div>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button class="dont">Отмена</button>
            <button class="submit red" type="button">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.user-block-modal')" class="add-user-modal user-block-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <div class="text-center mb-5">
        <img src="@/assets/images/icons/info.png" height="70px">
      </div>
      <h3 class="text-center">Вы действительно
        хотите заблокировать этого
        пользователя?</h3>
      <div class="form mt-3">
        <label for="because">Причина блокировки</label>
        <textarea  name="because" id="because" cols="30" rows="6" placeholder="Укажите причину блокировки" maxlength="150"></textarea>
      </div>
      <div class="courses mt-3">
        <div class="cards-infos delete-user-info">
          <div class="info">
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Абонемент:</div>
              <div>12</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Массаж:</div>
              <div>12</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Танцы:</div>
              <div>5</div>
            </div>
            <div class="d-flex justify-content-between mr-6 ml-6">
              <div>Йога:</div>
              <div>8</div>
            </div>
          </div>
          <div class="d-flex justify-content-between add-user-buttons">
            <button class="dont">Отмена</button>
            <button class="submit red block-btn" type="button">Блокировать</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div  @click="toggleModal('.add-money-modal')" class="add-user-modal add-money-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <h5>ПОПОЛНИТЬ КАРТУ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label for="sum">Сумма</label>
          <input v-model="payCash" type="number" placeholder="Введите сумму"  id="sum">
        </div>

        <div class="info mt-5">
          <div class="d-flex justify-content-between">
            <div>На счету</div>
            <div>{{user.cards[0].balance}} TJS</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>Бонусов</div>
            <div>{{user.cards[1].balance}}</div>
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
  <div @click="toggleModal('.take-money-modal')" class="add-user-modal take-money-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop  class="content">
      <h5>СНЯТЬ НАЛИЧНЫЕ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label for="take-sum">Сумма</label>
          <input type="text" placeholder="Введите сумму" id="take-sum">
        </div>

        <div class="form mt-3">
          <label for="becauses">Причина снятия</label>
          <textarea  name="because" id="becauses" cols="30" rows="6" placeholder="Укажите причину снятия наличных" maxlength="150"></textarea>
        </div>

        <div class="info mt-5">
          <div class="d-flex justify-content-between">
            <div>На счету</div>
            <div>500 TJS</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>Бонусов</div>
            <div>100</div>
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
  <div @click="toggleModal('.up-card-modal')" class="add-user-modal up-card-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop  class="content">
      <h5>ПОВЫСИТЬ КАРТУ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label>Причина повышения</label>
          <input type="text" placeholder="Укажите причину повышения карты">
        </div>
        <div class="form mt-3">
          <textarea  name="because" cols="30" rows="6" placeholder="Укажите причину повышения карты" maxlength="150"></textarea>
        </div>


        <div class="form relative">
          <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
          <label >Карта</label>
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
  <div @click="toggleModal('.down-card-modal')" class="add-user-modal down-card-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop  class="content">
      <h5>ПОНИЗИТЬ КАРТУ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label>Причина понижения</label>
          <input type="text" placeholder="Укажите причину понижения карты">
        </div>
        <div class="form mt-3">
          <textarea  name="because" cols="30" rows="6" placeholder="Укажите причину понижения карты" maxlength="150"></textarea>
        </div>


        <div class="form relative">
          <img src="@/assets/images/icons/row-right.png" class="row-right-icon">
          <label >Карта</label>
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
  <div @click="toggleModal('.pin-card-modal')" class="add-user-modal pin-card-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <h5>ЗАКРЕПИТЬ КАРТУ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label>Причина закрепления</label>
          <input type="text" placeholder="Укажите причину закрепления карты">
        </div>
        <div class="form mt-3">
          <textarea  name="because" cols="30" rows="6" placeholder="Описание для клиента" maxlength="150"></textarea>
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
  <div @click="toggleModal('.unpin-card-modal')" class="add-user-modal unpin-card-modal d-none d-flex justify-content-center align-items-center">
    <div @click.stop class="content">
      <h5>ОТКРЕПИТЬ КАРТУ</h5>
      <div class="courses mt-3">
        <div class="form mt-3">
          <label>Причина открепления</label>
          <input type="text" placeholder="Укажите причину открепления карты">
        </div>
        <div class="form mt-3">
          <textarea  name="because" cols="30" rows="6" placeholder="Описание для клиента" maxlength="150"></textarea>
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
      <div class="col-3">
        <div class="user-page-card">
          <div class="title">Курсы групповые</div>
          <div class="desc">Кардио нагрузки</div>
        </div>
      </div>
      <div class="col-3">
        <div class="user-page-card">
          <div class="title">Абонемент</div>
          <div class="desc-number">12</div>
        </div>
      </div>
      <div class="col-3">
        <div class="user-page-card">
          <div class="title">Силовая нагрузка</div>
          <div class="desc-number">18</div>
        </div>
      </div>
      <div class="col-3">
        <div class="user-page-card">
          <div class="title">Кардио нагрузка</div>
          <div class="desc-number">15</div>
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
    <div @click="toggleModal('.cards-modal')" class="row">
      <div  class="col-6">
        <div v-if="user.cards.length>0" class="credit-card">
          <img src="@/assets/images/card.png">
          <div  class="info">
            <div class="type">{{user.cards[0].name}}</div>
            <div class="price">{{user.cards[0].balance}} TJS</div>
            <div class="name">{{user.name+' '+user.surname}}</div>
            <div class="card-number">{{user.cards[0].card_number}}</div>
          </div>
        </div>
        <div v-else class="h3 color-yellow ms-4">карты отсутствуют</div>
      </div>
      <div class="col-6">
        <div v-if="user.cards.length>0" class="credit-card">
          <img src="@/assets/images/card.png">
          <div class="info ">
            <div class="bonus-title">{{user.cards[1].balance}} БОНУСОВ</div>
            <div class="name">{{user.name+' '+user.surname}}</div>
            <div class="card-number">{{user.cards[1].card_number}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div @click="toggleModal('.cards-modal')" class="cards-modal d-none d-flex justify-content-center align-items-center">
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
        <div :class="{checked:uslugi}" @click="uslugi=!uslugi" class=" uslugi-btn">Услуги</div>
        <div  :class="{checked:!uslugi}" @click="uslugi=!uslugi" class="courses-btn">Курсы</div>
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
      <div v-show="uslugi===false" class="coursess ">
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


  <div class="container cards-bottom">
    <div class="row">
      <div class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="img">
              <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="title">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
              <div>до 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="title ml-0">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
      <div  class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="img">
              <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="title">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
              <div>до 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="title ml-0">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="img">
              <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="title">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
              <div>до 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="user-page-card user-page-card-bottom">
          <div class="d-flex head d-flex align-items-center">
            <div class="img">
              <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="title">Кардио нагрузки, Группа</div>
          </div>
          <div class="d-flex bottom justify-content-between align-items-end">
            <div class="prices">
              <div>Цена: <b>580с</b></div>
              <div>Итого: <b>580с</b></div>
            </div>
            <div class="sales">
              <div>Скидка: <b>580с</b> <span class="green">(-5%)</span> </div>
              <div>Бонусы: <b><span class="red">-5</span></b></div>
            </div>
            <div class="dates">
              <div>c 10.12.2023</div>
              <div>до 10.12.2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import get from "@/components/axios/get.js";
import Patch from "@/components/axios/Patch.js";
import posts from "@/components/axios/posts.js";

export default {
  name: 'UserPage',
  data() {
    return {
      formData: {
        gender:'',
        name: '',
        surname: '',
        password: '',
        birthday: '',
      },
      payCash:'',
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
    getInfo() {
      get(`http://fitness.abdurazzoq.beget.tech/public/api/user/${this.id}`,)
          .then(response => {
            this.User = response.data;
          })
          .catch(error => {
            this.error = error;
          });
    },
    editedUser() {
      const editUser = this.User.user
      this.formData = {
        ...{
          name: editUser.name,
          surname: editUser.surname,
          gender:editUser.gender,
          password: '',
          birthday: editUser.birthday,
        }
      }
    },
    saveUser(){
      Patch(`http://fitness.abdurazzoq.beget.tech/public/api/user/update/${this.id}`, {...this.formData})
          .then(response => {
            this.UserConfigModal=false
            console.log(this.User)
            this.getInfo()
          })
          .catch(error => {
            this.error = error;
          });
    },
    payment(payCash){
      const pay={ owner_id: this.id, payment: payCash, payment_type: "refill"}
      posts('http://fitness.abdurazzoq.beget.tech/public/api/payment', pay)
          .then(response => {
            console.log('ok',response)
            this.getInfo()
          })
          .catch(error => {
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
</style>
