import { AxiosPromise } from "axios"
import axiosInstance from "@/lib/axios/axiosInstance"

export interface ILogin {
    userId: string
    password: string
}

export interface IToken {
    accessToken: string
    refreshToken: string
}

export const loginQuery = {
    getAuthenticate: (data: ILogin): any => authenticate(data),
    getRefreshToken: (data: IToken): any => refresh(data),
}

const authenticate = (data: ILogin): AxiosPromise => {
    return axiosInstance.post("/auth/login", data)
}

const refresh = (data: IToken): AxiosPromise => {
    return axiosInstance.post("/auth/refresh", data)
}
