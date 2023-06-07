import {defineStore} from "pinia";

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
    })

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

    return {
        isOpenAcceptDialog, toggleAcceptDialog,
        isOpenAddEmailDialog, toggleAddEmailDialog,
        isOpenRegistrationDialog, toggleRegistrationDialog,
        isOpenLoginDialog, toggleLoginDialog,
        isOpenSnackBarDone, toggleSnackBarDone,
        isOpenSnackBarReject, toggleSnackBarReject,
        isOpenBuyMoreCredits, toggleBuyMoreCredits,
        isOpenImageDetails, toggleImageDetails,
    }
});
