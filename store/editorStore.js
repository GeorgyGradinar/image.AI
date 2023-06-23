import {defineStore} from "pinia";
import {ref} from "vue";

export const editorStore = defineStore('editor', () => {
    let tempImages = ref([]);
    let imageUpload = ref();
    let hasActiveEraser = ref(false);
    let currentWidthEraser = ref(10);
    let isSelectElement = ref(false);
    let isActiveMoveNewImages = ref(false);

    function clearEditorStore() {
        tempImages.value = [];
        imageUpload.value = null;
        hasActiveEraser.value = false;
        currentWidthEraser.value = 10;
        isSelectElement.value = false;
        isActiveMoveNewImages.value = false;
    }

    function takeOffAllButton() {
        hasActiveEraser.value = false;
        isSelectElement.value = false;
        isActiveMoveNewImages.value = false;
    }

    function addNewImages(newImage) {
        tempImages.value = [...tempImages.value, newImage];
    }

    function changePositionNewImage(id, y, x) {
        let moveImageId = tempImages.value.findIndex(image => image.id === id);
        tempImages.value[moveImageId] = {
            ...tempImages.value[moveImageId],
            positionX: tempImages.value[moveImageId].positionX + x,
            positionY: tempImages.value[moveImageId].positionY + y,
        }
        tempImages.value = [...tempImages.value]
    }

    function clearTempImages() {
        tempImages.value = [];
    }

    function updateImageUpload(data) {
        imageUpload.value = data;
    }

    function toggleActiveEraser() {
        takeOffAllButton();
        hasActiveEraser.value = !hasActiveEraser.value;
    }

    function changeCurrentWidthEraser(width) {
        currentWidthEraser.value = width;
    }

    function toggleHasSelectElement() {
        takeOffAllButton();
        isSelectElement.value = !isSelectElement.value;
    }

    function toggleIsActiveMoveElement() {
        takeOffAllButton();
        isActiveMoveNewImages.value = !isActiveMoveNewImages.value;
    }

    return {
        clearEditorStore,
        tempImages, addNewImages, changePositionNewImage, clearTempImages,
        imageUpload, updateImageUpload,
        hasActiveEraser, toggleActiveEraser,
        currentWidthEraser, changeCurrentWidthEraser,
        isSelectElement, toggleHasSelectElement,
        isActiveMoveNewImages, toggleIsActiveMoveElement,
    }
})
