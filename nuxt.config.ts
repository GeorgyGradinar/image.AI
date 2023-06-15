// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-simple-robots'
    ],
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
    },
    robots: {
        siteUrl: 'https://neuro-holst.ru',
        disallow: [
            '/social', '/gallery', '/legal', '/person', '/guides',
            '/transactions', '/referrals', '/dream-booth', '/editor'],
    }

})
