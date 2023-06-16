import {navigateTo} from "nuxt/app";
import {personStore} from "~/store/personStore";
import {imagesStore} from "~/store/imageStore";
import {modelsStore} from "~/store/models";
import {transactionStore} from "~/store/transactionStore";

export default function shareFunctions() {
    const store = personStore();
    const {changePerson, reuseParameters} = store;
    const imageStore = imagesStore();
    const {clearImageStore} = imageStore;
    const models = modelsStore();
    const {closeAllDialogs} = models;
    const transactionsStore = transactionStore();
    const {clearTransactionStore} = transactionsStore;

    function prepareLogout() {
        navigateTo('/');
        changePerson({});
        clearImageStore();
        closeAllDialogs();
        clearTransactionStore();
    }

    function reuseImageParameters(image) {
        let filterParameters = {
            model: 'Диффузия v2.1',
            description: image.params.prompt,
            exception: image.params.negative_prompt !== '' ? image.params.negative_prompt : '' ,
            image: null,
            size: {
                width: image.params.width,
                height: image.params.height
            },
            parameters: {
                countImages: 1,
                step: image.params.steps,
                navigation: image.params.similarity,
                seed: null
            }
        }
        reuseParameters(filterParameters);
    }

    return {prepareLogout, reuseImageParameters}
}
