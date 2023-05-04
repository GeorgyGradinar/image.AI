<template>
  <v-dialog class="dialog" v-model="isOpen" width="600" persistent>
    <v-card class="card">
      <span class="title">Восстановление пароля</span>
      <form v-if="isFirstStep">
        <v-text-field
            v-model="initialState.email"
            :error-messages="mapErrors(v$.email.$errors)"
            label="E-mail"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
        ></v-text-field>
        <div class="card-buttons">
          <button @click.prevent="$emit('close')">Отмена</button>
          <button class="create-account" @click.prevent="sendNewPassword">Восстановить</button>
        </div>
      </form>

      <div class="success" v-else>
        Новый пароль отправлен!

        <div class="card-buttons">
          <button class="create-account" @click.prevent="$emit('close')">Закрыть</button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import validation from "@/mixins/validation";
const { mapErrors } = validation();

let isOpen = ref(true);
let isFirstStep = ref(true);

const initialState = ref({
  email: '',
})

const rules = {
  email: {required, email}
}

const v$ = useVuelidate(rules, initialState);

function sendNewPassword() {
  if (!v$.value.$error) {
    isFirstStep.value = false;
  }
}
</script>

<style scoped lang="scss">
.dialog {
  .title {
    font-size: 20px;
    margin-bottom: 30px;
  }
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

.success {
  .card-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
