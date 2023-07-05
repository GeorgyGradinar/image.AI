// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-simple-robots',
        'nuxt-simple-sitemap',
        'nuxt-schema-org',
    ],
    ssr: true,
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        "~/assets/main.scss",
    ],
    build: {
        transpile: ['vuetify']
    },
    serverMiddleware: ['~/server-middleware/check-spa'],
    router: {
        trailingSlash: false
    },
    robots: {
        siteUrl: 'https://neuro-holst.ru',
        disallow: [
            '/social', '/gallery', '/legal', '/person', '/guides',
            '/transactions', '/referrals', '/dream-booth', '/editor'],
    },
    sitemap: {
        siteUrl: 'https://neuro-holst.ru',
    },
    plugins: [
        {
            src: '@/plugins/fabric',
            mode: 'client'
        }
    ],
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'ico/png', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', type: 'ico/png', href: '/favicon.ico' }
            ]
        }
    },
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://neuro-holst.ru',
        }
    },
    schemaOrg: {
        meta:{
            host: 'https://neuro-holst.ru'
        }
    },
})
