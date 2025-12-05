<template>
  <div class="lg:bg-body dark:bg-body-dark flex items-center justify-center h-[100vh] flex-grow">
    <div class="text-gray-900 flex justify-center sm:items-center dark:text-white w-full lg:w-10/12 xl:w-9/12">
      <div class="w-full max-w-screen-lg m-0 lg:m-10 lg:h-[25em] lg:shadow lg:rounded-5xl overflow-hidden flex justify-center lg:flex-1 flex-none
                   lg:bg-box dark:lg:bg-box-dark">
        <div class="lg:w-3/6 xl:w-6/12 p-6 sm:px-8 lg:py-5 flex lg:flex-none items-center">
          <div class="flex flex-col px-10">
            <h1 class="mt-2 mb-5 text-xl font-poppins-semi-bold">
              Bienvenue sur <span class="text-teal-500">{{ appName }}</span>
            </h1>
            <h1 class="text-2xl font-playfair">
              Réinitialisez votre mot de passe
            </h1>
            <div v-if="errorMessage !== null"
                 class="relative block w-full mt-3 py-3 px-4 mb-4 text-base leading-5 text-white bg-red-400 rounded-2xl opacity-100 font-regular">
              {{ errorMessage }}
            </div>
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
import {ref} from 'vue'
import apiClient from '@/plugins/axios.js'
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
import {useToast} from "@/plugins/useToast.js";

const schema = yup.object({
  email: yup
      .string()
      .email('Veuillez entrer une adresse e-mail valide.')
      .required("L'adresse e-mail est obligatoire."),
})

const isLoading = ref(false)
const errorMessage = ref(null)
const appName = import.meta.env.VITE_APP_NAME;

const handleLogin = async (values) => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const response = await apiClient.post('/password/claim', {
      email: values.email,
    })
    useToast().addToast(response.data.message, 'success')
  } catch (error) {
    if (error.response.status < 500) {
      useToast().addToast(error.response.data.message, 'warning')
    } else {
      useToast().addToast(error?.response?.data?.message || 'Une erreur inconnue est survenue.', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>
