"use client"

import { ReactElement, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home(): ReactElement {
    const router = useRouter()

    useEffect(() => {
        router.replace("/todo")
    }, [router])

    return <></>
}
