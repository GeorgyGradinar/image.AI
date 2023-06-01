import {defineNuxtRouteMiddleware, useRouter} from "nuxt/app";
import {ACCOUNT_STORAGE_KEY} from "~/constants";
import {ref} from "vue";

export default defineNuxtRouteMiddleware((to, from) => {
    let savedPerson = process.client && localStorage.getItem(ACCOUNT_STORAGE_KEY);
    let person = ref(savedPerson ? JSON.parse(savedPerson) : '');
    const router = useRouter();

    if (to.meta.middleware){
        if (!person.value.id){
           return router.push({path: '/'})
        }
    }
});
