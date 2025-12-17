import { create } from 'zustand'

interface UxState {
    showInsights: boolean
    toggleInsights: () => void
}

export const useUxStore = create<UxState>((set) => ({
    showInsights: false,
    toggleInsights: () => set((state) => ({ showInsights: !state.showInsights })),
}))