import { AxiosPromise } from "axios"
import axiosInstance from "@/lib/axios/axiosInstance"

export interface ITodoDetail {
    todoId?: number | null
    title: string
    description: string
    completed?: boolean
}

export const todoQuery = {
    getTodoList: (userId: string): any => ({
        queryKey: todoKeys.list(userId),
        queryFn: () => getTodoList(userId),
        staleTime: 0,
    }),
    addTodoDetail: (userId: string): any => ({
        mutationFn: (data: ITodoDetail) => addTodoDetail(userId, data),
    }),
    updateTodoDetail: (userId: string): any => ({
        mutationFn: (data: ITodoDetail) => updateTodoDetail(userId, data),
    }),
    completeTodoDetail: (userId: string): any => ({
        mutationFn: (todoId: string) => completeTodoDetail(userId, todoId),
    }),
    deleteTodoDetail: (userId: string): any => ({
        mutationFn: (todoId: string) => deleteTodoDetail(userId, todoId),
    }),
}

const todoKeys = {
    all: ["todos"] as const,
    list: (userId: string) => [...todoKeys.all, "list", userId] as const,
}

const getTodoList = async (userId: string): AxiosPromise => {
    return await axiosInstance.get(`/todo_list/${userId}`)
}

const addTodoDetail = async (userId: string, data: ITodoDetail): AxiosPromise => {
    return await axiosInstance.post(`/todo_detail/${userId}`, data)
}

const updateTodoDetail = async (userId: string, data: ITodoDetail): AxiosPromise => {
    return await axiosInstance.put(`/todo_detail/${userId}/${data.todoId}`, data)
}

const completeTodoDetail = async (userId: string, todoId: string): AxiosPromise => {
    return await axiosInstance.put(`/todo_detail/${userId}/${todoId}/ok`)
}

const deleteTodoDetail = async (userId: string, todoId: string): AxiosPromise => {
    return await axiosInstance.delete(`/todo_detail/${userId}/${todoId}`)
}
