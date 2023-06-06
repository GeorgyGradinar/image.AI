import {defineStore} from "pinia";

export const imageGenerationStore = defineStore('image', () => {
    let isGeneration = ref(false);

    function toggleGeneration(event) {
        isGeneration.value = event;
    }

    return {isGeneration, toggleGeneration}
})
