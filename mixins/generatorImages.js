import {HEADER_PARAMETERS, MAIN_URL} from "~/config";
import {personStore} from "~/store/personStore";
import {imageGenerationStore} from "~/store/imageGeneration";
import getRequestOptions from "~/mixins/requestOptions";

export default function generatorImages() {
    let store = personStore();
    let image = imageGenerationStore();
    let {toggleGeneration} = image;

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

                        let loadImages = [...store.imagesData.images];
                        loadImages.unshift(loading);

                        store.imagesData = {
                            ...store.imagesData,
                            images: loadImages,
                        }
                    }
                    console.log(response.image.id)
                    getStatusGeneration(response.image.id);
                }
            })
            .catch(error => console.log(error))
    }

    function getStatusGeneration(id) {
        let requestOptions = [HEADER_PARAMETERS.authorization, HEADER_PARAMETERS.accept];

        let interval = setInterval(() => {

            $fetch(`${MAIN_URL}/api/v1/image/status?request_id=${id}`, getRequestOptions('POST', requestOptions))
                .then(response => {
                    if (response.status === "processing") {

                    } else {
                        clearInterval(interval);
                        // response.images.forEach(image => !image.generateId)
                        let image = store.imagesData.images.filter(image => !image.generateId)
                        image = [...response.images, ...image]
                        store.imagesData = {
                            images: image
                        }
                        toggleGeneration(false);
                    }
                })
        }, 1000)

        setTimeout(() => {
            let requestOptions = [ HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization];
            $fetch("https://api.neuro-holst.ru/emulate", getRequestOptions('GET', requestOptions))
        }, 1000)
    }

    function getRequestOptions(typeRequest, payload) {
        let myHeaders = new Headers();
        payload.forEach(headerElement => {
            if (headerElement.key === 'Authorization') {
                myHeaders.append(headerElement.key, `${headerElement.body} ${store.person.token}`);
            } else {
                myHeaders.append(headerElement.key, headerElement.body);
            }
        });

        return {
            method: typeRequest,
            headers: myHeaders,
            redirect: 'follow'
        };
    }

    return {generateImages}
}
