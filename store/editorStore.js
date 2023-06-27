import {defineStore} from "pinia";
import {ref} from "vue";

export const editorStore = defineStore('editor', () => {
    let tempImages = ref([]);
    let imageUpload = ref();
    let hasActiveEraser = ref(false);
    let currentWidthEraser = ref(10);
    let isSelectedAllElement = ref(false);

    function clearEditorStore() {
        tempImages.value = null;
        imageUpload.value = null;
        hasActiveEraser.value = false;
        currentWidthEraser.value = 10;
        isSelectedAllElement.value = false;
    }

    function takeOffAllButton() {
        hasActiveEraser.value = false;
        isSelectedAllElement.value = false;
    }

    function addNewImages(newImage) {
        takeOffAllButton();
        tempImages.value =  newImage;
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
        tempImages.value = null;
    }

    function updateImageUpload(data) {
        imageUpload.value = data;
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

    return {
        clearEditorStore,
        tempImages, addNewImages, changePositionNewImage, clearTempImages,
        imageUpload, updateImageUpload,
        hasActiveEraser, toggleActiveEraser,
        currentWidthEraser, changeCurrentWidthEraser,
        isSelectedAllElement, toggleHasSelectElement,
    }
})
