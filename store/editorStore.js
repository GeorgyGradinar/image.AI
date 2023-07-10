import {defineStore} from "pinia";
import {ref} from "vue";

export const editorStore = defineStore('editor', () => {
    let uploadedImage = ref(null);
    let imageUpload = ref();
    let generateImages = ref([]);
    let hasActiveEraser = ref(false);
    let currentWidthEraser = ref(10);
    let isSelectedAllElement = ref(false);
    let currentZoom = ref(1);
    let download = ref(false);
    let setCenter = ref(false);
    let isActiveGenerationLoader = ref(false);
    let callUndo = ref(false);
    let callRedo = ref(false);
    let history = ref({
        undo: [],
        redo: []
    });
    let images = ref([]);

    function clearEditorStore() {
        uploadedImage.value = null;
        imageUpload.value = null;
        generateImages.value = [];
        hasActiveEraser.value = false;
        currentWidthEraser.value = 1;
        isSelectedAllElement.value = false;
        currentZoom.value = 1;
        download.value = false;
        setCenter.value = false;
        isActiveGenerationLoader.value = false;
        history.value = {
            undo: [],
            redo: []
        }
        images.value = [];
    }

    function takeOffAllButton() {
        hasActiveEraser.value = false;
        isSelectedAllElement.value = false;
    }

    function addNewImages(newImage) {
        takeOffAllButton();
        uploadedImage.value = newImage;
    }

    function clearTempImages() {
        uploadedImage.value = null;
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

    function changeCallUndo() {
        callUndo.value = !callUndo.value;

    }

    function changeCallRedo() {
        callRedo.value = !callRedo.value;
    }

    return {
        clearEditorStore,
        uploadedImage, addNewImages, clearTempImages,
        imageUpload, updateImageUpload,
        generateImages, addGeneratedImages, cleanGeneratedImages,
        hasActiveEraser, toggleActiveEraser,
        currentWidthEraser, changeCurrentWidthEraser,
        isSelectedAllElement, toggleHasSelectElement,
        currentZoom, increaseZoom, decreaseZoom, changeCurrentZoom,
        download, callFunctionDownload,
        setCenter, toggleCenter,
        isActiveGenerationLoader, toggleActiveGenerationLoader,
        callUndo, changeCallUndo,
        callRedo, changeCallRedo,
        history,
        images,
    }
})
