<template>
  <nav>
    <button @click="routeTo('/legal/privacy-policy')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/privacy-policy'}">Политика
      конфиденциальности
    </button>
    <button @click="routeTo('/legal/terms-of-service')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/terms-of-service'}">Пользовательское
      соглашение
    </button>
    <button @click="routeTo('/legal/restrictions')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/restrictions'}">Условия возврата
    </button>
  </nav>
</template>

<script setup>
import {useRouter} from "nuxt/app";

const router = useRouter();

function routeTo(route) {
  router.push({path: route})
}
</script>

<style scoped lang="scss">
nav {
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  color: var(--main-light-color);
  border-right: 1px solid rgba(255, 255, 225, 0.4);
  padding: 20px;

  button {
    font-size: 14px;
    transition: all 0.3s;
    text-align: end;

    &:hover {
      color: var(--light-blue);
    }

    &:active {
      transform: scale(0.9);
    }
  }

  .currentPage {
    color: var(--light-blue);
  }
}

@media screen and (max-width: 600px) {
  nav {
    width: 100%;
    height: unset;
    padding: 20px 50px;
    border-bottom: 1px solid rgba(255, 255, 225, 0.4);
    border-top: 1px solid rgba(255, 255, 225, 0.4);
    border-right: unset;
  }
}
</style>
