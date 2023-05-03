<template>
  <v-dialog class="dialog" v-model="dialog" width="400" persistent>
    <v-card class="card">
      <span class="text-h5">Подтверждение почты</span>
      <form>
        <v-text-field
            v-model="verificationCode"
            label="Код подтверждения"
            :error-messages="v$.verificationCode.$errors.map(e => 'код не верный')"
            @input="v$.verificationCode.$touch"
            @blur="v$.verificationCode.$touch"
        ></v-text-field>
        <div class="card-buttons">
          <button @click.prevent="dialog = false">Закрыть</button>
          <button class="create-account no-hover" @click.prevent="checkVerificationCode">Подтвердить</button>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import requests from '@/mixins/requests'
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const {checkVerificationEmail} = requests();
// :error-messages="v$.email.$errors.map(e => e.$message)"

let dialog = ref(true);
let verificationCode = null;
// let errorMassage = '';

const rules = {
  verificationCode: {required}
}

const v$ = useVuelidate(rules, verificationCode)
v$.value.$validate();

function checkVerificationCode() {
  if (checkVerificationEmail() === 111) {
    console.log(v$.value)
  }
}
</script>

<style scoped lang="scss">
.dialog {
  .v-overlay__content {
    .card {
      border-radius: 50px;
      padding: 50px;
      background-color: rgba(33, 21, 77, 0.7);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--main-light-color);

      .text-h5 {
        margin-bottom: 25px;
      }

      form {

        .card-buttons {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px 0 0;
        }
      }
    }
  }
}
</style>
