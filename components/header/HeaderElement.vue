<template>
  <header :class="{'header-open': !hasHiddenDrawer}">
    <NuxtLink to="/" class="logo">Лого</NuxtLink>
    <nav class="main-header">
      <NuxtLink to="/editor" :class="{'select-page': route.path === '/editor'}">Редактор</NuxtLink>
      <NuxtLink to="/text-to-image" :class="{'select-page': route.path === '/text-to-image'}">Изображение по
        описанию
      </NuxtLink>
      <NuxtLink to="/dream-booth" :class="{'select-page': route.path === '/dream-booth'}">ФотоМечты</NuxtLink>
      <NuxtLink to="/guides" :class="{'select-page': route.path === '/guides'}">Инфо</NuxtLink>
      <NuxtLink class="no-hover"><img src="~/assets/images/vk.svg" alt="vk icon"></NuxtLink>
      <NuxtLink to="/pricing" :class="{'select-page': route.path === '/pricing'}">Цены</NuxtLink>
      <a v-if="!person.name" @click="isOpenLoginDialog = true">Войти</a>
      <a class="create-account no-hover" v-if="!person.name" @click="isOpenRegistrationDialog = true">Регистрация
      </a>
      <AccountCard></AccountCard>
    </nav>

    <nav class="mini-header">
      <AccountCard @closeMainDialog="closeDrawer" :hasCloseDrawer="hasHiddenDrawer"></AccountCard>
      <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </nav>
    <section class="navigation-drawer" :class="{'drawer-hidden': hasHiddenDrawer}">
      <NuxtLink to="editor">Редактор</NuxtLink>
      <NuxtLink to="text-to-image">Изображение по описанию</NuxtLink>
      <NuxtLink>ФотоМечты</NuxtLink>
      <NuxtLink>Инфо</NuxtLink>
      <NuxtLink>Цены</NuxtLink>
      <button v-if="!person.name" @click="isOpenLoginDialog = true">Войти</button>
      <button class="create-account no-hover" v-if="!person.name" @click="isOpenRegistrationDialog = true">Регистрация
      </button>
    </section>
  </header>
  <LoginInDialog v-if="isOpenLoginDialog" @closeLoginDialog="isOpenLoginDialog = false"></LoginInDialog>
  <RegistrationDialog v-if="isOpenRegistrationDialog"
                      @closeRegistrationBlock="isOpenRegistrationDialog = false"></RegistrationDialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import LoginInDialog from "~/components/dialogs/LoginInDialog";
import {personStore} from "~/store/personStore";
import AccountCard from "~/components/header/AccountCard";
import requests from "~/mixins/requests";
import {storeToRefs} from "pinia";
import {useRoute} from "nuxt/app";

const store = personStore();
const {person, referralId} = storeToRefs(store);
const route = useRoute();
const {initStore} = requests();

let hasHiddenDrawer = ref(true);
let isOpenLoginDialog = ref(false);
let isOpenRegistrationDialog = ref(false);

onMounted(() => {
  if (route.query.ref) {
    referralId._value = route.query.ref;
    isOpenRegistrationDialog.value = true;
  }else {
    initStore();
  }
})

function toggleDrawer() {
  hasHiddenDrawer.value = !hasHiddenDrawer.value;
}

function closeDrawer() {
  hasHiddenDrawer.value = true;
}

</script>

<style lang="scss">

.layout {
  display: block;
  width: 100vw;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 15px 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .logo {
    font-size: 20px;
    color: var(--main-light-color);
    cursor: pointer;
    margin-right: 10px;

    &:link {
      text-decoration: none;
    }
  }

  .main-header {
    display: flex;
    gap: 20px;

    a {
      display: flex;
      align-items: center;
      color: var(--main-light-color);
      font-weight: 600;
      font-size: 14px;
      position: relative;
      transition: all 0.2s;

      &:link {
        text-decoration: none;
      }

      &:not(.no-hover)::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 8px;
        left: 0;
        background: linear-gradient(to left, var(--light-blue), var(--light-pink));
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
        border-radius: 50%;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .create-account {
      width: 140px;
      font-weight: bold;
    }

    .select-page {;

      &:not(.no-hover)::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 8px;
        left: 0;
        background: linear-gradient(to left, var(--light-blue), var(--light-pink));
        transition: transform 0.25s ease-out;
        border-radius: 50%;
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }

  .mini-header {
    display: none;
    gap: 20px;

    button {
      display: flex;
      align-items: center;
      color: var(--main-light-color);
      font-weight: 600;
      font-size: 14px;
      position: relative;
    }
  }

  .navigation-drawer {
    position: absolute;
    display: none;
    flex-direction: column;
    top: 70px;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    z-index: 10;
    background-color: #21154D;
    transition: all 0.3s;

    button {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      color: var(--main-light-color);
      border-bottom: 1px solid rgba(249, 246, 224, 0.1);
    }

    .create-account {
      margin-top: 20px;
      height: 60px;
    }
  }

  .drawer-hidden {
    left: -100vw;
  }
}

.header-open {
  background-color: #21154D;
}

@media screen and (max-width: 900px) {
  header {
    .main-header {
      display: none;
    }

    .mini-header {
      display: flex;
    }

    .navigation-drawer {
      display: flex;
    }
  }
}

@media screen and (max-width: 500px) {
  header {
    .mini-header {
      gap: 5px;
    }
  }
}
</style>
