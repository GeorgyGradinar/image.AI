import {defineStore} from "pinia";

export const modelsStore = defineStore('models', () => {
    let isOpenAcceptDialog = ref(false);

    function toggleAcceptDialog(event) {
        isOpenAcceptDialog.value = event;
    }

    return {isOpenAcceptDialog, toggleAcceptDialog}
})
