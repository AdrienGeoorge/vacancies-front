import {createRouter, createWebHistory} from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Register from "../components/Auth/Register.vue";
import Dashboard from '../components/Dashboard.vue';
import Profile from '../components/Profile.vue';
import Claim from "../components/Password/Claim.vue";
import Reset from "../components/Password/Reset.vue";

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login, meta: {title: 'Bienvenue sur ' + import.meta.env.VITE_APP_NAME}},
    {path: '/register', component: Register, meta: {title: import.meta.env.VITE_APP_NAME + ' - Inscription'}},
    {
        path: '/password/claim',
        component: Claim,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Réinitialisez votre mot de passe'}
    },
    {
        path: '/password/reset/:token',
        component: Reset,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Réinitialisez votre mot de passe'}
    },
    {path: '/dashboard', component: Dashboard, meta: {title: import.meta.env.VITE_APP_NAME + ' - Tableau de bord'}},
    {path: '/profile', component: Profile},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token');

    const isPublicRoute =
        to.path === '/login' ||
        to.path === '/register' ||
        to.path.includes('password')

    if (!token && !isPublicRoute) {
        return next('/login')
    }

    if (token && isPublicRoute) {
        return next('/dashboard')
    }

    return next()
})

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = import.meta.env.VITE_APP_NAME
    }
})

export default router;
