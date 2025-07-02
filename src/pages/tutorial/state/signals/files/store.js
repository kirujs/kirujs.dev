import { signal, computed } from "kaioken"

// Global signals - shared across components
export const count = signal(0)
export const multiplier = signal(2)

// Computed signal - automatically updates when dependencies change
export const doubled = computed(() => count.value * multiplier.value)
export const isEven = computed(() => count.value % 2 === 0)
