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
              :error-messages="v$.email.$errors.map(e => 'Некорректный E-mail')"
              label="E-mail"
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
          ></v-text-field>

          <v-text-field
              v-model="initialState.password"
              :error-messages="v$.password.$errors.map(e => 'Некорректный пароль')"
              :counter="10"
              label="Пароль"
              type="password"
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
import {ref} from "vue";
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import ForgotPassword from "@/components/dialogs/ForgotPassword";
import requests from "@/mixins/requests";

const { loginIn } = requests();
const initialState = ref({
  email: '',
  password: '',
})
const rules = {
  email: {required, email},
  password: {required}
}
const v$ = useVuelidate(rules, initialState)
let dialog = ref(false);
let forgotPasswordDialog = ref(false);

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

.dialog {
  .v-overlay__content {
    .card {
      border-radius: 50px;
      padding: 50px;
      background-color: rgba(33, 21, 77, 0.7);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--main-light-color);

      .title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      form {
        .v-input {
          margin-bottom: 10px;
        }

        .socials {
          width: 100%;
          border-top: 1px solid rgba(249, 246, 224, 0.1);
          margin-top: 10px;
          padding-top: 15px;

          .wrapper-socials {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            gap: 20px;
            padding: 20px 0 0;

            & img {
              cursor: pointer;
            }
          }
        }

        .card-buttons {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 30px 0 0;
        }
      }

      .forgot-password {
        font-size: 14px;
        margin: 10px 0 25px;

        a {
          color: var(--light-blue);
          text-decoration: underline;
          cursor: pointer;
        }
      }

      &-buttons {
        width: 100%;
        display: flex;
      }
    }
  }
}


</style>
