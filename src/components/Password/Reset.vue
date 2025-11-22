<template>
  <div class="lg:bg-body dark:bg-body-dark flex items-center justify-center h-full flex-grow">
    <div class="text-gray-900 flex justify-center sm:items-center dark:text-white w-full lg:w-10/12 xl:w-9/12">
      <div class="w-full max-w-screen-lg m-0 lg:m-10 lg:min-h-[32em] lg:shadow lg:rounded-5xl overflow-hidden flex justify-center lg:flex-1 flex-none
                   lg:bg-box dark:lg:bg-box-dark">
        <div class="lg:w-3/6 xl:w-6/12 p-6 sm:px-8 lg:py-5 flex lg:flex-none items-center">
          <div class="flex flex-col px-10">
            <h1 class="mt-2 mb-5 text-xl font-poppins-semi-bold">
              Bienvenue sur <span class="text-teal-500">{{ globalState.APP_NAME }}</span>
            </h1>
            <h1 class="text-2xl font-playfair">
              Changement de mot de passe
            </h1>
            <Form class="w-full flex-1 mt-5" v-slot="{ submitCount }" :validation-schema="schema" @submit="handleReset">
              <div class="relative">
                <Field as="input" :type="showPassword ? 'text' : 'password'" name="password"
                       aria-label="Mot de passe"
                       class="w-full px-6 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200
                                          placeholder-gray-400 text-sm
                                          focus:outline-none focus:border-gray-400 focus:bg-white mt-3
                                          dark:bg-transparent dark:border-gray-300 dark:focus:bg-transparent
                                          dark:placeholder-gray-300"
                       placeholder="Mot de passe"/>
                <button type="button"
                        class="absolute right-4 top-3/4 -translate-y-5 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                        aria-label="Afficher le mot de passe" @click="togglePassword()">
                  <span :class="{ hidden: showPassword }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.964 9.964 0 012.052-3.368M6.72 6.72A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.961 9.961 0 01-4.233 5.233M3 3l18 18"/>
                    </svg>
                  </span>
                  <span :class="{ hidden: !showPassword }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <ErrorMessage name="password" v-slot="{ message }">
                <p v-if="submitCount > 0" class="text-red-500 text-sm mt-1">{{ message }}</p>
              </ErrorMessage>
              <div class="relative">
                <Field as="input" :type="showPasswordRepeat ? 'text' : 'password'" name="password_repeat"
                       aria-label="Répétez le mot de passe"
                       class="w-full px-6 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200
                                          placeholder-gray-400 text-sm
                                          focus:outline-none focus:border-gray-400 focus:bg-white mt-3
                                          dark:bg-transparent dark:border-gray-300 dark:focus:bg-transparent
                                          dark:placeholder-gray-300"
                       placeholder="Répétez le mot de passe"/>
                <button type="button"
                        class="absolute right-4 top-3/4 -translate-y-5 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                        aria-label="Afficher le mot de passe" @click="togglePasswordRepeat()">
                  <span :class="{ hidden: showPasswordRepeat }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.964 9.964 0 012.052-3.368M6.72 6.72A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.961 9.961 0 01-4.233 5.233M3 3l18 18"/>
                    </svg>
                  </span>
                  <span :class="{ hidden: !showPasswordRepeat }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <ErrorMessage name="password_repeat" v-slot="{ message }">
                <p v-if="submitCount > 0" class="text-red-500 text-sm mt-1">{{ message }}</p>
              </ErrorMessage>
              <button class="mt-5 tracking-wide bg-teal-500 border-2 border-teal-400 text-white w-full py-4
                                    rounded-full flex items-center justify-center hover:bg-teal-700
                                    transition-all duration-300 ease-in-out cursor-pointer
                                    focus:shadow-outline focus:outline-none"
                      type="submit">
                <template v-if="isLoading">
                  <svg class="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </template>
                <template v-else>
                  Réinitialiser
                </template>
              </button>
              <p class="mt-6 text-sm text-gray-600 text-center dark:text-gray-200">
                Vous souhaitez revenir à la page de connexion ?
                <router-link to="/login" class="border-b border-gray-500 border-dotted">
                  Cliquez ici !
                </router-link>
              </p>
            </Form>
          </div>
        </div>
        <div class="flex-1 text-center hidden lg:flex">
          <div class="w-full bg-contain bg-center bg-no-repeat mr-14 my-8"
               style="background-image: url('/images/index.png');">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import apiClient from '../../plugin/axios.js'
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import {useToast} from "../../plugin/useToast.js";

const globalState = inject('globalState')
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  try {
    await apiClient.post('/password/verify-token', {
      token: route.params.token,
    })
  } catch (error) {
    useToast().addToast(error?.response?.data?.message || 'Une erreur inconnue est survenue.', 'error')
    return router.push('/')
  }
})

const schema = yup.object({
  password: yup
      .string()
      .required('Le mot de passe est obligatoire.')
      .min(8, 'Le mot de passe doit faire au minimum 8 caractères.'),
  password_repeat: yup
      .string()
      .required('Vous devez confirmer votre mot de passe.')
      .min(8, 'Le mot de passe doit faire au minimum 8 caractères.')
      .equals([yup.ref('password')], 'Les mots de passe ne correspondent pas.'),
})

const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordRepeat = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordRepeat = () => {
  showPasswordRepeat.value = !showPasswordRepeat.value
}

const handleReset = async (values) => {
  isLoading.value = true

  try {
    const response = await apiClient.post('/password/reset', {
      token: route.params.token,
      password: values.password
    })
    useToast().addToast(response.data.message, 'success')
    router.push('/login')
  } catch (error) {
    useToast().addToast(error?.response?.data?.message || 'Une erreur inconnue est survenue.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
