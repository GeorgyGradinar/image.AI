<template>
  <footer>
    <div class="wrapper-footer">
      <div class="logo">
        <h3>НейроХолст</h3>
        <p>На нашей платформе вы можете создавать шедевры с помощью современных достижений в нейросетевых
          технологиях.</p>
        <div class="social">
          <!--          <img src="~/assets/images/footer/instagram.svg" alt="">-->
          <!--          <img src="~/assets/images/footer/twitter.svg" alt="">-->
          <img src="~/assets/images/footer/vk.svg" alt="">
        </div>
      </div>

      <section class="item">
        <h3>Функции</h3>
        <!--        <button>Арт генератор</button>-->
        <!--        <button>AI редактор</button>-->
        <!--        <button>Сеть управления</button>-->
        <!--        <button>ФотоМечты</button>-->
        <NuxtLink to="/text-to-image">Изображение по описанию</NuxtLink>
        <NuxtLink to="/pricing">Цены</NuxtLink>
        <NuxtLink to="" v-if="!person.name" @click="toggleLoginDialog(true)">Войти</NuxtLink>
        <NuxtLink to="" v-if="!person.name" @click="toggleRegistrationDialog(true)">Регистрация
        </NuxtLink>
      </section>

      <section class="item">
        <h3>Информация</h3>
        <NuxtLink to="/legal/privacy-policy">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/legal/terms-of-service">Пользовательское соглашение</NuxtLink>
        <NuxtLink to="/legal/restrictions">Условия возврата</NuxtLink>
      </section>

      <section class="item">
        <h3>Контакты</h3>
        <p>neuro-holst@neuro-holst.ru</p>
        <p>ИНН: 616109874836</p>
      </section>

      <!--      <section class="item">-->
      <!--        <h3>О нас</h3>-->
      <!--        <button>Инфо</button>-->
      <!--        <button>FAQ</button>-->
      <!--        <button>Email</button>-->
      <!--      </section>-->
    </div>
  </footer>
</template>

<script setup>
import {modelsStore} from "~/store/models";
import {storeToRefs} from "pinia";
import {personStore} from "../store/personStore";
import {ref} from "vue";

const store = personStore();
const {person} = storeToRefs(store);
const models = modelsStore();
const {toggleLoginDialog, toggleRegistrationDialog} = models;

</script>

<style scoped lang="scss">

footer {
  width: 100%;
  background-color: #232426;
  display: flex;
  justify-content: center;
  z-index: 3;

  .wrapper-footer {
    width: 1200px;
    padding: 64px 0;
    display: flex;
    justify-content: space-between;

    .logo {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 15px;
      color: #f9f6e0;
      font-weight: 400;

      p {
        display: flex;
        font-size: 13px;
        line-height: 1.4;
        color: #807a7a;
        font-weight: 600;
        text-align: start;
        background-color: #232426;
        border: none;
        text-decoration: none;
        cursor: pointer;
      }
    }

    .social {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .social img {
      cursor: pointer;
    }

    .item {
      width: 100%;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      h3 {
        color: #f9f6e0;
        font-size: 14px;
        font-weight: 500;
      }

      a,
      p,
      button {
        display: flex;
        font-size: 15px;
        color: #807a7a;
        font-weight: 600;
        text-align: start;
        background-color: #232426;
        border: none;
        text-decoration: none;
        cursor: pointer;
      }

      button:hover,
      a:hover {
        color: #f9f6e0;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  footer {
    .wrapper-footer {
      flex-direction: column;
      gap: 35px;

      .logo {
        gap: 10px;
      }

      .item,
      .logo {
        padding: 0 25px;
      }
    }
  }
}

</style>
