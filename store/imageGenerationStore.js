import {defineStore} from "pinia";

export const imageGenerationStore = defineStore('imageStore', () => {
    let isGeneration = ref(false);
    let images = ref([]);
    let getImagePages = ref(1);
    let isShowMainLoader = ref(false);
    let inProgressMoreImages = ref(false);
    let isShowButtonMoreImages = ref(false);

    function toggleGeneration(event) {
        isGeneration.value = event;
    }

    function addOldImages(oldImages) {
        images.value = [...images.value, ...oldImages];
    }

    function addNewImages(newImages) {
        images.value = [...newImages];
    }

    function toggleLike(selectImage) {
        let currentImageIndex = images.value.findIndex(image => image.id === selectImage.id);
        images.value[currentImageIndex] = {
            ...images.value[currentImageIndex],
            ...selectImage
        }
        images.value = [
            ...images.value
        ]
    }

    function deletedImage(id) {
       let selectedId = images.value.findIndex(image => image.id === id);
        images.value.splice(selectedId, 1);
        images.value = [...images.value];
    }

    function clearImages() {
        images.value = [];
    }

    function changeImagePage() {
        getImagePages.value++;
    }

    function clearImagePage() {
        getImagePages.value = 1;
    }

    function toggleShowMainLoader(event) {
        isShowMainLoader.value = event;
    }

    function toggleInProgressMoreImages(event) {
        inProgressMoreImages.value = event;
    }

    function toggleShowButtonMoreImages(event) {
        isShowButtonMoreImages.value = event;
    }


    return {
        isGeneration, toggleGeneration,
        images, addNewImages, addOldImages, clearImages, toggleLike, deletedImage,
        getImagePages, changeImagePage, clearImagePage,
        isShowMainLoader, toggleShowMainLoader,
        inProgressMoreImages, toggleInProgressMoreImages,
        isShowButtonMoreImages, toggleShowButtonMoreImages,
    }
})
