"use client"

import { PropsWithChildren, ReactElement, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCoreStore } from "@/lib/stores/store"

const AuthenticationWrapper = ({ children }: PropsWithChildren): ReactElement => {
    const router = useRouter()
    const { userId } = useCoreStore()

    useEffect(() => {
        if (!userId) {
            router.replace("/login")
        } else {
            router.replace(`/todo`)
        }
    }, [router, userId])

    return <>{children}</>
}

export default AuthenticationWrapper
