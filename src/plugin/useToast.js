import {reactive} from 'vue'

const state = reactive({
    items: [],
    _uid: 0,
})

const DEFAULT_DURATION = 4500

function addToast(message, type = 'info', options = {}) {
    const id = ++state._uid
    const duration = typeof options.duration === 'number' ? options.duration : DEFAULT_DURATION

    const item = {
        id,
        message: String(message ?? ''),
        type,
        duration,
        createdAt: Date.now(),
    }

    state.items.splice(0,0, item)

    if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
    }

    return id
}

function removeToast(id) {
    const idx = state.items.findIndex(t => t.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
}

function clear() {
    state.items.splice(0)
}

export function useToast() {
    return {
        list: state.items,
        addToast,
        success(message, options) {
            return addToast(message, 'success', options)
        },
        error(message, options) {
            return addToast(message, 'error', options)
        },
        info(message, options) {
            return addToast(message, 'info', options)
        },
        warning(message, options) {
            return addToast(message, 'warning', options)
        },
        remove: removeToast,
        clear,
    }
}

export default {useToast}
