import {defineStore} from "pinia";

export const imagesStore = defineStore('imageStore', () => {
    let isGeneration = ref(false);
    let images = ref([]);
    let getImagePages = ref(1);
    let isShowMainLoader = ref(false);
    let inProgressMoreImages = ref(false);
    let isShowButtonMoreImages = ref(false);
    let totalImages = ref(null);
    let sizeParameters = ref({
        id: null,
        minWidth: null,
        maxWidth: null,
        minHeight: null,
        maxHeight: null
    })

    function clearImageStore() {
        isGeneration.value = false;
        images.value = [];
        getImagePages.value = 1;
        isShowMainLoader.value = false;
        inProgressMoreImages.value = false;
        isShowButtonMoreImages.value = false;
        totalImages.value = null;
        sizeParameters.value = {
            id: null,
            minWidth: null,
            maxWidth: null,
            minHeight: null,
            maxHeight: null
        }
    }

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

    function changeImagePage(currentPage) {
        getImagePages.value = currentPage;
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

    function changeTotalImages(count) {
        totalImages.value = count;
    }

    function changeSizeParameters(parameters) {
        sizeParameters.value = {
            ...parameters
        }
    }

    return {
        clearImageStore,
        isGeneration, toggleGeneration,
        images, addNewImages, addOldImages, clearImages, toggleLike, deletedImage,
        getImagePages, changeImagePage, clearImagePage,
        isShowMainLoader, toggleShowMainLoader,
        inProgressMoreImages, toggleInProgressMoreImages,
        isShowButtonMoreImages, toggleShowButtonMoreImages,
        totalImages, changeTotalImages,
        sizeParameters, changeSizeParameters,
    }
})
