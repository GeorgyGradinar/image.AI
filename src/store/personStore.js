import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {ACCOUNT_STORAGE_KEY} from "@/constants";

export const personStore = defineStore('store', () => {
    const savedPerson = localStorage.getItem(ACCOUNT_STORAGE_KEY);
   let person = ref(savedPerson ? JSON.parse(savedPerson) : {id: 3245})

    return { person }
})
