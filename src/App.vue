<script setup>
import ToastContainer from './components/Toast/ToastContainer.vue'
import {useRoute, useRouter} from "vue-router"
import {useAuthStore} from "./store/authStore.js"
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {reactive, watch} from "vue"

const route = useRoute()
const router = useRouter()
const appName = import.meta.env.VITE_APP_NAME
let routeName

const auth = useAuthStore()
auth.restore()

watch(() => route.path, (newRoute) => {
  navigation.map(item => {
    item.current = item.href === newRoute;
  })
  routeName = reactive(navigation.find(item => item.current === true)?.name)
})

const navigation = reactive([
  {name: 'Dashboard', href: '/dashboard', current: false},
  {name: 'Team', href: '/profile', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
])

const userNavigation = [
  {name: 'Consulter mon profil', href: '#'},
  {name: 'Mes informations', href: '#'},
]

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <ToastContainer/>

  <div v-if="route.name !== 'login' && route.name !== 'register' && route.name !== 'password-claim' &&
             route.name !== 'password-reset'">
    <div class="min-h-full">
      <Disclosure as="nav" class="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800/50"
                  v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <div class="flex shrink-0 items-center">
                <img class="h-8 w-auto dark:hidden"
                     src="/images/index.png"
                     :alt="appName"/>
              </div>
              <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <router-link :to="item.href" v-for="item in navigation" :key="item.name"
                             :class="[item.current ? 'border-teal-400 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200', 'inline-flex items-center border-b-3 px-1 pt-1 text-sm font-medium']">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <button type="button"
                      class="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:text-gray-400 dark:hover:text-white dark:focus:outline-indigo-500">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true"/>
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <MenuButton
                    class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <div v-if="auth.user">
                    <img v-if="auth.user.avatar"
                         class="size-8 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10"
                         :src="auth.user.avatar" alt=""/>
                    <div v-else
                         class="size-10 rounded-full bg-gray-400 dark:bg-gray-600 flex justify-center items-center text-white text-lg font-bold">
                      {{ auth.user.firstname.charAt(0) }}
                    </div>
                  </div>
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100"
                            leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl overflow-hidden bg-white py-1 shadow-lg outline outline-black/5 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href"
                         :class="[active ? 'bg-gray-100 outline-hidden dark:bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']">{{
                          item.name
                        }}</a>
                    </MenuItem>
                    <MenuItem>
                      <div @click="logout"
                           class="cursor-pointer text-center rounded-xl outline-hidden bg-red-400 border-2 border-red-300 block mx-2 my-1 px-2 py-2 text-sm text-white">
                        Se déconnecter
                      </div>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <div class="-mr-2 flex items-center sm:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-indigo-500">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true"/>
                <XMarkIcon v-else class="block size-6" aria-hidden="true"/>
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="sm:hidden">
          <div class="space-y-1 pt-2 pb-3">
            <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="block"
            >
              <DisclosureButton
                  :class="[item.current ? 'border-teal-500 bg-teal-100 text-teal-700 dark:border-teal-500 dark:bg-teal-600/10 dark:text-teal-300' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-gray-200', 'w-full text-left block border-l-4 py-2 pr-4 pl-3 text-base font-medium']">
                {{ item.name }}
              </DisclosureButton>
            </router-link>
          </div>
          <div class="border-t border-gray-200 pt-4 pb-3 dark:border-gray-700">
            <div class="flex items-center px-4" v-if="auth.user">
              <div class="shrink-0">
                <img v-if="auth.user.avatar"
                     class="size-10 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10"
                     :src="auth.user.avatar" alt=""/>
                <div v-else
                     class="size-10 rounded-full bg-gray-400 dark:bg-gray-600 flex justify-center items-center text-white text-lg font-bold">
                  {{ auth.user.firstname.charAt(0) }}
                </div>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800 dark:text-white">{{ auth.user.firstname }}</div>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ auth.user.email }}</div>
              </div>
              <button type="button"
                      class="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:text-gray-400 dark:hover:text-white dark:focus:outline-indigo-500">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true"/>
              </button>
            </div>
            <div class="mt-3 space-y-1">
              <router-link :to="item.href" v-for="item in userNavigation" :key="item.name">
                <DisclosureButton
                    class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200">
                  {{ item.name }}
                </DisclosureButton>
              </router-link>
              <DisclosureButton @click="logout"
                                class="text-base font-medium cursor-pointer text-center rounded-xl outline-hidden bg-red-400 border-2 border-red-300 block mx-4 px-2 py-2 text-white">
                Se déconnecter
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header
          class="relative bg-white shadow-sm dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:inset-y-0 dark:after:border-y dark:after:border-white/10">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{{ routeName }}</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <router-view/>
        </div>
      </main>
    </div>
  </div>

  <div v-else>
    <router-view/>
  </div>
</template>