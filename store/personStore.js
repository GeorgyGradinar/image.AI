import {defineStore} from "pinia";
import {ref} from "vue";
import {ACCOUNT_STORAGE_KEY} from "~/constants";

export const personStore = defineStore('store', () => {
    let person = ref({});
    let filters = ref({
        model: 'Диффузия v2.1',
        description: '',
        exception: 'Блюр, размытость, мультик',
        image: null,
        size: {
            width: 512,
            height: 512
        },
        parameters: {
            countImages: 3,
            step: 25,
            navigation: 5,
            seed: null
        }
    });
    let referralId = ref(null);

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
        person, changePerson,
        filters, changeFilters, reuseParameters,
        referralId,
        changeCredits,
    }
})
