<template>
  <header :class="{'header-open': !hasHiddenDrawer}">
    <div class="logo" @click="routeTo('/')">Лого</div>
    <nav class="main-header">
      <button @click="routeTo('/editor')">Редактор</button>
      <button @click="routeTo('/text-to-image')">Изображение по описанию</button>
      <button @click="routeTo('/dream-booth')">ФотоМечты</button>
      <button @click="routeTo('/guides')">Инфо</button>
      <button class="no-hover">
        <img src="../assets/vk.svg" alt="vk icon">
      </button>
      <button @click="routeTo('/pricing')">Цены</button>
      <button>Войти</button>
      <button class="create-account no-hover"><span>Регистрация</span></button>
      <div class="person">
        <span>Г</span>
      </div>
    </nav>

    <nav class="mini-header">

      <div class="person">
        <span>Г</span>
      </div>

      <v-app-bar-nav-icon variant="text" @click.stop="hiddenDrawer"></v-app-bar-nav-icon>
    </nav>

    <section class="navigation-drawer" :class="{'drawer-hidden': hasHiddenDrawer}">
      <button @click="routeTo('/editor')">Редактор</button>
      <button @click="routeTo('/text-to-image')">Изображение по описанию</button>
      <button @click="routeTo('/dream-booth')">ФотоМечты</button>
      <button @click="routeTo('/guides')">Инфо</button>
      <button @click="routeTo('/pricing')">Цены</button>
      <button>Войти</button>
      <button class="create-account mini"><span>Регистрация</span></button>
    </section>


  </header>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";

let hasHiddenDrawer = ref(false);

function routeTo(path) {
  hasHiddenDrawer.value = true;
  router.push({path: path})
}

function hiddenDrawer() {
  hasHiddenDrawer.value = !hasHiddenDrawer.value;

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
  background-color: rgba(33, 21, 77, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .logo {
    font-size: 20px;
    color: var(--main-light-color);
  }

  .main-header {
    display: flex;
    gap: 20px;

    button {
      display: flex;
      align-items: center;
      color: var(--main-light-color);
      font-weight: 600;
      font-size: 14px;
      position: relative;

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

  .create-account {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    padding: 10px 15px;
    background: linear-gradient(to left, var(--light-blue), var(--light-pink));

    span {
      display: flex;
      align-items: center;
      font-weight: 700;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  .person {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--light-blue);
    box-shadow: 0 0 15px rgba(54, 226, 255, 0.5);
    color: var(--light-blue);
    padding: 12px;
    border-radius: 50%;

    span {
      display: flex;
      justify-content: center;
      width: 20px;
      height: 20px;
    }
  }

  .navigation-drawer {
    position: absolute;
    display: flex;
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
      height: 80px;
      color: var(--main-light-color);
      border-bottom: 1px solid rgba(249, 246, 224, 0.1);
    }

    .mini {
      margin: 40px;
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
  }
}
</style>
