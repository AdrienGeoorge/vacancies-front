import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/Auth/Login.vue'
import Register from "../components/Auth/Register.vue"
import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import Claim from "../components/Password/Claim.vue"
import Reset from "../components/Password/Reset.vue"

const routes = [
    {path: '/', name: 'index', redirect: '/login'},
    {path: '/login', name: 'login', component: Login, meta: {title: 'Bienvenue sur ' + import.meta.env.VITE_APP_NAME}},
    {path: '/register', name: 'register', component: Register, meta: {title: import.meta.env.VITE_APP_NAME + ' - Inscription'}},
    {
        path: '/password/claim',
        name: 'password-claim',
        component: Claim,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Réinitialisez votre mot de passe'}
    },
    {
        path: '/password/reset/:token',
        name: 'password-reset',
        component: Reset,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Réinitialisez votre mot de passe'}
    },
    {path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {title: import.meta.env.VITE_APP_NAME + ' - Tableau de bord'}},
    {path: '/profile', name: 'profile', component: Profile},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token')

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

export default router
