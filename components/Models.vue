<template>
  <InfoAcceptEmail v-if="isOpenAcceptEmailDialog" @closeLoginDialog="toggleAcceptDialog(false)"></InfoAcceptEmail>

  <AddEmailDialog
      v-if="isOpenAddEmail"
      :idRate="isOpenAddEmailDialog.idRate"
      @closeAddEmailDialog="toggleAddEmailDialog({isOpen:false})" >
  </AddEmailDialog>

  <RegistrationDialog v-if="isOpenRegistrationDialog" @closeRegistrationBlock="toggleRegistrationDialog(false)"></RegistrationDialog>

  <LoginInDialog v-if="isOpenLogin" @closeLoginDialog="toggleLoginDialog(false)"></LoginInDialog>
</template>

<script setup>
import InfoAcceptEmail from "~/components/dialogs/InfoAcceptEmail";
import AddEmailDialog from "~/components/dialogs/AddEmailDialog";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import LoginInDialog from "~/components/dialogs/LoginInDialog";
import {modelsStore} from "~/store/models";
import {storeToRefs} from "pinia";
import {watch} from "vue";

const models = modelsStore();
const {isOpenAcceptDialog, isOpenAddEmailDialog, isOpenRegistrationDialog, isOpenLoginDialog} = storeToRefs(models);
const {toggleAcceptDialog, toggleAddEmailDialog, toggleRegistrationDialog, toggleLoginDialog} = models;

let isOpenAcceptEmailDialog = ref(isOpenAcceptDialog.value);
let isOpenAddEmail = ref(isOpenAddEmailDialog.value.isOpen);
let isOpenRegistration = ref(isOpenRegistrationDialog.value);
let isOpenLogin = ref(false);

watch(isOpenAcceptDialog, (newData) => {
  isOpenAcceptEmailDialog.value = newData;
})

watch(isOpenAddEmailDialog, (newData) => {
  isOpenAddEmail.value = newData.isOpen;
})

watch(isOpenRegistrationDialog, (newData) => {
  isOpenRegistration.value = newData;
})

watch(isOpenLoginDialog, (newData) => {
  isOpenLogin.value = newData;
})

</script>

<style scoped lang="scss">

</style>
