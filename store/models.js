import {defineStore} from "pinia";

export const modelsStore = defineStore('models', () => {
    let isOpenAcceptDialog = ref(false);
    let isOpenAddEmailDialog = ref({
        isOpen: false,
        idRate: null
    });
    let isOpenRegistrationDialog = ref(false);
    let isOpenLoginDialog = ref(false);

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

    return {
        isOpenAcceptDialog, toggleAcceptDialog,
        isOpenAddEmailDialog, toggleAddEmailDialog,
        isOpenRegistrationDialog, toggleRegistrationDialog,
        isOpenLoginDialog, toggleLoginDialog
    }
})
