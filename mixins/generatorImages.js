import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {imageGenerationStore} from "~/store/imageGenerationStore";
import {modelsStore} from "~/store/models";
import getRequestOptions from "~/mixins/requestOptions";

export default function generatorImages() {
    const store = personStore();
    const imageStore = imageGenerationStore();
    const {toggleGeneration, addNewImages} = imageStore;
    const models = modelsStore();
    const {toggleSnackBarDone, toggleSnackBarReject } = models;

    function generateImages() {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];
        let currentFilters = store.filters;
        $fetch(`${MAIN_URL}/api/v1/image/processing?height=${currentFilters.size.height}&width=${currentFilters.size.width}&prompt=${currentFilters.description}&negative_prompt=${currentFilters.exception}&is_upscaled=0&count=${currentFilters.parameters.countImages}`,
            getRequestOptions('POST', requestOptions))
            .then(response => {
                if (response.status === 'success') {
                    for (let x = 0; x < +response.image.count; x++) {
                        let randomId = Math.floor(Math.random() * 10000);
                        const loading = {
                            id: randomId,
                            generateId: response.image.id
                        };
                        let loadImages = [...imageStore.images];
                        loadImages.unshift(loading);
                        addNewImages(loadImages)
                    }
                    toggleGeneration(true);
                    getStatusGeneration(response.image.id);
                }
            })
            .catch(error => {
                if (error.statusCode === 500){
                    toggleSnackBarReject({isOpen:true, text: 'Что то пошло не так'})
                }
            })
    }

    function getStatusGeneration(id) {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];

        let interval = setInterval(() => {

            $fetch(`${MAIN_URL}/api/v1/image/status?request_id=${id}`, getRequestOptions('POST', requestOptions))
                .then(response => {
                    if (response.status === "processing") {

                    } else {
                        clearInterval(interval);
                        let images = imageStore.images.filter(image => !image.generateId);
                        addNewImages([...response.images, ...images])
                        toggleGeneration(false);
                        toggleSnackBarDone({isOpen: true, text: 'Изображение сгенерированно'});
                    }
                })
        }, 1000)

        setTimeout(() => {
            let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
            $fetch("https://api.neuro-holst.ru/emulate", getRequestOptions('GET', requestOptions))
        }, 1000)
    }

    function likeImage(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/image/like?image_id=${id}`, getRequestOptions('POST', requestOptions))
            .then(response => console.log(response))
    }

    return {generateImages, likeImage}
}
