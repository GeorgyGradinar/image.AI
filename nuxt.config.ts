// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        "@nuxtjs/robots",
    ],
    alias: {
        "@": resolve(__dirname, "/"),
    },
    ssr: true,
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        "~/assets/main.scss",
    ],
    build: {
        transpile: ['vuetify'],
    },
    serverMiddleware: ['~/server-middleware/check-spa'],
    router: {
        trailingSlash:  true
    }

})
