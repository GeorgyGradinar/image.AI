<template>
  <v-dialog class="dialog" v-model="dialog" width="600">
    <v-card class="card">
      <button class="close-button" @click.prevent="closeRegistrationBlock">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
      </button>
      <span class="title">Регистрация</span>
      <span v-if="messageError" class="error-message">{{ messageError }}. <a @click.prevent="openLoginDialog">Войти</a></span>
      <form>
        <v-text-field
            v-model="initialState.name"
            :error-messages="mapErrors(v$.name.$errors)"
            label="Имя"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
        ></v-text-field>

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
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <v-text-field
            v-model="initialState.passwordConfirmation"
            :error-messages="mapErrors(v$.passwordConfirmation.$errors)"
            label="Повторите пароль"
            :type="isShowPasswordConfirmation ? 'text' : 'password'"
            :append-inner-icon="isShowPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isShowPasswordConfirmation = !isShowPasswordConfirmation"
            @input="v$.passwordConfirmation.$touch"
            @blur="v$.passwordConfirmation.$touch"
        ></v-text-field>

        <div class="login-block">
          <p>Уже есть аккаунт?</p>
          <a @click.prevent="openLoginDialog">Войти</a>
        </div>

        <div class="socials">
          <p>Регистрация с помощю</p>
          <div class="wrapper-socials">
            <img src="~/assets/images/vk.svg" alt="вконтакте">
            <img src="~/assets/images/yandex.svg" alt="яндекс">
            <img src="~/assets/images/google.svg" alt="гугл">
          </div>
        </div>

        <div class="card-buttons">
          <button class="create-account no-hover" @click.prevent="submit">Регистрация</button>
        </div>
      </form>

    </v-card>
  </v-dialog>
  <LoginInDialog v-if="isOpenLoginDialog" @closeLoginDialog="closeRegistrationBlock"></LoginInDialog>
  <AcceptEmailDialog v-if="isOpenAcceptDialog" @closeDialog="closeRegistrationBlock"></AcceptEmailDialog>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {email, minLength, required, sameAs} from '@vuelidate/validators'
import requests from '~/mixins/requests'
import validation from "~/mixins/validation";
import AcceptEmailDialog from "~/components/dialogs/AcceptEmailDialog";
import LoginInDialog from "~/components/dialogs/LoginInDialog";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import apiMapper from "~/mixins/apiMapper";

const store = personStore();
const {referralId} = storeToRefs(store);
const {changePerson} = store;
const {mapErrors} = validation();
const emit = defineEmits(['closeRegistrationBlock'])
const {personMapper} = apiMapper();

let dialog = ref(true);
let showPassword = ref(false);
let isShowPasswordConfirmation = ref(false);
let isOpenAcceptDialog = ref(false);
let isOpenLoginDialog = ref(false);
let messageError = ref('');

const {registration} = requests();
const initialState = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const emailRef = computed(() => initialState.value.password);
const rules = {
  name: {required},
  email: {required, email},
  password: {required, minLength: minLength(6)},
  passwordConfirmation: {required, sameAs: sameAs(emailRef)}
}

const v$ = useVuelidate(rules, initialState)

onMounted(() => {
  document.addEventListener('click', closeDialogClickOnAbroad)
});

function openLoginDialog() {
  isOpenLoginDialog.value = true;
  dialog.value = false;
}

function closeDialogClickOnAbroad(event) {
  if (Array.from(event.target.classList).includes('v-overlay__scrim')) {
    closeRegistrationBlock();
  }
}

async function submit() {
  v$.value.$validate();
  if (!v$.value.$error) {
    changeErrorMessage('');
    await registration({
      email: initialState.value.email,
      password: initialState.value.password,
      name: initialState.value.name,
      passwordConfirmation: initialState.value.passwordConfirmation,
    })
        .then(response => {
          changePerson(personMapper(response.user, response.authorisation.token));
          closeRegistrationBlock();
        })
        .catch(error => {
          if (error.statusCode === 422) {
            changeErrorMessage('Пользователь с такой почтой уже существует');
          }else {
            changeErrorMessage('Что то пошло не так, повторите попытку');
          }
        })
  }
}

function changeErrorMessage(message) {
  messageError.value = message;
}

function closeRegistrationBlock() {
  removeEventListener('click', closeDialogClickOnAbroad);
  isOpenAcceptDialog.value = false;
  isOpenLoginDialog.value = false;
  emit('closeRegistrationBlock');
}
</script>

<style scoped lang="scss">

.dialog .v-overlay__content .card form .card-buttons {
  justify-content: flex-end;
}

.error-message {
  color: red;
  margin-bottom: 10px;

  a {
    color: var(--light-blue);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
