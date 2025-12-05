import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/Auth/Login.vue'
import Register from "../components/Auth/Register.vue"
import Dashboard from '../components/Dashboard.vue'
import Claim from "../components/Password/Claim.vue"
import Reset from "../components/Password/Reset.vue"
import CreateTrip from "../components/Trip/CreateTrip.vue"
import ShowTrip from "../components/Trip/ShowTrip.vue"
import {useAuthStore} from "../store/authStore.js"

const routes = [
    {path: '/', name: 'index', redirect: '/login'},
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {title: 'Bienvenue sur ' + import.meta.env.VITE_APP_NAME}
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Inscription'}
    },
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
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Tableau de bord'}
    },
    {
        path: '/trip/create',
        name: 'trip_create',
        component: CreateTrip,
        meta: {title: import.meta.env.VITE_APP_NAME + ' - Création de votre voyage'}
    },
    {
        path: '/trip/edit/:id',
        name: 'trip_edit',
        component: CreateTrip,
        meta: {
            title: import.meta.env.VITE_APP_NAME + ' - Edition de votre voyage',
            navigationTitle: 'Edition d\'un voyage existant'
        },
    },
    {path: '/trip/show/:id', name: 'trip_show', component: ShowTrip},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    auth.restore()

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

    const navigationTitle = document.getElementById('navigation-title')
    if (navigationTitle && to.meta.navigationTitle) {
        navigationTitle.innerHTML = to.meta.navigationTitle
    }
})

export default router
