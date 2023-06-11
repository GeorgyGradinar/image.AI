import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {imageGenerationStore} from "~/store/imageGenerationStore";
import {modelsStore} from "~/store/models";
import request from "~/mixins/requests"
import getRequestOptions from "~/mixins/requestOptions";
import {navigateTo} from "nuxt/app";

export default function generatorImages() {
    const store = personStore();
    const {changeFilters, changePerson} = store;
    const {getPersonInfo} = request();
    const imageStore = imageGenerationStore();
    const {toggleGeneration, addNewImages, toggleLike, deletedImage} = imageStore;
    const models = modelsStore();
    const {toggleSnackBarDone, toggleSnackBarReject} = models;

    function generateImages() {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];
        let body = {
            height: store.filters.size.height,
            width: store.filters.size.width,
            prompt: store.filters.description,
            negative_prompt: store.filters.exception,
            is_upscaled: 0,
            count: store.filters.parameters.countImages,
            steps: store.filters.parameters.step,
            engine_id: 1
        }
        $fetch(`${MAIN_URL}/api/v1/image/processing?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions))
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
                    changeFilters('parameters', {
                        ...store.filters.parameters,
                        seed: Math.floor(Math.random() * 10000)
                    });
                }
            })
            .catch(error => {
                if (error.statusCode === 500) {
                    toggleSnackBarReject({isOpen: true, text: 'Что то пошло не так'})
                } else if (error.statusCode === 401) {
                    changePerson({});
                    navigateTo('/');
                }
            })
    }

    function getStatusGeneration(id) {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];
        let interval = setInterval(() => {
            $fetch(`${MAIN_URL}/api/v1/image/status?request_id=${id}`, getRequestOptions('POST', requestOptions))
                .then(response => {
                    console.log(response)
                    if (response.status === "processing") {

                    } else {
                        clearInterval(interval);
                        let images = imageStore.images.filter(image => !image.generateId);
                        addNewImages([...response.images, ...images])
                        toggleGeneration(false);
                        toggleSnackBarDone({isOpen: true, text: 'Изображение сгенерированно'});
                        getPersonInfo();
                    }
                })
        }, 1000)
    }

    function likeImage(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/image/like?image_id=${id}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                toggleLike(response.image);
                if (response.image.is_liked) {
                    toggleSnackBarDone({isOpen: true, text: 'Изображение добавленно в избранные'})
                } else {
                    toggleSnackBarDone({isOpen: true, text: 'Изображение удалено из избранного'})
                }
            })
            .catch(() => toggleSnackBarReject({isOpen: true, text: 'Что то пошло не так'}))
    }

    function deleteImage(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];

        $fetch(`${MAIN_URL}/api/v1/image/remove?image_id=${id}`, getRequestOptions('DELETE', requestOptions))
            .then(() => {
                deletedImage(id)
                toggleSnackBarDone({isOpen: true, text: 'Изображение удалено'})
            })
            .catch(() => toggleSnackBarReject({isOpen: true, text: 'Что то пошло не так'}))
    }

    return {
        generateImages,
        likeImage,
        deleteImage,
    }
}
