<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="600">

      <template v-slot:activator="{ props }">
        <button v-bind="props">Войти</button>
      </template>
      <v-card class="card">

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

          <p class="forgot-password">Забыли пароль? <a @click.prevent="openForgotPasswordDialog">Восстановить</a></p>
          <div class="socials">
            <p>Войти с помощью</p>
            <div class="wrapper-socials">
              <img src="../../assets/vk.svg" alt="вконтакте">
              <img src="../../assets/yandex.svg" alt="яндекс">
              <img src="../../assets/google.svg" alt="гугл">
            </div>
          </div>

          <div class="card-buttons">
            <button @click.prevent="dialog = false">Отмена</button>
            <button class="create-account no-hover" @click.prevent="submit">Войти</button>
          </div>
        </form>

      </v-card>
    </v-dialog>
    <ForgotPassword v-if="forgotPasswordDialog" @close="forgotPasswordDialog = false"></ForgotPassword>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import ForgotPassword from "@/components/dialogs/ForgotPassword";
import requests from "@/mixins/requests";
import validation from "@/mixins/validation";

const {mapErrors} = validation();

const {loginIn} = requests();
// eslint-disable-next-line no-undef
const emit = defineEmits(['openRegistrationDialog']);
const initialState = ref({
  email: '',
  password: '',
});
const rules = {
  email: {required, email},
  password: {required}
};
const v$ = useVuelidate(rules, initialState);
let dialog = ref(false);
let forgotPasswordDialog = ref(false);
let showPassword = ref(false);

watch(dialog, (newValue) => {
  if (!newValue) {
    v$.value.$reset();
    initialState.value = {
      email: '',
      password: '',
    };
  } else {
    emit('openRegistrationDialog');
  }
});

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    loginIn();
    dialog.value = false;
  }
}

function openForgotPasswordDialog() {
  dialog.value = false;
  forgotPasswordDialog.value = true;
}

</script>

<style scoped lang="scss">
@import "@/style/dialogs.scss";

.wrapper {
  display: flex;
  justify-content: center;
}

.v-row {
  margin: 0;

  .create-account {
    height: 50px;
  }
}

</style>
