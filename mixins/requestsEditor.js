import {editorStore} from "~/store/editorStore"

export default function requestsEditor() {
    const editor = editorStore();
    const {addGeneratedImages} = editor;

    function generateImage() {
        addGeneratedImages([
            'image(5).webp',
            'image(11).webp',
            'image(23).webp'
        ]);
    }

    return {
        generateImage,
    }
}
