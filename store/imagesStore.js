import {defineStore} from "pinia";

export const imagesStore = defineStore('generationImage', () => {
    let generatedImages = ref([1, 2]);

    return {generatedImages}
})
