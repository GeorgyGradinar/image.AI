<template>
  <InfoAcceptEmail v-if="isOpenAcceptEmailDialog" @closeLoginDialog="toggleAcceptDialog(false)"></InfoAcceptEmail>
</template>

<script setup>
import InfoAcceptEmail from "~/components/dialogs/InfoAcceptEmail";
import {modelsStore} from "~/store/models";

import {storeToRefs} from "pinia";
import {watch} from "vue";

const models = modelsStore();
const {isOpenAcceptDialog} = storeToRefs(models);
const {toggleAcceptDialog} = models;

let isOpenAcceptEmailDialog = ref(isOpenAcceptDialog.value);

watch(isOpenAcceptDialog, (newData) => {
  isOpenAcceptEmailDialog.value = newData;
})

</script>

<style scoped lang="scss">

</style>
