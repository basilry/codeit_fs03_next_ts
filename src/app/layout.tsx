import React, { ReactElement } from "react"
import AuthenticationWrapper from "@/components/layouts/AuthenticationWrapper"
import NextAuthProvider from "@components/layouts/NextAuthProvider"
import ReactQueryProvider from "@components/layouts/ReactQueryProvider"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): ReactElement {
    return (
        <html lang="en">
            <body>
                <NextAuthProvider>
                    <AuthenticationWrapper>
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                    </AuthenticationWrapper>
                </NextAuthProvider>
            </body>
        </html>
    )
}
