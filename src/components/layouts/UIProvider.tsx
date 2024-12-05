"use client"

import { PropsWithChildren, ReactElement } from "react"
import Header from "@components/ui/Header"

const UiProvider = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <div>
            <Header />
            <div
                style={{
                    marginTop: "60px",
                    padding: "0 40px",
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default UiProvider
