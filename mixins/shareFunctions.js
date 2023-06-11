import {personStore} from "~/store/personStore";
import {navigateTo} from "nuxt/app";
import {imageGenerationStore} from "~/store/imageGenerationStore";
import {modelsStore} from "~/store/models";

export default function shareFunctions() {
    const store = personStore();
    const {changePerson, reuseParameters} = store;
    const imageStore = imageGenerationStore();
    const {toggleGeneration, toggleShowMainLoader} = imageStore;
    const models = modelsStore();
    const {closeAllDialogs} = models;
    const {clearImages, clearImagePage} = imageStore;

    function prepareLogout() {
        navigateTo('/');
        changePerson({});
        toggleGeneration(false);
        toggleShowMainLoader(false);
        closeAllDialogs();
        clearImages();
        clearImagePage();
    }

    function reuseImageParameters(image) {
        let filterParameters = {
            model: 'Диффузия v2.1',
            description: image.params.prompt,
            exception: image.params.negative_prompt !== 'null' ? image.params.negative_prompt : '' ,
            image: null,
            size: {
                width: image.params.width,
                height: image.params.height
            },
            parameters: {
                countImages: 1,
                step: image.params.steps,
                navigation: image.params.similarity,
                seed: image.params.seeds
            }
        }
        reuseParameters(filterParameters);
    }

    return {prepareLogout, reuseImageParameters}
}
