"use client"

import { PropsWithChildren, ReactElement, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const isDevtools = process.env["NEXT_PUBLIC_USEQUERY_DEVTOOL"] === "true"

const ReactQueryProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 0,
                        retry: 0,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {isDevtools && <ReactQueryDevtools initialIsOpen={false} buttonPosition={"top-right"} />}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider
