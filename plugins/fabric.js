import { fabric } from 'fabric'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(fabric)
})
