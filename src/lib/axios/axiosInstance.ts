import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

const axiosConfig = (headers = {}): AxiosRequestConfig => {
    return {
        baseURL: `${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`,
        timeout: 30000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            Pragma: "no-cache",
            ...headers,
        },
    }
}

const axiosInstance: AxiosInstance = axios.create(axiosConfig())

export default axiosInstance
