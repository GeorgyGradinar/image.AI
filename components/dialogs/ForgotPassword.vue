<template>
  <v-dialog class="dialog" v-model="isOpen" width="600" persistent>
    <v-card class="card">
      <button class="close-button" @click.prevent="$emit('close')">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close icon">
      </button>
      <span class="title">Восстановление пароля</span>
      <p class="error-message">{{ errorMessage }}</p>
      <form v-if="isFirstStep">
        <v-text-field
            v-model="initialState.email"
            :error-messages="mapErrors(v$.email.$errors)"
            label="E-mail"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
        ></v-text-field>
        <div class="card-buttons">
          <button class="secondary" @click.prevent="sendEmail">Восстановить</button>
        </div>
      </form>
      <div class="success" v-else>
        Ссылка на сброс пароля была отправлена на почту
        <p class="sendAfter"  v-if="!isShowButtonSendMore">Отправить повторно через
          <span>00 : {{ seconds }}</span>
        </p>
        <a href="" v-else class="send-more" @click.prevent="sendToEmail">Отправить повторно</a>

      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onUnmounted, ref} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import validation from "~/mixins/validation";
import userSettings from "~/mixins/userSettings";

const {mapErrors} = validation();
const {forgotPassword} = userSettings();

let isOpen = ref(true);
let isFirstStep = ref(true);
let errorMessage = ref('');
let seconds = ref(60);
let isShowButtonSendMore = ref(false);

const initialState = ref({
  email: '',
})

const rules = {
  email: {required, email}
}

const v$ = useVuelidate(rules, initialState);

async function sendEmail() {
  v$.value.$validate();

  if (!v$.value.$error) {
    errorMessage.value = '';
    isFirstStep.value = false;
    await forgotPassword(initialState.value.email)
        .then(response => {
          timer();
        })
        .catch(error => {
          isFirstStep.value = true;
          if (error.statusCode === 422) {
            errorMessage.value = error.data.message;
          }
        })
  }
}

let secondTimer
function timer() {
  secondTimer = setInterval(() => {
    seconds.value = seconds.value > 10 ? `${seconds.value - 1}` : `0${seconds.value - 1}`;
    checkSeconds();
  }, 1000);

  function checkSeconds() {
    if (+seconds.value === 0) {
      clearInterval(secondTimer);
      isShowButtonSendMore.value = true;
    }
  }
}

function sendToEmail() {
  seconds.value = 60;
  timer();
  isShowButtonSendMore.value = false;
  sendEmail();
}

onUnmounted(() => {
  clearInterval(secondTimer);
})
</script>

<style scoped lang="scss">

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}

.dialog .v-overlay__content .card form .card-buttons {
  justify-content: flex-end;

  .create-account {
    width: auto;
  }
}

.success {
  .card-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.send-more {
  font-size: 12px;
  color: var(--light-blue);
  text-align: center;
}
</style>
