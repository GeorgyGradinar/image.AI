<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="600">
      <v-card class="card">
        <button class="close-button" @click.prevent="closeDialog">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close">
        </button>
        <span class="title">Вход</span>
        <span class="error-message">{{ errorMessage }}</span>
        <form>
          <v-text-field
              v-model="initialState.email"
              :error-messages="mapErrors(v$.email.$errors)"
              label="E-mail"
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
          ></v-text-field>

          <v-text-field
              v-model="initialState.password"
              :error-messages="mapErrors(v$.password.$errors)"
              :counter="10"
              label="Пароль"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
          ></v-text-field>

          <div class="registration-block">
            <p>Еще нет аккаунта?</p>
            <a @click.prevent="openRegistrationBlock">Зарегистрироваться</a>
          </div>
          <p class="forgot-password">Забыли пароль? <a @click.prevent="openForgotPasswordDialog">Восстановить</a></p>
          <div class="socials">
            <p>Войти с помощью</p>
            <div class="wrapper-socials">
              <img @click="getAuthVK" src="~/assets/images/vk.svg" alt="вконтакте">
              <img @click="getAuthYandex" src="~/assets/images/yandex.svg" alt="яндекс">
              <img @click="getAuthGoogle" src="~/assets/images/google.svg" alt="гугл">
            </div>
          </div>

          <div class="card-buttons">
            <button class="create-account no-hover" @click.prevent="submit">Войти</button>
          </div>
        </form>

      </v-card>
    </v-dialog>
    <ForgotPassword v-if="forgotPasswordDialog" @close="closeDialog"></ForgotPassword>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import ForgotPassword from "~/components/dialogs/ForgotPassword";
import requests from "~/mixins/requests";
import validation from "~/mixins/validation";
import {personStore} from "~/store/personStore";
import apiMapper from "~/mixins/apiMapper";
import socials from "~/mixins/socials";
import {modelsStore} from "~/store/models";


const {mapErrors} = validation();
const {loginIn, getPersonInfo} = requests();
const emit = defineEmits(['openRegistrationDialog', 'closeLoginDialog']);
const store = personStore();
const {changePerson} = store;
const models = modelsStore()
const {toggleAcceptDialog, toggleRegistrationDialog} = models;
const {authVK} = socials();
const {personMapper} = apiMapper();


const initialState = ref({
  email: '',
  password: '',
});

const rules = {
  email: {required, email},
  password: {required}
};

const v$ = useVuelidate(rules, initialState);

let dialog = ref(true);
let forgotPasswordDialog = ref(false);
let showPassword = ref(false);
let errorMessage = ref('');

onMounted(() => {
  document.addEventListener('click', closeDialogClickOnAbroad)
});

function closeDialogClickOnAbroad(event) {
  if (Array.from(event.target.classList).includes('v-overlay__scrim')) {
    closeDialog();
  }
}

function openRegistrationBlock() {
  closeDialog();
  toggleRegistrationDialog(true);
}

async function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    changeErrorMessage('')
    await loginIn({
      email: initialState.value.email,
      password: initialState.value.password
    })
        .then(response => {
          changePerson(personMapper(response.user, response.authorisation.token));
          console.log(response)
          if (!response.user.email_verified_at) {
            // toggleAcceptDialog(true);
            // getPersonInfo();
          }
          closeDialog();
        })
        .catch(error => {
          if (error.statusCode === 401) {
            changeErrorMessage('Некорректная почта или пароль')
          }
        })
  }
}

function getAuthVK() {
  if (authVK()) {
    closeDialog();
  }
}

//
// function getAuthYandex() {
//   const width = window.document.body.clientWidth * 0.6;
//   const height = screen.height * 0.6;
//   const left = window.document.body.clientWidth / 2 - width / 2;
//   const top = screen.height / 2 - height / 2;
//   let popup = window.open('http://imager.plinskiy.space/api/v1/login/yandex', '_blank', `left=${left},top=${top},width=${width},height=${height}`)
// }
//
// function getAuthGoogle() {
//   const width = window.document.body.clientWidth * 0.6;
//   const height = screen.height * 0.6;
//   const left = window.document.body.clientWidth / 2 - width / 2;
//   const top = screen.height / 2 - height / 2;
//   let popup = window.open('http://imager.plinskiy.space/api/v1/login/google', '_blank', `left=${left},top=${top},width=${width},height=${height}`)
// }

function changeErrorMessage(message) {
  errorMessage.value = message;
}

function openForgotPasswordDialog() {
  dialog.value = false;
  forgotPasswordDialog.value = true;
}

function closeDialog() {
  removeEventListener('click', closeDialogClickOnAbroad);
  forgotPasswordDialog.value = false;
  emit('closeLoginDialog');
}

</script>

<style scoped lang="scss">

.dialog .v-overlay__content .card form .card-buttons {
  justify-content: flex-end;
}

.wrapper {
  display: flex;
  justify-content: center;
}

.v-row {
  margin: 0;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

</style>
