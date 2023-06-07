import {defineStore} from "pinia";

export const imageGenerationStore = defineStore('imageStore', () => {
    let isGeneration = ref(false);
    let images = ref([]);
    let getImagePages = ref(1);
    let isShowMoreImages = ref(false);
    let isShowLoaderMoreImages = ref(false);
    let isShowMainLoader = ref(false);

    function toggleGeneration(event) {
        isGeneration.value = event;
    }

    function addOldImages(oldImages) {
        images.value = [...images.value, ...oldImages];
    }

    function addNewImages(newImages){
        images.value = [...newImages];
    }

    function clearImages(){
        images.value = [];
    }

    function changeImagePage() {
        getImagePages.value++;
    }

    function toggleShowMoreImages(event) {
        isShowMoreImages.value = event;

    }

    function toggleLoaderShowMoreImages(event) {
        isShowLoaderMoreImages.value = event;

    }

    function toggleShowMainLoader(event){
        isShowMainLoader.value = event;
    }


    return {
        isGeneration, toggleGeneration,
        images, addNewImages, addOldImages, clearImages,
        getImagePages, changeImagePage,
        isShowMoreImages, toggleShowMoreImages,
        isShowLoaderMoreImages, toggleLoaderShowMoreImages,
        isShowMainLoader, toggleShowMainLoader,
    }
})
