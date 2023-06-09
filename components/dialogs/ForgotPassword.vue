<template>
  <v-dialog class="dialog" v-model="isOpen" width="600" persistent>
    <v-card class="card">
      <button class="close-button" @click.prevent="$emit('close')">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
      </button>
      <span class="title">Восстановление пароля</span>
      <p class="error-message">{{ errorMessage }}</p>
      <form v-if="isFirstStep">
        <v-text-field
            v-model="initialState.email"
            :error-messages="mapErrors(v$.email.$errors)"
            label="E-mail"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
        ></v-text-field>
        <div class="card-buttons">
          <button class="secondary" @click.prevent="sendEmail">Восстановить</button>
        </div>
      </form>
      <div class="success" v-else>
        Ссылка на сброс пароля была отправлена на почту
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import validation from "~/mixins/validation";
import userSettings from "~/mixins/userSettings";

const {mapErrors} = validation();
const {forgotPassword} = userSettings();

let isOpen = ref(true);
let isFirstStep = ref(true);
let errorMessage = ref('');

const initialState = ref({
  email: '',
})

const rules = {
  email: {required, email}
}

const v$ = useVuelidate(rules, initialState);

async function sendEmail() {
  v$.value.$validate();

  if (!v$.value.$error) {
    await forgotPassword(initialState.value.email)
        .then(response => {
          isFirstStep.value = false;
        })
        .catch(error => {
          if (error.statusCode === 422) {
            errorMessage.value = error.data.message;
          }
        })
  }
}
</script>

<style scoped lang="scss">

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}

.dialog .v-overlay__content .card form .card-buttons {
  justify-content: flex-end;

  .create-account {
    width: auto;
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
