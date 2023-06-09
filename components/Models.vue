<template>
  <InfoAcceptEmail v-if="isOpenAcceptDialog" @closeLoginDialog="toggleAcceptDialog(false)"></InfoAcceptEmail>

  <AddEmailDialog
      v-if="isOpenAddEmail"
      :idRate="isOpenAddEmailDialog.idRate"
      @closeAddEmailDialog="toggleAddEmailDialog({isOpen:false})">
  </AddEmailDialog>

  <RegistrationDialog v-if="isOpenRegistrationDialog"
                      @closeRegistrationBlock="toggleRegistrationDialog(false)"></RegistrationDialog>

  <LoginInDialog v-if="isOpenLoginDialog" @closeLoginDialog="toggleLoginDialog(false)"></LoginInDialog>

  <DoneSnackBar
      :openSnackBar="hasOpenSnackBarDone"
      :text-snack-bar="textSnackBarDone"
      @close="toggleSnackBarDone({isOpen:false, text:''})">
  </DoneSnackBar>
  <RejectSnackBar
      :openSnackBar="hasOpenSnackBarReject"
      :text-snack-bar="textSnackBarReject"
      @close="toggleSnackBarReject({isOpen:false, text:''})">
  </RejectSnackBar>

  <BuyMoreCredits
      v-if="isOpenBuyMoreCredits" @close="toggleBuyMoreCredits(false)">
  </BuyMoreCredits>

  <ImageDetails v-if="hasOpenImageDetails"
                :image-src="imageDetailsItem"
                @close="toggleImageDetails({isOpen:false, image:{}})">
  </ImageDetails>

  <ForgotPassword v-if="isOpenForgotPassword" @close="toggleForgotPassword(false)"></ForgotPassword>
</template>

<script setup>
import InfoAcceptEmail from "~/components/dialogs/InfoAcceptEmail";
import AddEmailDialog from "~/components/dialogs/AddEmailDialog";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import LoginInDialog from "~/components/dialogs/LoginInDialog";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import RejectSnackBar from "~/components/sneckbars/RejectSnackBar";
import BuyMoreCredits from "~/components/dialogs/BuyMoreCredits";
import ImageDetails from "~/components/dialogs/ImageDetails";
import {modelsStore} from "~/store/models";
import {storeToRefs} from "pinia";
import {watch} from "vue";
import ForgotPassword from "./dialogs/ForgotPassword";

const models = modelsStore();
const {
  isOpenAcceptDialog,
  isOpenAddEmailDialog,
  isOpenRegistrationDialog,
  isOpenLoginDialog,
  isOpenSnackBarDone,
  isOpenSnackBarReject,
  isOpenBuyMoreCredits,
  isOpenImageDetails,
  isOpenForgotPassword
} = storeToRefs(models);

const {
  toggleAcceptDialog,
  toggleAddEmailDialog,
  toggleRegistrationDialog,
  toggleLoginDialog,
  toggleSnackBarDone,
  toggleSnackBarReject,
  toggleBuyMoreCredits,
  toggleImageDetails,
  toggleForgotPassword
} = models;

let isOpenAddEmail = ref(isOpenAddEmailDialog.value.isOpen);
let hasOpenSnackBarDone = ref(isOpenSnackBarDone.value.isOpen);
let textSnackBarDone = ref(isOpenSnackBarDone.value.text);
let hasOpenSnackBarReject = ref(isOpenSnackBarReject.value.isOpen);
let textSnackBarReject = ref(isOpenSnackBarReject.value.text);
let hasOpenImageDetails = ref(isOpenImageDetails.value.isOpen);
let imageDetailsItem = ref(isOpenImageDetails.value.image);

watch(isOpenAddEmailDialog, (newData) => {
  isOpenAddEmail.value = newData.isOpen;
})

watch(isOpenSnackBarDone, (newData) => {
  hasOpenSnackBarDone.value = newData.isOpen;
  textSnackBarDone.value = newData.text;
})

watch(isOpenSnackBarReject, (newData) => {
  hasOpenSnackBarReject.value = newData.isOpen;
  textSnackBarReject.value = newData.text;
})

watch(isOpenImageDetails, (newData) => {
  hasOpenImageDetails.value = newData.isOpen;
  imageDetailsItem.value = newData.image;
})

</script>

<style scoped lang="scss">

</style>
