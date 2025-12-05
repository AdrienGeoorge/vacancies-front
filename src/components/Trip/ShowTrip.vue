<template>
  <div v-if="data" class="grid grid-cols-1 gap-4 lg:grid-cols-6 items-start">
    <div class="lg:sticky lg:top-5 lg:col-span-2 flex flex-col gap-4">
      <div class="relative">
        <div
            class="absolute inset-0 rounded-4xl bg-white dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-4xl">
          <img class="h-42 object-cover object-left mt-3 mx-3 rounded-t-3xl rounded-b-xl"
               :src="apiUrl + data.trip.image" :alt="data.trip.name">
          <div class="px-10 pt-4 mb-6">
            <h3 class="font-semibold text-xl text-teal-600 dark:text-teal-400">{{ data.trip.country.name }}</h3>
            <p class="text-lg leading-6 font-medium tracking-tight text-gray-950 dark:text-white">{{ data.trip.name }}</p>
            <p class="mt-2 leading-5 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">{{ data.trip.description }}</p>
          </div>
          <!--        TODO: url-->
          <RouterLink v-if="auth.user.id === data.trip.traveler.id"
                      to="#" class="shadow rounded-2xl py-2.5 px-5 bg-blue-500 text-white
                        w-60 font-bold text-center m-auto mb-6 border-2 border-blue-400 hover:bg-blue-600
                        transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none">
            Editer le voyage
          </RouterLink>
        </div>
        <div
            class="pointer-events-none absolute inset-0 rounded-4xl shadow-sm outline outline-black/5 dark:outline-white/15"></div>
      </div>
      <div class="relative">
        <div
            class="absolute inset-0 rounded-4xl bg-white dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-4xl">
          <div class="p-10">
            mettre compteur de jour ici
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-0 rounded-4xl shadow-sm outline outline-black/5 dark:outline-white/15"></div>
      </div>
    </div>
    <div class="relative lg:col-span-4 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
      <div class="relative lg:row-span-2">
        <div class="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">Mobile
              friendly</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Anim aute id magna
              aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
          </div>
          <div class="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
            <div
                class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl dark:shadow-none dark:outline dark:outline-white/20">
              <img class="size-full object-cover object-top"
                   src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                   alt=""/>
            </div>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/15"></div>
      </div>
      <div class="relative max-lg:row-start-1">
        <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
          <div class="px-8 pt-8 sm:px-10 sm:pt-10">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Performance</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Lorem ipsum, dolor
              sit amet consectetur adipisicing elit maiores impedit.</p>
          </div>
          <div class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
            <img class="w-full max-lg:max-w-xs dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt=""/>
            <img class="w-full not-dark:hidden max-lg:max-w-xs"
                 src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png" alt=""/>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl dark:outline-white/15"></div>
      </div>
      <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <div class="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
        <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
          <div class="px-8 pt-8 sm:px-10 sm:pt-10">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Security</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Morbi viverra dui
              mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
          </div>
          <div class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
            <img class="h-[min(152px,40cqw)] object-cover dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt=""/>
            <img class="h-[min(152px,40cqw)] object-cover not-dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png" alt=""/>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15"></div>
      </div>
      <div class="relative lg:row-span-2">
        <div
            class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
          <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Powerful APIs</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Sit quis amet
              rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.</p>
          </div>
          <div class="relative min-h-120 w-full grow">
            <div
                class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10 dark:bg-gray-900/60 dark:shadow-none">
              <div class="flex bg-gray-900 outline outline-white/5">
                <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                  <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                    NotificationSetting.jsx
                  </div>
                  <div class="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                </div>
              </div>
              <div class="px-6 pt-6 pb-14">
                <!-- Your code example -->
              </div>
            </div>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:outline-white/15"></div>
      </div>
      <div class="relative lg:row-span-2">
        <div class="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">Mobile
              friendly</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Anim aute id magna
              aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
          </div>
          <div class="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
            <div
                class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl dark:shadow-none dark:outline dark:outline-white/20">
              <img class="size-full object-cover object-top"
                   src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                   alt=""/>
            </div>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/15"></div>
      </div>
      <div class="relative max-lg:row-start-1">
        <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
          <div class="px-8 pt-8 sm:px-10 sm:pt-10">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Performance</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Lorem ipsum, dolor
              sit amet consectetur adipisicing elit maiores impedit.</p>
          </div>
          <div class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
            <img class="w-full max-lg:max-w-xs dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt=""/>
            <img class="w-full not-dark:hidden max-lg:max-w-xs"
                 src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png" alt=""/>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl dark:outline-white/15"></div>
      </div>
      <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <div class="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
        <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
          <div class="px-8 pt-8 sm:px-10 sm:pt-10">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Security</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Morbi viverra dui
              mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
          </div>
          <div class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
            <img class="h-[min(152px,40cqw)] object-cover dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt=""/>
            <img class="h-[min(152px,40cqw)] object-cover not-dark:hidden"
                 src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png" alt=""/>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15"></div>
      </div>
      <div class="relative lg:row-span-2">
        <div
            class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl dark:bg-gray-800"></div>
        <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
          <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
              Powerful APIs</p>
            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">Sit quis amet
              rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.</p>
          </div>
          <div class="relative min-h-120 w-full grow">
            <div
                class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10 dark:bg-gray-900/60 dark:shadow-none">
              <div class="flex bg-gray-900 outline outline-white/5">
                <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                  <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                    NotificationSetting.jsx
                  </div>
                  <div class="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                </div>
              </div>
              <div class="px-6 pt-6 pb-14">
                <!-- Your code example -->
              </div>
            </div>
          </div>
        </div>
        <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:outline-white/15"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center text-gray-500 dark:text-gray-400 text-xl">Récupération des informations de votre voyage...</p>
  </div>
</template>

<script setup>
import apiClient from "@/plugins/axios.js"
import router from "@/router/index.js"
import {useToast} from "@/plugins/useToast.js"
import {onMounted, ref} from "vue"
import {useAuthStore} from "@/store/authStore.js"

const apiUrl = import.meta.env.VITE_API_URL
const routeParams = router.currentRoute.value.params
const data = ref(null)

const auth = useAuthStore()

onMounted(async () => {
  try {
    const response = await apiClient.get(`/trips/get/${routeParams.id}/dashboard`)
    data.value = response.data || {}
  } catch (error) {
    let errorMessage = error?.response?.data?.message
    if (errorMessage === undefined) errorMessage = error?.response?.data?.detail

    useToast().addToast(errorMessage ? errorMessage : 'Une erreur inconnue est survenue lors de la récupération du voyage.', 'error')
    router.push('/dashboard')
  }
})
</script>
