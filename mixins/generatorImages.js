import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {imagesStore} from "~/store/imageStore";
import {modelsStore} from "~/store/models";
import request from "~/mixins/requests"
import getRequestOptions from "~/mixins/requestOptions";
import shareFunctions from "~/mixins/shareFunctions"

export default function generatorImages() {
    const store = personStore();
    const {changeFilters, changePerson} = store;
    const {getPersonInfo} = request();
    const imageStore = imagesStore();
    const {
        toggleGeneration,
        addNewImages,
        toggleLike,
        deletedImage,
        changeTotalImages,
        toggleShowButtonMoreImages,
        changeSizeParameters,
        changeImagePage
    } = imageStore;
    const models = modelsStore();
    const {toggleSnackBarDone, toggleSnackBarReject} = models;
    const {prepareLogout} = shareFunctions();

    let interval = ref(null);

    function getModel() {
        $fetch(`${MAIN_URL}/api/v1/engine/get?engine_id=1`, { method: 'GET',  redirect: 'follow'})
            .then(response => {
                let newSizeParameters = {
                    id: response.engine.id,
                    costFactor: response.engine.cost_factor,
                    minWidth: response.engine.min_width,
                    maxWidth: response.engine.max_width,
                    minHeight: response.engine.min_height,
                    maxHeight: response.engine.max_height
                }
                changeSizeParameters(newSizeParameters);
            })
    }

    function generateImages(id) {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];
        let body = {
            height: store.filters.size.height,
            width: store.filters.size.width,
            prompt: store.filters.description,
            negative_prompt: store.filters.exception,
            is_upscaled: 0,
            count: store.filters.parameters.countImages,
            steps: store.filters.parameters.step,
            engine_id: 1,
            seeds: store.filters.parameters.seed,
            similarity: store.filters.parameters.navigation
        }
        $fetch(`${MAIN_URL}/api/v1/image/processing?${new URLSearchParams(body)}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                if (response.status === 'success') {
                    getStatusGeneration(response.image.id, id);
                    changeFilters('parameters', {
                        ...store.filters.parameters,
                        seed: Math.floor(Math.random() * 10000)
                    });
                }
            })
            .catch(error => {
                toggleGeneration(false);
                toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'})
                let images = imageStore.images.filter(image => image.id !== id);
                addNewImages([...images]);
                if (error.statusCode === 401) {
                    clearInterval(interval.value);
                    prepareLogout();
                }
            })
    }

    function getStatusGeneration(responseId, generateId) {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];
        interval.value = setInterval(() => {
            $fetch(`${MAIN_URL}/api/v1/image/status?request_id=${responseId}`, getRequestOptions('POST', requestOptions))
                .then(response => {
                    if (response.status !== "processing") {
                        console.log(response)
                        clearInterval(interval.value);
                        let images = imageStore.images.filter(image => image.id !== generateId);
                        addNewImages([...response.images, ...images]);
                        toggleGeneration(false);
                        toggleSnackBarDone({isOpen: true, text: 'Изображение сгенерированно'});
                        getPersonInfo();
                    }
                })
                .catch(error => {
                    toggleGeneration(false);
                    toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'});
                    if (error.statusCode === 401) {
                        clearInterval(interval.value);
                        prepareLogout();
                    }
                })
        }, 1000);
    }

    function likeImage(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
        $fetch(`${MAIN_URL}/api/v1/image/like?image_id=${id}`, getRequestOptions('POST', requestOptions))
            .then(response => {
                toggleLike(response.image);
                if (response.image.is_liked) {
                    toggleSnackBarDone({isOpen: true, text: 'Изображение добавленно в избранные'});
                } else {
                    toggleSnackBarDone({isOpen: true, text: 'Изображение удалено из избранного'});
                }
            })
            .catch(() => {
                toggleGeneration(false);
                toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'});
                if (error.statusCode === 401) {
                    clearInterval(interval.value);
                    prepareLogout();
                }
            })
    }

    function deleteImage(id) {
        let requestOptions = [HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];

        $fetch(`${MAIN_URL}/api/v1/image/remove?image_id=${id}`, getRequestOptions('DELETE', requestOptions))
            .then(() => {
                deletedImage(id);
                toggleSnackBarDone({isOpen: true, text: 'Изображение удалено'});
                changeTotalImages(imageStore.totalImages - 1)

                if (imageStore.totalImages > imageStore.images.length && imageStore.getImagePages > 1) {
                    changeImagePage(imageStore.getImagePages - 1);
                }
            })
            .catch(() => {
                toggleGeneration(false);
                toggleSnackBarReject({isOpen: true, text: 'Что-то пошло не так'});
                if (error.statusCode === 401) {
                    clearInterval(interval.value);
                    prepareLogout();
                }
            })
    }


    return {
        getModel,
        generateImages,
        likeImage,
        deleteImage,
    }
}
