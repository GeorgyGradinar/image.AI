<template>
  <v-dialog class="dialog" v-model="isOpen" width="600" persistent>
    <v-card class="card">
      <button class="close-button" @click.prevent="$emit('close')">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
      </button>
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
          <button class="create-account" @click.prevent="sendNewPassword">Восстановить</button>
        </div>
      </form>
      <div class="success" v-else>
        Новый пароль отправлен!
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import validation from "~/mixins/validation";
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
