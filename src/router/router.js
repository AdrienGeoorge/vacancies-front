import {createRouter, createWebHistory} from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Register from "../components/Auth/Register.vue";
import Dashboard from '../components/Dashboard.vue';
import Profile from '../components/Profile.vue';

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login, meta: {title: 'Bienvenue sur ' + import.meta.env.VITE_APP_NAME}},
    {path: '/register', component: Register, meta: {title: import.meta.env.VITE_APP_NAME + ' - Inscription'}},
    {path: '/password/claim', component: Login, meta: {title: import.meta.env.VITE_APP_NAME + ' - Réinitialisez votre mot de passe'}},
    {path: '/dashboard', component: Dashboard, meta: {title: import.meta.env.VITE_APP_NAME + ' - Tableau de bord'}},
    {path: '/profile', component: Profile},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token');
    if (to.path === '/dashboard' && !token) {
        next('/login');
    } else if (to.path === '/login' && token) {
        next('/dashboard');
    } else {
        next();
    }
})

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = import.meta.env.VITE_APP_NAME
    }
})

export default router;
