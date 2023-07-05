import {defineStore} from "pinia";
import {ref} from "vue";

export const editorStore = defineStore('editor', () => {
    let tempImages = ref(null);
    let imageUpload = ref();
    let generateImages = ref([]);
    let hasActiveEraser = ref(false);
    let currentWidthEraser = ref(10);
    let isSelectedAllElement = ref(false);
    let currentZoom = ref(1);
    let download = ref(false);
    let setCenter = ref(false);
    let isActiveGenerationLoader = ref(false);

    function clearEditorStore() {
        tempImages.value = null;
        imageUpload.value = null;
        generateImages.value = [];
        hasActiveEraser.value = false;
        currentWidthEraser.value = 1;
        isSelectedAllElement.value = false;
        currentZoom.value = 1;
        download.value = false;
        setCenter.value = false;
        isActiveGenerationLoader.value = false;
    }

    function takeOffAllButton() {
        hasActiveEraser.value = false;
        isSelectedAllElement.value = false;
    }

    function addNewImages(newImage) {
        takeOffAllButton();
        tempImages.value = newImage;
    }

    function clearTempImages() {
        tempImages.value = null;
    }

    function updateImageUpload(data) {
        imageUpload.value = data;
    }

    function addGeneratedImages(images) {
        generateImages.value = images;
    }

    function cleanGeneratedImages() {
        generateImages.value = [];
    }

    function toggleActiveEraser(isActive) {
        takeOffAllButton();
        hasActiveEraser.value = isActive;
    }

    function changeCurrentWidthEraser(width) {
        currentWidthEraser.value = width;
    }

    function toggleHasSelectElement(isActive) {
        takeOffAllButton();
        isSelectedAllElement.value = isActive;
    }

    function increaseZoom() {
        currentZoom.value = currentZoom.value > 20 ? currentZoom.value : currentZoom.value + 0.1;
    }

    function decreaseZoom() {
        currentZoom.value = currentZoom.value < 0.11 ? currentZoom.value : currentZoom.value - 0.1;
    }

    function changeCurrentZoom(data) {
        currentZoom.value = data;
    }

    function callFunctionDownload() {
        download.value = !download.value;
    }

    function toggleCenter() {
        setCenter.value = !setCenter.value;
    }

    function toggleActiveGenerationLoader(isActive) {
        isActiveGenerationLoader.value = isActive;
    }

    return {
        clearEditorStore,
        tempImages, addNewImages, clearTempImages,
        imageUpload, updateImageUpload,
        generateImages, addGeneratedImages, cleanGeneratedImages,
        hasActiveEraser, toggleActiveEraser,
        currentWidthEraser, changeCurrentWidthEraser,
        isSelectedAllElement, toggleHasSelectElement,
        currentZoom, increaseZoom, decreaseZoom, changeCurrentZoom,
        download, callFunctionDownload,
        setCenter, toggleCenter,
        isActiveGenerationLoader, toggleActiveGenerationLoader,
    }
})
