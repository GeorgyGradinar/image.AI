<template>
  <div class="wrapper-socials">
    <button class="secondary vk" @click.prevent="vk">
      <p>Войти с помощью ВК</p>
      <img src="~/assets/images/vk.svg" alt="вконтакте">
    </button>
    <button class="secondary yandex" @click.prevent="yandex">
      <p>Войти с помощью Яндекс</p>
      <img src="~/assets/images/yandex.svg" alt="яндекс">
    </button>
    <button class="secondary google" @click.prevent="google">
      <p>Войти с помощью Google</p>
      <img src="~/assets/images/google.svg" alt="гугл">
    </button>
  </div>
</template>

<script setup>
import socials from "~/mixins/socials";
import {toRefs} from "vue";

const {authVK, authYandex, authGoogle} = socials();
const emit = defineEmits(['errorMessage']);
const props = defineProps({
  policyPrivacy: Boolean,
});
const {policyPrivacy} = toRefs(props);

function vk() {
  emit('errorMessage', '');
  if (policyPrivacy.value) {
    authVK();
  } else {
    emit('errorMessage', 'Примите условия пользовательского соглашения');
  }
}

function yandex() {
  emit('errorMessage', '')
  if (policyPrivacy.value) {
    authYandex();
  } else {
    emit('errorMessage', 'Примите условия пользовательского соглашения')
  }
}

function google() {
  emit('errorMessage', '')
  if (policyPrivacy.value) {
    authGoogle();
  } else {
    emit('errorMessage', 'Примите условия пользовательского соглашения')
  }
}
</script>

<style scoped lang="scss">
.secondary.vk {
  border: 1px solid rgba(25, 118, 210, 1);

  &:hover {
    box-shadow: 0 0 10px rgba(25, 118, 210, 0.5);
  }
}

.secondary.yandex {
  border: 1px solid rgba(237, 31, 36, 1);

  &:hover {
    box-shadow: 0 0 10px rgba(237, 31, 36, 0.5);
  }
}

.secondary.google {
  border: 1px solid rgba(52, 168, 83, 1);

  &:hover {
    box-shadow: 0 0 10px rgba(52, 168, 83, 0.5);
  }
}
</style>
