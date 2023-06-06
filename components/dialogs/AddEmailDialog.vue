<template>
  <v-dialog class="dialog" v-model="dialog" width="400" persistent>
    <v-card class="card">
      <button class="close-button" @click.prevent="closeDialog">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close">
      </button>
      <h3 class="title">Укажите почту</h3>
      <v-text-field
          v-model="user.email"
          label="Почта"
          :error-messages="mapErrors(v$.email.$errors)"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
      ></v-text-field>

      <button class="secondary" @click="submit">Оплатить</button>
    </v-card>
  </v-dialog>
</template>

<script setup>
import validation from "~/mixins/validation";
import userSettings from "~/mixins/userSettings";
import apiMapper from "~/mixins/apiMapper";
import billing from '~/mixins/billing'
import {personStore} from "~/store/personStore";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import {email, required} from "@vuelidate/validators";
import {navigateTo} from "nuxt/app";
import {storeToRefs} from "pinia";
import {defineEmits, defineProps, ref, toRefs,} from "vue";

const emit = defineEmits(['closeAddEmailDialog']);

const dialog = true;
const {mapErrors} = validation();
const {updateUserData} = userSettings();
const store = personStore();
const {person} = storeToRefs(store);
const {changePerson} = store;
const {personMapper} = apiMapper();
const {buyRate} = billing();

let props = defineProps({
  idRate: Number,

});

let user = ref({
  email: ''
});

const rules = {
  email: {required, email}
};

const v$ = useVuelidate(rules, user);

async function submit() {
  v$.value.$validate();

  if (!v$.value.$error) {
    await updateUserData(person.value.name, user.value.email)
        .then(response => {
          if (response.status === "success") {
            changePerson(personMapper(response.user, person.value.token));
            if (person.value.email) {
              buyRate(props.idRate);
              closeDialog();
            }
          }
        })
        .catch(error => {
          if (error.status === 401) {
            changePerson({});
            navigateTo('/');
          }
        })
  }
}

function closeDialog() {
  emit('closeAddEmailDialog');
}

</script>

<style scoped lang="scss">
.close-button {

}

.title {
  margin-bottom: 10px;
}

.secondary {
  margin-top: 20px;
}
</style>
