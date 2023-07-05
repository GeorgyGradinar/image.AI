import {editorStore} from "~/store/editorStore"

export default function requestsEditor() {
    const editor = editorStore();
    const {addGeneratedImages, toggleActiveGenerationLoader} = editor;

    function generateImage() {
        toggleActiveGenerationLoader(true);
        setTimeout(() => {
            addGeneratedImages([
                'image(5).webp',
                'image(11).webp',
                'image(23).webp',
                'image (18) (1).jpeg'
            ]);
            toggleActiveGenerationLoader(false);
        }, 3000)

    }

    function saveCanvas(canvas) {
        localStorage.setItem('canvas', canvas);
    }

    function getCanvasData() {
        return process.client && localStorage.getItem('canvas');
    }

    return {
        generateImage, saveCanvas, getCanvasData,
    }
}
