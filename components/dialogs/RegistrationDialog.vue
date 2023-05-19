<template>
  <v-dialog class="dialog" v-model="dialog" width="600">
    <v-card class="card">
      <button class="close-button" @click.prevent="closeRegistrationBlock">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
      </button>
      <span class="title">Регистрация</span>

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
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
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
import {onMounted, ref} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {email, required} from '@vuelidate/validators'
import requests from '~/mixins/requests'
import validation from "~/mixins/validation";
import AcceptEmailDialog from "~/components/dialogs/AcceptEmailDialog";
import LoginInDialog from "~/components/dialogs/LoginInDialog";

const {mapErrors} = validation();

const {registration} = requests();
const initialState = ref({
  email: '',
  password: '',
})
const rules = {
  email: {required, email},
  password: {required}
}
const v$ = useVuelidate(rules, initialState)

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeRegistrationBlock'])

let dialog = ref(true);
let showPassword = ref(false);
let isOpenAcceptDialog = ref(false);
let isOpenLoginDialog = ref(false);

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

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    registration({
      email: initialState.value.email,
      name: initialState.value.password
    })
    initialState.value.password = '';
    initialState.value.email = '';
    isOpenAcceptDialog.value = true;
    dialog.value = false;
  }
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
</style>
