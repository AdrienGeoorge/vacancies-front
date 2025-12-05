import {defineStore} from 'pinia'

const isTokenExpired = (token) => {
    if (!token) return true
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() > payload.exp * 1000
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),

    actions: {
        loginSuccess(data) {
            this.user = data.user
            this.token = data.token

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('jwt_token', data.token)
        },

        logout() {
            this.user = null
            this.token = null

            localStorage.removeItem('user')
            localStorage.removeItem('jwt_token')
        },

        restore() {
            const token = localStorage.getItem('jwt_token')

            if (!token || isTokenExpired(token)) {
                this.logout()
                return
            }

            const saved = localStorage.getItem('user')
            if (saved) {
                this.user = JSON.parse(saved)
            }
        }
    }
})
