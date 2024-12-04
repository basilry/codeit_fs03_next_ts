import { StateCreator } from "zustand"

export interface ICoreStore {
    userId: string
    changeUserId: (params: string) => void
}

export const coreStore: StateCreator<ICoreStore> = (set) => ({
    userId: "",
    changeUserId: (params: string) => set(() => ({ userId: params })),
})
