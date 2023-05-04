import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const personStore = defineStore('store', () => {
   let person = ref({id: 3245})

    return { person }
})
