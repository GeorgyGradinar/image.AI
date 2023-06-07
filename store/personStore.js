import {defineStore} from "pinia";
import {ref} from "vue";
import {ACCOUNT_STORAGE_KEY} from "~/constants";

export const personStore = defineStore('store', () => {
    let person = ref({});

    let imagesData = ref({images: [], newImages: []});
    let filters = ref({
        model: 'Диффузия v2.1',
        description: '',
        exception: null,
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

    function changePerson(data) {
        person.value = {
            ...data
        }
        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(person.value));
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

    return {
        person,
        filters,
        imagesData,
        referralId,
        changeFilters,
        reuseParameters,
        changeCredits,
        changePerson,
    }
})
