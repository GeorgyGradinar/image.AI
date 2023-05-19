import VueJsTour from '@globalhive/vuejs-tour';
import '@globalhive/vuejs-tour/dist/style.css';

export default defineNuxtPlugin(nuxtApp => {

    nuxtApp.vueApp.use(VueJsTour)
})
