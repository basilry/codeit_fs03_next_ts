import React, { ReactElement } from "react"
import localFont from "next/font/local"
import AuthenticationWrapper from "@/components/layouts/AuthenticationWrapper"
import NextAuthProvider from "@components/layouts/NextAuthProvider"
import ReactQueryProvider from "@components/layouts/ReactQueryProvider"
import UIProvider from "@components/layouts/UIProvider"
import "@styles/global.scss"

const pretendardFont = localFont({
    src: "../../public/font/PretendardVariable.woff2",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): ReactElement {
    return (
        <html lang="en" className={pretendardFont.className}>
            <body>
                <NextAuthProvider>
                    <AuthenticationWrapper>
                        <ReactQueryProvider>
                            <UIProvider>{children}</UIProvider>
                        </ReactQueryProvider>
                    </AuthenticationWrapper>
                </NextAuthProvider>
            </body>
        </html>
    )
}
