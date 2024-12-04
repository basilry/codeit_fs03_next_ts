"use client"

import { PropsWithChildren, ReactElement } from "react"
import { SessionProvider } from "next-auth/react"

const NextAuthProvider = ({ children }: PropsWithChildren): ReactElement => {
    const refetchInterval = 3600

    return <SessionProvider refetchInterval={refetchInterval}>{children}</SessionProvider>
}

export default NextAuthProvider
