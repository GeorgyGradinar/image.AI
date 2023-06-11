import {defineStore} from "pinia";
import {ref} from "vue";

export const modelsStore = defineStore('models', () => {
    let isOpenAcceptDialog = ref(false);
    let isOpenAddEmailDialog = ref({
        isOpen: false,
        idRate: null
    });
    let isOpenRegistrationDialog = ref(false);
    let isOpenLoginDialog = ref(false);
    let isOpenSnackBarDone = ref({
        isOpen: false,
        text: ''
    });
    let isOpenSnackBarReject = ref({
        isOpen: false,
        text: ''
    });
    let isOpenBuyMoreCredits = ref(false);
    let isOpenImageDetails = ref({
        isOpen: false,
        image: {}
    });
    let errorMessageRegistration = ref('');
    let isOpenForgotPassword = ref(false);

    function closeAllDialogs(){
        isOpenAcceptDialog.value = false;
        isOpenAddEmailDialog.value = {
            isOpen: false,
            idRate: null
        };
        isOpenRegistrationDialog.value = false;
        isOpenLoginDialog.value = false;
        isOpenSnackBarDone.value = {
            isOpen: false,
            text: ''
        };
        isOpenSnackBarReject.value = {
            isOpen: false,
            text: ''
        };
        isOpenBuyMoreCredits.value = false;
        isOpenImageDetails.value = {
            isOpen: false,
            image: {}
        };
        errorMessageRegistration.value = '';
        isOpenForgotPassword.value = false;
    }

    function toggleAcceptDialog(event) {
        isOpenAcceptDialog.value = event;
    }

    function toggleAddEmailDialog(payload) {
        isOpenAddEmailDialog.value = {
            isOpen: payload.isOpen,
            idRate: payload.id
        };
    }

    function toggleRegistrationDialog(event) {
        isOpenRegistrationDialog.value = event;
        if (!event) {
            changeErrorMessageRegistration('');
        }
    }

    function toggleLoginDialog(event) {
        isOpenLoginDialog.value = event;
    }

    function toggleSnackBarDone(payload) {
        isOpenSnackBarDone.value = {
            isOpen: payload.isOpen,
            text: payload.text
        };
    }

    function toggleSnackBarReject(payload) {
        isOpenSnackBarReject.value = {
            isOpen: payload.isOpen,
            text: payload.text
        };
    }

    function toggleBuyMoreCredits(event) {
        isOpenBuyMoreCredits.value = event;
    }

    function toggleImageDetails(payload) {
        isOpenImageDetails.value = {
            isOpen: payload.isOpen,
            image: payload.image
        }
    }

    function changeErrorMessageRegistration(text) {
        errorMessageRegistration.value = text;
    }

    function toggleForgotPassword(event) {
        isOpenForgotPassword.value = event;
    }

    return {
        closeAllDialogs,
        isOpenAcceptDialog, toggleAcceptDialog,
        isOpenAddEmailDialog, toggleAddEmailDialog,
        isOpenRegistrationDialog, toggleRegistrationDialog,
        isOpenLoginDialog, toggleLoginDialog,
        isOpenSnackBarDone, toggleSnackBarDone,
        isOpenSnackBarReject, toggleSnackBarReject,
        isOpenBuyMoreCredits, toggleBuyMoreCredits,
        isOpenImageDetails, toggleImageDetails,
        errorMessageRegistration, changeErrorMessageRegistration,
        isOpenForgotPassword, toggleForgotPassword,
    }
});
