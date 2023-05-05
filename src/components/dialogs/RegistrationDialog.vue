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
import {ref, watch} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {email, required} from '@vuelidate/validators'
import requests from '@/mixins/requests'
import validation from "@/mixins/validation";

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
const emit = defineEmits(['openAcceptDialog', 'openRegistrationDialog'])

let dialog = ref(false);
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
})

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
@import "@/style/dialogs.scss";

.create-account {
  height: 50px;
}


</style>
