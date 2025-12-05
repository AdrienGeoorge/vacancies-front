<template>
  <nav
      class="border-none lg:border-b lg:border-solid border-gray-200 dark:border-white/15 mx-auto max-w-7xl overflow-hidden rounded-tl-4xl lg:rounded-none"
      aria-label="Progress">
    <ol role="list" class="overflow-hidden lg:flex">
      <li v-for="(step, stepIdx) in steps" :key="step.id"
          class="relative overflow-hidden lg:flex-1 flex items-center">
        <div class="overflow-hidden border-b w-full lg:border border-gray-200 lg:border-0 dark:border-white/15">
          <a v-if="step.status === 'complete'" href="#" @click.prevent="onStepClick(step)" class="group">
              <span
                  class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full dark:group-hover:bg-white/20"
                  aria-hidden="true"></span>
            <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-center px-6 py-5 text-sm font-medium']">
                <span class="shrink-0">
                  <span class="flex size-10 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-500">
                    <CheckIcon class="size-6 text-white" aria-hidden="true"/>
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ step.description }}</span>
                </span>
              </span>
          </a>
          <a v-else-if="step.status === 'current'" href="#" @click.prevent="onStepClick(step)"
             aria-current="step">
              <span
                  class="absolute top-0 left-0 h-full w-1 bg-teal-600 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full dark:bg-teal-500"
                  aria-hidden="true"></span>
            <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-center px-6 py-5 text-sm font-medium']">
                <span class="shrink-0">
                  <span
                      class="flex size-10 items-center justify-center rounded-full border-2 border-teal-600 dark:border-teal-500">
                    <span class="text-teal-600 dark:text-teal-400">{{ step.id }}</span>
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-teal-600 dark:text-teal-400">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ step.description }}</span>
                </span>
              </span>
          </a>
          <a v-else href="#" @click.prevent="onStepClick(step)" class="group">
              <span
                  class="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:top-auto lg:bottom-0 lg:h-1 lg:w-full dark:group-hover:bg-white/20"
                  aria-hidden="true"></span>
            <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-center px-6 py-5 text-sm font-medium']">
                <span class="shrink-0">
                  <span
                      class="flex size-10 items-center justify-center rounded-full border-2 border-gray-300 dark:border-white/15">
                    <span class="text-gray-500 dark:text-gray-400">{{ step.id }}</span>
                  </span>
                </span>
                <span class="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ step.description }}</span>
                </span>
              </span>
          </a>
          <template v-if="stepIdx !== 0">
            <div class="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
              <svg class="size-full text-gray-300 dark:text-white/15" viewBox="0 0 12 82" fill="none"
                   preserveAspectRatio="none">
                <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke"/>
              </svg>
            </div>
          </template>
        </div>
      </li>
    </ol>
  </nav>
  <Form ref="formRef" :validation-schema="schema" :initial-values="props.initialValues" @submit="handleSubmit"
        class="px-12 pt-6 pb-10">
    <div data-page="1"
         class="page-selector block flex flex-col md:flex-row justify-between items-center md:items-end">
      <div class="page-content">
        <div class="text-base/7 font-semibold text-gray-900 dark:text-white">Quelle est ta prochaine destination?
        </div>
        <p class="text-sm/6 text-gray-600 dark:text-gray-400">Choisis simplement un pays dans la liste pour planifier
          ta prochaine aventure.</p>
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-8 mt-2">
            <Combobox as="div" v-model="selectedCountry" @update:modelValue="query = ''">
              <div class="relative mt-2">
                <ComboboxInput
                    class="block w-full rounded-2xl bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-teal-500"
                    @change="query = $event.target.value" @blur="query = ''"
                    :display-value="(country) => country?.name" placeholder="Sélectionner un pays"/>
                <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                  <ChevronDownIcon class="size-5 text-gray-400" aria-hidden="true"/>
                </ComboboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class=""
                            leave-to-class="opacity-0">
                  <ComboboxOptions v-if="filteredCountries.length > 0 || query.length > 0"
                                   class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg outline outline-black/5 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                    <ComboboxOption v-if="isQueryCountry" :value="isQueryCountry" as="template" v-slot="{ active }">
                      <li :class="['relative cursor-default px-3 py-2 select-none', active ? 'bg-teal-600 text-white outline-hidden dark:bg-teal-500' : 'text-gray-900 dark:text-white']">
                        <div class="flex items-center">
                          <div
                              :class="['grid size-6 shrink-0 place-items-center rounded-full', active ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600']">
                            <QuestionMarkCircleIcon
                                :class="['size-4', active ? 'fill-teal-600 dark:fill-teal-500' : 'fill-white']"
                                aria-hidden="true"/>
                          </div>
                          <span class="ml-3 truncate">{{ query }}</span>
                        </div>
                      </li>
                    </ComboboxOption>
                    <ComboboxOption v-for="country in filteredCountries" :key="country.id" :value="country"
                                    as="template"
                                    v-slot="{ active }">
                      <li :class="['relative cursor-default px-3 py-2 select-none', active ? 'bg-teal-600 text-white outline-hidden dark:bg-teal-500' : 'text-gray-900 dark:text-white']">
                        <div class="flex items-center">
                          <img :src="`https://flagsapi.com/${country.code}/flat/24.png`" alt=""
                               class="size-6 shrink-0"/>
                          <span class="ml-3 truncate">{{ country.name }}</span>
                        </div>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </transition>
              </div>
            </Combobox>
            <Field as="input" name="selectedCountry" type="hidden"/>
            <ErrorMessage name="selectedCountry" v-slot="{ message }">
              <p class="text-red-500 text-sm mt-1">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>

        <div class="text-base/7 font-semibold text-gray-900 dark:text-white mt-4">Nom de ton voyage</div>
        <p class="text-sm/6 text-gray-600 dark:text-gray-400">
          Donnes un petit nom à ton voyage pour décrire en quelques mots son but...
        </p>
        <p class="text-xs/3 text-gray-600 dark:text-gray-400">
          Par exemple : "Circuit de Tokyo à Osaka"
        </p>
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-8 mt-5">
            <Field as="input" name="name" type="text"
                   placeholder="Saisies-le ici"
                   class="block w-full rounded-2xl bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                 focus:outline-teal-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10
                 dark:placeholder:text-gray-500 dark:focus:outline-teal-500"/>
            <ErrorMessage name="name" v-slot="{ message }">
              <p class="text-red-500 text-sm mt-1">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
      </div>

      <button
          @click="validatePageAndGo(2)"
          class="mt-5 tracking-wide bg-teal-500 border-2 border-teal-400 text-white
                                    py-2 px-4 rounded-full flex items-center justify-center hover:bg-teal-700
                                    transition-all duration-300 ease-in-out
                                    focus:shadow-outline focus:outline-none cursor-pointer flex w-50 justify-center"
          type="button">
        <span>Etape suivante</span>
        <ArrowRightIcon class="ml-2 size-5" aria-hidden="true"/>
      </button>
    </div>
    <div data-page="2"
         class="page-selector hidden flex flex-col md:flex-row justify-between items-center md:items-end">
      <div class="page-content">
        <div class="text-base/7 font-semibold text-gray-900 dark:text-white">A quelles dates comptes-tu réaliser ce
          voyage?
        </div>
        <p class="text-sm/6 text-gray-600 dark:text-gray-400">Tu ne sais pas encore les dates ? Pas de souci, tu peux
          laisser les champs vide.</p>
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-8 mt-5">
            <div class="text-base/7 font-semibold text-gray-900 dark:text-white mb-2">On part le...</div>
            <Field as="input" name="departureDate" type="date"
                   class="block w-full rounded-2xl bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                 focus:outline-teal-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10
                 dark:placeholder:text-gray-500 dark:focus:outline-teal-500"/>
          </div>
          <div class="col-span-12 md:col-span-8 mt-5">
            <div class="text-base/7 font-semibold text-gray-900 dark:text-white mb-2">On revient le...</div>
            <Field as="input" name="returnDate" type="date"
                   class="block w-full rounded-2xl bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                 focus:outline-teal-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10
                 dark:placeholder:text-gray-500 dark:focus:outline-teal-500"/>
          </div>
        </div>
      </div>
      <button
          @click="validatePageAndGo(3)"
          class="mt-5 tracking-wide bg-teal-500 border-2 border-teal-400 text-white
                                    py-2 px-4 rounded-full flex items-center justify-center hover:bg-teal-700
                                    transition-all duration-300 ease-in-out
                                    focus:shadow-outline focus:outline-none cursor-pointer flex w-50 justify-center"
          type="button">
        <span>Etape suivante</span>
        <ArrowRightIcon class="ml-2 size-5" aria-hidden="true"/>
      </button>
    </div>
    <div data-page="3"
         class="page-selector hidden flex flex-col md:flex-row justify-between items-center md:items-end">
      <div class="page-content">
        <div class="text-base/7 font-semibold text-gray-900 dark:text-white">Renseignes une courte description pour
          parler de ton voyage.
        </div>
        <p class="text-sm/6 text-gray-600 dark:text-gray-400">Sois succinct... quelques mots suffisent.</p>
        <div class="grid grid-cols-12">
          <div class="col-span-12 mt-5">
            <Field as="textarea" name="description" type="text"
                   class="block w-full h-24 rounded-2xl bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                 focus:outline-teal-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10
                 dark:placeholder:text-gray-500 dark:focus:outline-teal-500"/>
            <ErrorMessage name="description" v-slot="{ message }">
              <p class="text-red-500 text-sm mt-1">{{ message }}</p>
            </ErrorMessage>
          </div>
          <div class="col-span-12 md:col-span-8 mt-5">
            <div class="text-base/7 font-semibold text-gray-900 dark:text-white mb-2">Illustres ton voyage avec une
              image.
            </div>
            <div v-if="initialValues.image" class="w-full h-34 bg-cover bg-center rounded-2xl mb-2" :style="`background-image: url(${apiUrl}${initialValues.image})`"></div>

            <div class="bg-gray-100 dark:bg-gray-800 rounded-full py-1.5 pl-1.5 pr-4">
              <Field as="input" type="file" name="image" id="trip-image"
                     class="file:text-bg-primary file:px-4 file:h-9.5 cursor-pointer file:font-medium file:text-base block text-sm
                     file:me-3 file:rounded-full file:bg-teal-500 file:text-white"
                     aria-label="image"/>
            </div>
            <ErrorMessage name="image" v-slot="{ message }">
              <p class="text-red-500 text-sm mt-1">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <button
          class="mt-5 tracking-wide bg-teal-500 border-2 border-teal-400 text-white
                                    py-2 px-4 rounded-full flex items-center justify-center hover:bg-teal-700
                                    transition-all duration-300 ease-in-out
                                    focus:shadow-outline focus:outline-none cursor-pointer flex w-50 justify-center"
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
          Sauvegarder
        </template>
      </button>
    </div>
  </Form>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {ChevronDownIcon, ArrowRightIcon} from '@heroicons/vue/20/solid'
import {QuestionMarkCircleIcon} from '@heroicons/vue/16/solid'
import {useToast} from "@/plugins/useToast.js"
import {CheckIcon} from '@heroicons/vue/24/solid'
import {Form, Field, ErrorMessage} from 'vee-validate'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

import apiClient from "@/plugins/axios.js"
import * as yup from "yup"
import router from "@/router"

const props = defineProps({
  initialValues: Object,
  countries: Array,
  tripId: String
})

const apiUrl = import.meta.env.VITE_API_URL

const steps = ref([
  {
    id: 1,
    name: 'Destination',
    description: 'Renseignes ta prochaine destination',
    status: 'current'
  },
  {
    id: 2,
    name: 'Dates de voyage',
    description: 'Choisis les dates qui te correspondent le mieux',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Informations complémentaires',
    description: 'Donnes une description et illustres ton futur voyage',
    status: 'upcoming'
  },
])

const query = ref('')
const selectedCountry = ref(null)
const filteredCountries = computed(() =>
    query.value === ''
        ? props.countries
        : props.countries.filter((country) => {
          return country.name.toLowerCase().includes(query.value.toLowerCase())
        }),
)

const isQueryCountry = computed(() => {
  return query.value === '' ? null : {id: null, name: query.value}
})

const changePage = stepNumber => {
  const selectedPage = document.querySelector(`.page-selector[data-page="${stepNumber}"]`)
  const allPages = document.querySelectorAll('.page-selector')

  allPages.forEach(page => {
    page.classList.remove('block')
    page.classList.add('hidden')
  })

  selectedPage.classList.remove('hidden')
  selectedPage.classList.add('block')

  steps.value.forEach(step => {
    if (step.id < stepNumber) {
      step.status = 'complete'
    } else if (step.id === stepNumber) {
      step.status = 'current'
    } else {
      step.status = 'upcoming'
    }
  })
}

const schema = yup.object({
      name: yup
          .string()
          .required("Le nom est obligatoire.")
          .min(5, "Le nom du voyage doit faire au minimum 5 caractères.")
          .max(255, "Le nom du voyage doit faire au maximum 255 caractères."),
      selectedCountry: yup.string().required("La sélection d'un pays est obligatoire."),
      departureDate: yup.date().notRequired(),
      returnDate: yup.date().notRequired(),
      description: yup.string().required("La description est obligatoire."),
      image: yup
          .mixed()
          .nullable()
          .test('requiredIfNoImage', "L'ajout d'une image est obligatoire.", value => {
            if (props.tripId) return true
            return !!value
          }),
    }
)

const formRef = ref(null)

watch(
    () => props.initialValues,
    (vals) => {
      if (!vals || !formRef.value) return
      formRef.value.resetForm({
        values: {
          name: vals.name ?? '',
          selectedCountry: vals.selectedCountry ?? null,
          departureDate: vals.departureDate ?? null,
          returnDate: vals.returnDate ?? null,
          description: vals.description ?? '',
          image: null,
        }
      })

      if (vals.selectedCountry && Array.isArray(props.countries) && props.countries.length) {
        const code = typeof vals.selectedCountry === 'string' ? vals.selectedCountry : vals.selectedCountry?.code
        const found = props.countries.find(c => c.code === code)
        selectedCountry.value = found || null
      }
    },
    {deep: false}
)

watch(
    selectedCountry,
    (val) => {
      if (val && typeof val === 'object') {
        const code = val.code && val.code.length ? val.code.trim().toUpperCase() : null
        formRef.value?.setFieldValue('selectedCountry', code && code.length ? code : null)
      }
    }
)

const getCurrentStepId = () => steps.value.find(s => s.status === 'current')?.id || 1

const pageFields = {
  1: ['selectedCountry', 'name'],
  2: ['departureDate', 'returnDate'],
  3: ['image'],
}

// Vérifier les champs de la page courante et aller vers la prochaine si tous les champs sont valides
const validatePageAndGo = async (nextStep) => {
  let allValid = true
  const fields = pageFields[nextStep - 1] || []

  for (const fieldName of fields) {
    try {
      const api = formRef?.value
      if (!api) {
        allValid = false
        continue
      }
      api.setFieldTouched(fieldName, true)
      const result = await api.validateField(fieldName)
      if (!result || result.valid === false) {
        allValid = false
      }
    } catch (e) {
      console.log(e)
      allValid = false
    }
  }

  if (allValid) {
    changePage(nextStep)
  }
}

// Bloquer le navigation vers les pages suivantes si la page courante n'est pas valide
const onStepClick = (step) => {
  const currentId = getCurrentStepId()
  const targetId = step.id

  if (targetId === currentId) return

  if (targetId < currentId) {
    changePage(targetId)
    return
  }

  const nextAllowedId = currentId + 1
  const destination = Math.min(targetId, nextAllowedId)

  validatePageAndGo(destination)
}

const isLoading = ref(false)

const handleSubmit = async values => {
  isLoading.value = true

  try {
    let route = props.tripId ? `/trips/edit/${props.tripId}` : '/trips/create'
    const response = await apiClient.post(route, {
      ...values
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    useToast().addToast(response.data.message, 'success')
    router.push('/trip/show/' + response.data.id)
  } catch (error) {
    useToast().addToast(error?.response?.data?.message || 'Une erreur inconnue est survenue.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>