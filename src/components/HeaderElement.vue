<template>
  <header>
    <div class="logo" @click="routeTo('/')">Лого</div>
    <nav>
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
      <div class="person" v-if="shoeImg">
        <img src="" alt="">
      </div>
      <div class="person" v-if="!shoeImg">
        <span>Г</span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import router from "@/router";

let shoeImg = false;

function routeTo(path) {
  router.push({path: path})
}
</script>

<style scoped lang="scss">

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
}

.logo {
  font-size: 20px;
  color: var(--main-light-color);
}

nav {
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
</style>
