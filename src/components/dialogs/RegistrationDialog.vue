<template>
  <v-dialog class="dialog" v-model="dialog" width="600">

    <template v-slot:activator="{ props }">
      <button class="create-account no-hover" v-bind="props">Регистрация</button>
    </template>
    <v-card class="card">

      <span class="title">Регистрация</span>

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
            label="Пароль"
            type="password"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <div class="socials">
          <p>Регистрация с помощю</p>
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
import requests from '@/mixins/requests'

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
let dialog = ref(false);

// eslint-disable-next-line no-undef
const emit = defineEmits(['openAcceptDialog'])

function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    registration({
      email: initialState.value.email,
      name: initialState.value.password
    })
    initialState.value.password = '';
    initialState.value.email = '';
    emit('openAcceptDialog');
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
      padding: 50px 30px;
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

      &-buttons {
        width: 100%;
        display: flex;


      }
    }
  }
}
</style>
