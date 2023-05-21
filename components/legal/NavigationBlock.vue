<template>
  <nav>
    <button @click="routeTo('/legal/privacy-policy')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/privacy-policy'}">Конфиденциальность
    </button>
    <button @click="routeTo('/legal/terms-of-service')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/terms-of-service'}">Условия
      использования
    </button>
    <button @click="routeTo('/legal/restrictions')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/restrictions'}">Ограничения
    </button>
    <button @click="routeTo('/legal/subprocessors')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/subprocessors'}">Подпроцессоры
    </button>
    <button @click="routeTo('/legal/cancellation-policy')"
            :class="{'currentPage': router.currentRoute._value.path === '/legal/cancellation-policy'}">Политика отмены
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
  width: 350px;
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

    &:hover {
      color: var(--light-blue);
    }
  }

  .currentPage {
    color: var(--light-blue);
  }
}

@media screen and (max-width: 600px) {
  nav {
    width: 100%;
    padding: 20px 50px;
    border-bottom: 1px solid rgba(255, 255, 225, 0.4);
    border-top: 1px solid rgba(255, 255, 225, 0.4);
    border-right: unset;
  }
}
</style>
