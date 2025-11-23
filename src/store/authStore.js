import { defineStore } from 'pinia'

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
            const saved = localStorage.getItem('user')
            if (saved) {
                this.user = JSON.parse(saved)
            }
        }
    }
})
