import NextAuth from "next-auth"
import authOptions from "@app/api/auth/[...nextauth]/authOptions"

interface INextAuthUser {
    id: string
    sub: string
    exp: number
    auth: string
    accessToken: string
    refreshToken: string
    companyCode: string
    memberId: number
    error?: string
}

declare module "next-auth" {
    interface Session {
        user: User
    }

    interface User extends INextAuthUser {}
}

declare module "next-auth/jwt" {
    interface JWT extends INextAuthUser {
        accessTokenExp: number
        token: string
        iat?: number
        jti?: string
        id?: string
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
