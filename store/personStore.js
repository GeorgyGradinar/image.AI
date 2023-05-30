import {defineStore} from "pinia";
import {ref} from "vue";
import {ACCOUNT_STORAGE_KEY} from "~/constants";

export const personStore = defineStore('store', () => {
    let savedPerson = process.client && localStorage.getItem(ACCOUNT_STORAGE_KEY);
    let person = ref(savedPerson ? JSON.parse(savedPerson) : '')
    let imagesData = ref({images: [], newImages: []});
    let filters = ref({
        model: 'Диффузия v2.1',
        description: '',
        exception: '',
        image: null,
        size: {
            width: 512,
            height: 512
        },
        parameters: {
            countImages: 1,
            step: 5,
            navigation: 2,
            seed: null
        },
    });
    let referralId = ref('');

    function toggleFavorite(id) {
        let image = imagesData.value.images.find((image) => image.id === id);
        image.like = !image.like;
    }

    function deleteImage(id) {
        let idImage = imagesData.value.images.findIndex((image) => image.id === id);
        imagesData.value.images.splice(idImage, 1);
    }

    function changeFilters(parameters, data) {
        filters.value = {
            ...filters.value,
            [parameters]: data,
        }
    }

    function reuseParameters(parameters) {
        filters.value = {
            ...filters.value,
            ...parameters
        }
    }

    function changeCredits(currentCredit) {
        person.value = {
            ...person.value,
            credits: currentCredit
        }
    }

    return {person, filters, imagesData, referralId, toggleFavorite, deleteImage, changeFilters,  reuseParameters, changeCredits}
})
