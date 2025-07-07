import { signal, computed } from "kaioken"

export const count = signal(0)
export const doubled = computed(() => count.value * 2)
