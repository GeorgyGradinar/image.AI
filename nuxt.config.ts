// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({

    modules: [
        // ['@nuxtjs/robots', { /* module options */ }],
        '@pinia/nuxt',
    ],
    // robots: process.env.NODE_ENV !== 'production' ? {
    //     UserAgent: '*',
    //     Disallow: '/',
    //     } : {
    //     UserAgent: '*',
    //     Disallow: '/search',
    //     Allow: '*'
    // },
    alias: {
        "@": resolve(__dirname, "/"),
    },
    router: {trailingSlash: true},
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
