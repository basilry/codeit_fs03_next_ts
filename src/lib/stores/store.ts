import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ICoreStore, coreStore } from "./slices/coreStore"

export const useCoreStore = create<ICoreStore>()(
    persist(
        (...a) => ({
            ...coreStore(...a),
        }),
        {
            name: "core",
        },
    ),
)
