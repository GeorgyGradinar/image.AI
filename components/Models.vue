<template>
  <InfoAcceptEmail v-if="isOpenAcceptEmailDialog" @closeLoginDialog="toggleAcceptDialog(false)"></InfoAcceptEmail>

  <AddEmailDialog
      v-if="isOpenAddEmail"
      :idRate="isOpenAddEmailDialog.idRate"
      @closeAddEmailDialog="toggleAddEmailDialog({isOpen:false})" >
  </AddEmailDialog>
</template>

<script setup>
import InfoAcceptEmail from "~/components/dialogs/InfoAcceptEmail";
import {modelsStore} from "~/store/models";
import AddEmailDialog from "./dialogs/AddEmailDialog";
import {storeToRefs} from "pinia";
import {watch} from "vue";

const models = modelsStore();
const {isOpenAcceptDialog, isOpenAddEmailDialog} = storeToRefs(models);
const {toggleAcceptDialog, toggleAddEmailDialog} = models;

let isOpenAcceptEmailDialog = ref(isOpenAcceptDialog.value);
let isOpenAddEmail = ref(isOpenAddEmailDialog.value.isOpen);

watch(isOpenAcceptDialog, (newData) => {
  isOpenAcceptEmailDialog.value = newData;
})

watch(isOpenAddEmailDialog, (newData) => {
  isOpenAddEmail.value = newData.isOpen;
})

</script>

<style scoped lang="scss">

</style>
