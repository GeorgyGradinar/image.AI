<template>
  <v-dialog class="dialog" v-model="dialog" width="400">

    <template v-slot:activator="{ props }">
      <button v-bind="props">Войти</button>
    </template>
    <v-card class="card">

      <span class="text-h5">Вход</span>

      <form>
        <v-text-field
            v-model="initialState.email"
            :error-messages="v$.email.$errors.map(e => 'Не верная почта')"
            label="E-mail"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
            v-model="initialState.password"
            :error-messages="v$.password.$errors.map(e => 'Не верный пароль')"
            :counter="10"
            label="Пароль"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

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
          <button class="create-account no-hover" @click.prevent="submit">Регистрация</button>
        </div>
      </form>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {email, required} from '@vuelidate/validators'

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

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    dialog.value = false;
  }
}

</script>

<style scoped lang="scss">

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

      form {

        .socials {
          width: 100%;

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

      &-buttons {
        width: 100%;
        display: flex;


      }
    }
  }
}


</style>
