<template>
  <div class="divide-y divide-gray-200 rounded-4xl bg-white shadow-sm
        sm:divide-y-0 dark:divide-white/10 dark:bg-gray-900 dark:shadow-none dark:outline dark:-outline-offset-1
        dark:outline-white/20">
    <TripForm :initial-values="initialValues" :countries="countries" :trip-id="router.currentRoute.value.params.id ? router.currentRoute.value.params.id : null"/>
  </div>
</template>

<script setup>
import TripForm from "./TripForm.vue"
import {onBeforeMount, ref} from "vue"
import router from "../../router/router.js"
import apiClient from "../../plugin/axios.js";
import {useToast} from "../../plugin/useToast.js"

let initialValues = ref({
  name: '',
  selectedCountry: null,
  departureDate: null,
  returnDate: null,
  description: '',
  image: null,
})

const countries = ref([])

onBeforeMount(async () => {
  try {
    const response = await apiClient.get('/countries')
    countries.value = response.data['hydra:member'].sort((a, b) =>
        a.name.localeCompare(b.name)
    )
  } catch (error) {
    useToast().addToast(error?.response?.data?.message || 'Erreur lors de la récupération des pays.', 'error')
  }

  const routeParams = router.currentRoute.value.params

  if (routeParams.id) {
    try {
      const response = await apiClient.get(`/trips/get/${routeParams.id}`)
      const data = response.data || {}
      initialValues.value = {
        name: data.name ?? '',
        selectedCountry: (data.selectedCountry && (data.selectedCountry.code || data.selectedCountry)) ?? null,
        departureDate: data.departureDate ?? data.departureDate ?? null,
        returnDate: data.returnDate ?? data.returnDate ?? null,
        description: data.description ?? '',
        image: data.image ?? null,
      }
    } catch (error) {
      useToast().addToast(error?.response?.data?.message ||
          'Une erreur inconnue est survenue lors de la récupération du voyage.', 'error')
    }
  }
})
</script>
