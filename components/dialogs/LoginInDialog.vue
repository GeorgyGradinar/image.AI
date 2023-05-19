<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="600">
      <v-card class="card">
        <button class="close-button" @click.prevent="closeDialog">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close">
        </button>
        <span class="title">Вход</span>

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
              <img src="~/assets/images/vk.svg" alt="вконтакте">
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

const {mapErrors} = validation();

const {loginIn} = requests();
// eslint-disable-next-line no-undef
const emit = defineEmits(['openRegistrationDialog', 'closeLoginDialog']);
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

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    loginIn();
    closeDialog();
  }
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

</style>
