import { NextAuthOptions } from "next-auth"
import { jwtDecode } from "jwt-decode"
import { JWT } from "next-auth/jwt"
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials"
import { IJwtPayload } from "@interfaces/root"
import { loginQuery } from "@services/login"
import axiosInstance from "@lib/axios/axiosInstance"

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
    try {
        const result = await loginQuery.getRefreshToken({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        })

        if (result.status !== 200) {
            new Error("RefreshAccessTokenError")
        }

        const refreshedTokens = result.data.data
        const jwtDecoded = jwtDecode<IJwtPayload>(refreshedTokens.accessToken)

        return {
            ...token,
            Authorization: refreshedTokens.accessToken,
            accessToken: refreshedTokens.accessToken,
            accessTokenExp: jwtDecoded.exp ?? 0,
            auth: jwtDecoded.auth ?? "",
            companyCode: jwtDecoded.companyCode ?? "",
            memberId: jwtDecoded.memberId ?? -1,
        }
    } catch {
        console.error("RefreshAccessTokenError")

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userId: { label: "email", type: "email", placeholder: "아이디를 입력하세요" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials: CredentialsConfig["options"]) {
                try {
                    const result = await loginQuery.getAuthenticate({
                        userId: credentials.userId,
                        password: credentials.password,
                    })

                    if (result.status !== 200 && result.status !== 401) {
                        new Error(result.data.data)
                    }

                    const user = result.data

                    const jwtDecoded = jwtDecode(user.accessToken)

                    if (user) {
                        return { ...user, ...jwtDecoded }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.error(error)
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    throw new Error(error.response?.data?.errorCode ?? error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.Authorization = user.accessToken
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.accessTokenExp = user.exp
                token.auth = user.auth
                token.id = user.sub
            }

            const isTokenValid = Date.now() / 1000 < token.accessTokenExp

            if (isTokenValid) {
                return token
            }

            return refreshAccessToken(token)
        },
        async session({ token, session }) {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`

            session.user = token as any
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: parseInt(process.env.NEXTAUTH_SESSION_MAX_AGE ?? "0"),
    },
}

export default authOptions
