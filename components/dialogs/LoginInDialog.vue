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
              <img src="~/assets/images/vk.svg" alt="вконтакте" @click="getAuthVK">
              <img src="~/assets/images/yandex.svg" alt="яндекс">
              <img src="~/assets/images/google.svg" alt="гугл">
            </div>
          </div>

          <div class="card-buttons">
            <button class="create-account no-hover" @click.prevent="submit">Войти</button>
          </div>
        </form>

      </v-card>
    </v-dialog>
    <RegistrationDialog v-if="isOpenRegistrationDialog" @closeRegistrationBlock="closeDialog"></RegistrationDialog>
    <ForgotPassword v-if="forgotPasswordDialog" @close="closeDialog"></ForgotPassword>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import ForgotPassword from "~/components/dialogs/ForgotPassword";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import requests from "~/mixins/requests";
import validation from "~/mixins/validation";
import {personStore} from "~/store/personStore";


const {mapErrors} = validation();
const {loginIn} = requests();
const emit = defineEmits(['openRegistrationDialog', 'closeLoginDialog']);
const store = personStore();
const {changePerson} = store;

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
let isOpenRegistrationDialog = ref(false);
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
  dialog.value = false;
  isOpenRegistrationDialog.value = true;
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
          let person = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            credits: response.user.credits,
            token: response.authorisation.token
          }
          changePerson(person);
          closeDialog();
        })
        .catch(error => {
          if (error.statusCode === 401) {
            changeErrorMessage('Некорректная почта или пароль')
          }
        })
  }
}

useHead({
  script: [{ src: 'https://vk.com/js/api/openapi.js?169', type:'text/javascript' }],
});

function getAuthVK(){
  // $fetch('https://oauth.vk.com/authorize?client_id=51663795&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=stats,wall,groups,photos,offline&response_type=token&v=5.92&state=123456')
  //     .then(el => console.log(el))
  VK.init({
    apiId: 51663647
  });

  VK.Auth.login(
      // callback-функция, которая будет вызвана после авторизации
      function (response) {

        console.log(response)

        if (response.status === 'connected') { // авторизация прошла успешно

          var user = response.session.user; //  информация о пользователе
          /*
           user.first_name - имя;
           user.last_name - фамилия;
           user.href - ссылка на страницу в формате https://vk.com/domain;
           user.id  - идентификатор пользователя;
           user.nickname -  отчество или никнейм (если указано);
           */

        } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;

        } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.

        }

      },
  )
}

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
  isOpenRegistrationDialog.value = false;
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
