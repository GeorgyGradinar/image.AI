import { createRouter, createWebHistory,  } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../pages/MainPage')
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import('../pages/Editor')
    },
    {
        path: '/text-to-image',
        name: 'text-to-image',
        component: () => import('../pages/TextToImage')
    },
    {
        path: '/dream-booth',
        name: 'dream-booth',
        component: () => import('../pages/DreamBooth')
    },
    {
        path: '/guides',
        name: 'guides',
        component: () => import('../pages/Guides')
    },
    {
        path: '/pricing',
        name: 'Pricing',
        component: () => import('../pages/Pricing')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../pages/person/SettingsPage')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
