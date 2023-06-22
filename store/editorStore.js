import {defineStore} from "pinia";

export const editorStore = defineStore('editor', () => {
    let imageUpload = ref();
    let hasActiveEraser = ref(false);
    let currentWidthEraser = ref(10);
    let isSelectElement = ref(false);

    function clearEditorStore() {
        imageUpload.value = null;
        hasActiveEraser.value = false;
        currentWidthEraser.value = 10;
        isSelectElement.value = false;
    }

    function updateImageUpload(data) {
        imageUpload.value = data;
    }

    function toggleActiveEraser() {
        hasActiveEraser.value = !hasActiveEraser.value;
    }

    function changeCurrentWidthEraser(width) {
        currentWidthEraser.value = width;
    }

    function toggleHasSelectElement() {
        isSelectElement.value = !isSelectElement.value;
    }

    return {
        clearEditorStore,
        imageUpload, updateImageUpload,
        hasActiveEraser, toggleActiveEraser,
        currentWidthEraser, changeCurrentWidthEraser,
        isSelectElement, toggleHasSelectElement,
    }
})
