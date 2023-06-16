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
<!--          <p class="forgot-password">Забыли пароль? <a @click.prevent="openForgotPasswordDialog">Восстановить</a></p>-->
          <div class="socials">
            <p>Войти с помощью</p>
            <div class="wrapper-socials">
              <img @click="vk" src="~/assets/images/vk.svg" alt="вконтакте">
              <img @click="yandex" src="~/assets/images/yandex.svg" alt="яндекс">
              <img @click="google" src="~/assets/images/google.svg" alt="гугл">
            </div>
          </div>

          <div class="card-buttons login-button">
            <div class="wrapper-accept-policy">
              <input type="checkbox" id="vehicle1" name="vehicle1" v-model="policyPrivacy" value="false">
              <label for="vehicle1">Я принимаю условия
                <NuxtLink to="/legal/terms-of-service" @click="closeDialog">Пользовательского соглашения</NuxtLink>
              </label>
            </div>
            <button class="create-account no-hover" @click.prevent="submit">Войти</button>
          </div>
        </form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
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
const {toggleAcceptDialog, toggleRegistrationDialog, toggleForgotPassword} = models;
const {authVK, authYandex, authGoogle} = socials();
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
let showPassword = ref(false);
let errorMessage = ref('');
let policyPrivacy = ref(true);

onMounted(() => {
  document.addEventListener('click', closeDialogClickOnAbroad)
});

function closeDialogClickOnAbroad(event) {
  if (Array.from(event.target.classList).includes('v-overlay__scrim') || event.target.nodeName === "JDIV") {
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
          closeDialog();
        })
        .catch(error => {
          if (error.statusCode === 401) {
            changeErrorMessage('Некорректная почта или пароль');
          }else {
            changeErrorMessage('Что-то пошло не так');
          }
        })
  }
}

function vk() {
  changeErrorMessage('')
  if (policyPrivacy.value) {
    authVK();
  } else {
    changeErrorMessage('Примите условия пользовательского соглашения')
  }
}

function yandex() {
  changeErrorMessage('')
  if (policyPrivacy.value) {
    authYandex();
  } else {
    changeErrorMessage('Примите условия пользовательского соглашения')
  }
}

function google() {
  changeErrorMessage('')
  if (policyPrivacy.value) {
    authGoogle();
  } else {
    changeErrorMessage('Примите условия пользовательского соглашения')
  }
}

function changeErrorMessage(message) {
  errorMessage.value = message;
}

function openForgotPasswordDialog() {
  toggleForgotPassword(true);
  closeDialog();
}

function closeDialog() {
  changeErrorMessage('')
  removeEventListener('click', closeDialogClickOnAbroad);
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

.login-button {
  display: flex;
  flex-direction: column;

  .wrapper-accept-policy {
    margin-bottom: 20px;
    display: flex;

    input {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      cursor: pointer;
    }

    label {
      cursor: pointer;

      a {
        color: var(--light-blue);
      }
    }
  }
}

</style>
