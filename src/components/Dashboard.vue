<template>
  <div
      class="divide-y divide-gray-200 overflow-hidden rounded-4xl bg-gray-200 shadow-sm sm:grid sm:grid-cols-2 sm:divide-y-0 dark:divide-white/10 dark:bg-gray-900 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/20">
    <div v-for="trip in trips" :key="trip.id"
         :class="['group relative border-gray-200 bg-white p-6 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:odd:not-nth-last-2:border-b sm:odd:border-r sm:even:not-last:border-b dark:border-white/10 dark:bg-gray-800/50 dark:focus-within:outline-indigo-500']">
      <div class="h-34 w-full bg-cover bg-center rounded-2xl"
           :style="{ backgroundImage: `url(${apiUrl + trip.image})` }"></div>
      <div class="mt-4 text-gray-900 dark:text-white">
        <div class="flex items-center justify-between gap-3 mb-2">
          <span class="text-lg leading-5">{{ trip.name }}</span>
          <span v-if="trip.state === 1"
                class="bg-teal-300/70 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 inline-flex rounded-lg px-3 py-1">
          A venir
          </span>
            <span v-else-if="trip.state === 2"
                  class="bg-yellow-300/70 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 inline-flex rounded-lg px-3 py-1">
            Non planifié
          </span>
            <span v-else
                  class="bg-red-300/70 dark:bg-red-500/10 text-red-700 dark:text-red-400 inline-flex rounded-lg px-3 py-1">
            Passé
          </span>
        </div>
        <div class="text-md text-base">
          <a :href="'/trip/' + trip.id" class="focus:outline-hidden">
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ trip.countryName }}
          </a>
        </div>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ trip.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from "../plugin/axios.js"
import {useToast} from "../plugin/useToast.js"
import {useAuthStore} from "../store/authStore.js"
import {ref} from "vue"

const auth = useAuthStore()
const apiUrl = import.meta.env.VITE_API_URL

let trips = ref([])

const getTrips = async () => {
  try {
    const response = await apiClient.get(`/trips/all/user/${auth.user.id}`)
    trips.value = response.data
  } catch (error) {
    useToast().addToast(error?.response?.data?.message ||
        'Une erreur inconnue est survenue lors de la récupération de vos voyages.', 'error')
  }
}

getTrips()
</script>
