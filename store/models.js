import {defineStore} from "pinia";

export const modelsStore = defineStore('models', () => {
    let isOpenAcceptDialog = ref(false);
    let isOpenAddEmailDialog = ref({
        isOpen: false,
        idRate: null
    });

    function toggleAcceptDialog(event) {
        isOpenAcceptDialog.value = event;
    }

    function toggleAddEmailDialog(payload) {
        isOpenAddEmailDialog.value = {
            isOpen:payload.isOpen,
            idRate:payload.id
        };
    }

    return {isOpenAcceptDialog, toggleAcceptDialog, isOpenAddEmailDialog, toggleAddEmailDialog}
})
