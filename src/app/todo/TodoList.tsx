"use client"

import { ReactElement, useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import { ITodoDetail, todoQuery } from "@/services/todo"
import { useCoreStore } from "@lib/stores/store"

const initTodo: ITodoDetail = {
    todoId: null,
    title: "",
    description: "",
}

const TodoList = (): ReactElement => {
    const { userId, changeUserId } = useCoreStore()

    const [newTodoDetail, setNewTodo] = useState<ITodoDetail>(initTodo)
    const [updateTodoDetail, setUpdateTodo] = useState<ITodoDetail>(initTodo)

    const { data: todoListData, isLoading, refetch: refetchTodoListData } = useQuery<any>(todoQuery.getTodoList(userId))

    const { mutate: addTodoMutation } = useMutation<ITodoDetail, ITodoDetail, ITodoDetail>(
        todoQuery.addTodoDetail(userId),
    )
    const { mutate: updateTodoMutation } = useMutation<ITodoDetail, ITodoDetail, ITodoDetail>(
        todoQuery.updateTodoDetail(userId),
    )
    const { mutate: deleteTodoMutation } = useMutation<string, string, string>(todoQuery.deleteTodoDetail(userId))
    const { mutate: completeTodoMutation } = useMutation<string, string, string>(todoQuery.completeTodoDetail(userId))

    const handleLogout = (): void => {
        changeUserId("")
        signOut({ callbackUrl: "/" })
    }

    const addTodo = (): void => {
        if (!newTodoDetail.title || !newTodoDetail.description) {
            alert("제목과 설명을 입력해주세요!")
            return
        }

        addTodoMutation(newTodoDetail, {
            onSuccess: () => {
                setNewTodo(initTodo)
                refetchTodoListData()
            },
            onError: (error) => {
                console.error(error)
            },
        })
    }

    const updateTodo = (): void => {
        updateTodoMutation(updateTodoDetail, {
            onSuccess: () => {
                setUpdateTodo(initTodo)
                refetchTodoListData()
            },
            onError: (error) => {
                console.error(error)
            },
        })
    }

    const completeTodo = (todoId: string): void => {
        completeTodoMutation(todoId, {
            onSuccess: () => {
                refetchTodoListData()
            },
            onError: (error) => {
                console.error(error)
            },
        })
    }

    const deleteTodo = (todoId: string): void => {
        deleteTodoMutation(todoId, {
            onSuccess: () => {
                refetchTodoListData()
            },
            onError: (error) => {
                console.error(error)
            },
        })
    }

    useEffect(() => {
        if (userId) {
            refetchTodoListData()
        }
    }, [refetchTodoListData, userId])

    if (isLoading) {
        return <div>로딩 중...</div>
    }

    return (
        <div>
            <h1>{"[하기 싫지만 왠지 해야할 것 같은 TODO List]"}</h1>
            <button onClick={handleLogout}>로그아웃!!!!</button>
            <br />
            <div>
                <h3>할 일 신규 추가</h3>
                <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                        <div>제목</div>
                        <input
                            type={"text"}
                            value={newTodoDetail.title}
                            onChange={(e) => setNewTodo({ ...newTodoDetail, title: e.target.value })}
                            maxLength={50}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                        <div>설명</div>
                        <textarea
                            value={newTodoDetail.description}
                            onChange={(e) => setNewTodo({ ...newTodoDetail, description: e.target.value })}
                        />
                    </div>
                    <button onClick={addTodo}>추가</button>
                </div>
            </div>
            <div style={{ borderBottom: "1px solid gray", marginTop: "20px" }} />
            <div>
                <h3>할 일 목록</h3>
                <ul>
                    {todoListData
                        ? todoListData?.data
                              .sort((a: ITodoDetail, b: ITodoDetail) => {
                                  if (a.completed === b.completed) return 0
                                  return a.completed ? 1 : -1
                              })
                              .map((todo: any) => (
                                  <li
                                      key={todo.todo_id}
                                      style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gap: "10px",
                                          marginBottom: "15px",
                                          paddingBottom: "10px",
                                          borderBottom: "1px solid gray",
                                      }}
                                  >
                                      <div style={{ border: `3px solid ${todo.completed ? "green" : "red"}` }} />
                                      {updateTodoDetail.todoId === todo.todo_id ? (
                                          <div style={{ display: "flex", flexDirection: "row" }}>
                                              <input
                                                  type={"text"}
                                                  value={updateTodoDetail.title}
                                                  onChange={(e) =>
                                                      setUpdateTodo({
                                                          ...updateTodoDetail,
                                                          title: e.target.value,
                                                      })
                                                  }
                                                  maxLength={50}
                                              />
                                              <textarea
                                                  value={updateTodoDetail.description}
                                                  onChange={(e) =>
                                                      setUpdateTodo({
                                                          ...updateTodoDetail,
                                                          description: e.target.value,
                                                      })
                                                  }
                                              />
                                          </div>
                                      ) : (
                                          todo.title + " : " + todo.description
                                      )}
                                      <div style={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                                          <button
                                              onClick={() => {
                                                  if (updateTodoDetail.todoId === todo.todo_id) {
                                                      updateTodo()
                                                  } else {
                                                      setUpdateTodo({
                                                          todoId: todo.todo_id,
                                                          title: todo.title,
                                                          description: todo.description,
                                                      })
                                                  }
                                              }}
                                          >
                                              {updateTodoDetail.todoId === todo.todo_id ? "수정완료" : "수정"}
                                          </button>
                                          <button onClick={() => deleteTodo(todo.todo_id)}>삭제</button>
                                          <button onClick={() => completeTodo(todo.todo_id)}>
                                              {todo.completed ? "완료취소" : "완료"}
                                          </button>
                                      </div>
                                  </li>
                              ))
                        : "옴마나! 저장되어 있는 할 일이 없습니다!"}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
