<template>
  <section class="password-reset-page">
    <div class="wrapper-password-reset">
      <h1>Сбросить пароль</h1>
      <p>Укажите новый пароль для аккаунта</p>

      <v-text-field
          v-model="password.newPassword"
          label="Новый пароль"
          :error-messages="mapErrors(v$.newPassword.$errors)"
          :append-inner-icon="isShowNewPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowNewPass ? 'text' : 'password'"
          @click:append-inner="isShowNewPass = !isShowNewPass"
          @input="v$.newPassword.$touch"
          @blur="v$.newPassword.$touch"
      ></v-text-field>

      <v-text-field
          v-model="password.confirmation"
          label="Повторите новый пароль"
          :error-messages="mapErrors(v$.confirmation.$errors)"
          :append-inner-icon="isShowConfirmationPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowConfirmationPass ? 'text' : 'password'"
          @click:append-inner="isShowConfirmationPass = !isShowConfirmationPass"
          @input="v$.confirmation.$touch"
          @blur="v$.confirmation.$touch"
      ></v-text-field>
      <div class="wrapper-button">
        <button class="secondary" @click="submit">Сохранить</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import validation from "~/mixins/validation";
import userSettings from "~/mixins/userSettings";
import {minLength, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import {computed} from "vue";
import {useRoute} from "nuxt/app";

const {mapErrors} = validation();
const {resetPassword} = userSettings();
const route = useRoute();

console.log(route.params.token)

let isShowNewPass = ref(false);
let isShowConfirmationPass = ref(false);

let password = ref({
  newPassword: null,
  confirmation: null
})

const newPasswordRef = computed(() => password.value.newPassword);

const rules = {
  newPassword: {required, minLength: minLength(6)},
  confirmation: {required, sameAs: sameAs(newPasswordRef)}
}

const v$ = useVuelidate(rules, password);

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    resetPassword({token: route.params.token, newPassword: password.value.newPassword, confirmation: password.value.confirmation});
  }

}

</script>

<style lang="scss">

.password-reset-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 20px 20px;
  background-color: var(--main-backgground-color);

  .wrapper-password-reset {
    width: 100%;
    max-width: 640px;
    color: var(--main-light-color);

    h1,
    p {
      text-align: center;
    }

    h1 {
      font-size: 40px;
      margin-bottom: 20px;
    }

    p {
      font-size: 25px;
      margin-bottom: 70px;
    }

    .wrapper-button {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      .secondary {
        min-width: 50%;
      }
    }
  }
}
</style>
