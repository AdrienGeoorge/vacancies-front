<template>
  <div class="lg:bg-body dark:bg-body-dark flex items-center justify-center h-[100vh] flex-grow">
    <div class="text-gray-900 flex justify-center sm:items-center dark:text-white w-full lg:w-10/12 xl:w-9/12">
      <div class="w-full max-w-screen-lg m-0 lg:m-10 lg:min-h-[34em] lg:shadow lg:rounded-5xl overflow-hidden flex justify-center lg:flex-1 flex-none
                   lg:bg-box dark:lg:bg-box-dark">
        <div class="lg:w-3/6 xl:w-6/12 p-6 sm:px-8 lg:py-5 flex lg:flex-none items-center">
          <div class="flex flex-col px-10">
            <h1 class="mt-2 mb-5 text-xl font-poppins-semi-bold">
              Bienvenue sur <span class="text-teal-500">{{ appName }}</span>
            </h1>
            <h1 class="text-3xl font-playfair">
              Connectez-vous
            </h1>
            <Form class="w-full flex-1 mt-5" v-slot="{ submitCount }" :validation-schema="schema" @submit="handleLogin">
              <Field as="input" name="email" type="email" aria-label="Adresse mail"
                     class="w-full px-6 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200
                                         placeholder-gray-400 text-sm
                                         focus:outline-none focus:border-gray-400 focus:bg-white
                                         dark:bg-transparent dark:border-gray-300 dark:focus:bg-transparent
                                         dark:placeholder-gray-300"
                     placeholder="Adresse mail" autocomplete="email"/>
              <ErrorMessage name="email" v-slot="{ message }">
                <p v-if="submitCount > 0" class="text-red-500 text-sm mt-1">{{ message }}</p>
              </ErrorMessage>
              <div class="relative">
                <Field as="input" :type="showPassword ? 'text' : 'password'" name="password"
                       aria-label="Mot de passe"
                       class="w-full px-6 py-3 rounded-2xl font-medium bg-gray-100 border border-gray-200
                                          placeholder-gray-400 text-sm
                                          focus:outline-none focus:border-gray-400 focus:bg-white mt-3
                                          dark:bg-transparent dark:border-gray-300 dark:focus:bg-transparent
                                          dark:placeholder-gray-300"
                       placeholder="Mot de passe" autocomplete="current-password"/>
                <button type="button"
                        class="absolute right-4 top-3/4 -translate-y-5 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                        aria-label="Afficher le mot de passe" @click="togglePassword()">
                  <EyeIcon v-if="showPassword" class="block size-5" aria-hidden="true"/>
                  <EyeSlashIcon v-if="!showPassword" class="block size-5" aria-hidden="true"/>
                </button>
              </div>
              <ErrorMessage name="password" v-slot="{ message }">
                <p v-if="submitCount > 0" class="text-red-500 text-sm mt-1">{{ message }}</p>
              </ErrorMessage>
              <p class="my-5 text-sm text-gray-600 text-center dark:text-gray-200">
                Mot de passe oublié ? Changez-le
                <router-link to="/password/claim" class="border-b border-gray-500 border-dotted">
                  en cliquant ici
                </router-link>
              </p>
              <button
                  class="mt-5 tracking-wide bg-teal-500 border-2 border-teal-400 text-white w-full
                                    py-4 rounded-full flex items-center justify-center hover:bg-teal-700
                                    transition-all duration-300 ease-in-out
                                    focus:shadow-outline focus:outline-none cursor-pointer"
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
                  Se connecter
                </template>
              </button>
              <!--              <a href="{{ path('auth_connect_google_start') }}"-->
              <!--                 class="mt-5 tracking-wide bg-gray-100 border-2 border-gray-200 text-body-dark w-full-->
              <!--                                    py-4 rounded-full flex items-center justify-center hover:bg-gray-300-->
              <!--                                    transition-all duration-300 ease-in-out-->
              <!--                                    focus:shadow-outline focus:outline-none">-->
              <!--                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"-->
              <!--                     alt="Google" style="width: 20px vertical-align: middle; margin-right: 8px;">-->
              <!--                Connexion avec Google-->
              <!--              </a>-->
              <p class="mt-6 text-sm text-gray-600 text-center dark:text-gray-200">
                Vous n'avez pas encore de compte? Créez-le
                <router-link to="/register" class="border-b border-gray-500 border-dotted">
                  en cliquant ici
                </router-link>
              </p>
            </Form>
          </div>
        </div>
        <div class="flex-1 text-center hidden lg:flex">
          <div class="w-full bg-contain bg-center bg-no-repeat mr-14 my-8"
               style="background-image: url('/images/index.png')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useToast} from "@/plugins/useToast.js"
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline'

import apiClient from '@/plugins/axios.js'
import {Form, Field, ErrorMessage} from 'vee-validate'

import * as yup from 'yup'
import {useAuthStore} from "@/store/authStore.js";

const router = useRouter()
const auth = useAuthStore()
const appName = import.meta.env.VITE_APP_NAME

const schema = yup.object({
  email: yup
      .string()
      .email('Veuillez entrer une adresse e-mail valide.')
      .required("L'adresse e-mail est obligatoire."),
  password: yup
      .string()
      .required('Le mot de passe est obligatoire.')
})

const isLoading = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async (values) => {
  isLoading.value = true

  try {
    const response = await apiClient.post('/login', {
      email: values.email,
      password: values.password,
    })

    auth.loginSuccess(response.data)
    router.push('/dashboard')
  } catch (error) {
    useToast().addToast(error?.response?.data?.message || 'Une erreur inconnue est survenue.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
