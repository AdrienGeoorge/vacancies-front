<template>
  <div class="fixed top-4 right-4 z-50 w-[20em] pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="space-y-2">
      <div v-for="t in toast.list" :key="t.id" class="pointer-events-auto">
        <div
            class="flex items-center w-full max-w-sm px-4 py-3 text-body rounded-3xl shadow-lg text-white border-2"
            :class="boxWrapClass(t.type)"
            role="alert"
        >
          <div :class="iconWrapClass(t.type)" class="border-3">
            <component :is="iconFor(t.type)" class="w-5 h-5" aria-hidden="true"/>
            <span class="sr-only">Icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">
            {{ t.message }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>

</template>

<script setup>
import {h} from 'vue'
import {useToast} from '@/plugins/useToast.js'

const toast = useToast()

const boxWrapClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-emerald-400 border-emerald-500'
    case 'error':
      return 'bg-red-400 border-red-500'
    case 'warning':
      return 'bg-yellow-500 border-yellow-600'
    default:
      return 'bg-blue-400 border-blue-500'
  }
}

const iconWrapClass = (type) => {
  const base = 'inline-flex items-center justify-center shrink-0 w-7 h-7 rounded-xl border'
  switch (type) {
    case 'success':
      return base + ' text-fg-success bg-success-soft border-emerald-300'
    case 'error':
      return base + ' text-fg-danger bg-danger-soft border-red-300'
    case 'warning':
      return base + ' text-fg-warning bg-warning-soft border-yellow-400'
    default:
      return base + ' text-white bg-blue-200 border-blue-300'
  }
}

const IconSuccess = (props) => h('svg', {
  ...props,
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  fill: 'none',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M5 11.917 9.724 16.5 19 7.5'
  })
])
const IconError = (props) => h('svg', {
  ...props,
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  fill: 'none',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M6 18 17.94 6M18 18 6.06 6'
  })
])
const IconInfo = (props) => h('svg', {
  ...props,
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  fill: 'none',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M13 16h-2v-5h2v5Zm-1-7.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z'
  })
])
const IconWarn = (props) => h('svg', {
  ...props,
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  fill: 'none',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
  })
])

const iconFor = (type) => {
  switch (type) {
    case 'success':
      return IconSuccess
    case 'error':
      return IconError
    case 'warning':
      return IconWarn
    default:
      return IconInfo
  }
}
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 180ms ease;
}
</style>
