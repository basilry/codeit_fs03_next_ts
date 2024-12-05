"use client"

import { ReactElement, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, SignInResponse } from "next-auth/react"
import { useCoreStore } from "@/lib/stores/store"
import { ILogin } from "@services/login"
import styles from "@styles/pages/login.module.scss"

const initLoginData: ILogin = {
    userId: "",
    password: "",
}

const Login = (): ReactElement => {
    const router = useRouter()
    const { userId, changeUserId } = useCoreStore()

    const [loginData, setLoginData] = useState<ILogin>(initLoginData)
    const [errorMsg, setErrorMsg] = useState("")

    const doLogin = async (): Promise<void> => {
        if (loginData.userId === "" || loginData.password === "") {
            setErrorMsg("아이디와 비밀번호를 입력해주세요.")
            return
        }

        setErrorMsg("")

        const result: SignInResponse | undefined = await signIn("credentials", {
            userId: loginData.userId,
            password: loginData.password,
            redirect: false,
        })

        console.log(result)

        if (result?.ok) {
            setErrorMsg("")
            changeUserId(loginData.userId)
            router.replace("/todo/")
        } else {
            setErrorMsg("아이디 또는 비밀번호가 틀렸습니다.")
        }
    }

    useEffect(() => {
        if (userId) {
            router.replace("/")
        }
    }, [router, userId])

    return (
        <div className={styles.container}>
            <div>
                <h3>아이디</h3>
                <input
                    type={"text"}
                    value={loginData.userId}
                    onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                />
            </div>
            <br />
            <div>
                <h3>비밀번호</h3>
                <input
                    type={"password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    maxLength={8}
                />
            </div>
            <br />
            <button onClick={() => doLogin()}>로그인</button>
            {errorMsg.length > 0 && <div style={{ color: "red" }}>{errorMsg}</div>}
        </div>
    )
}

export default Login
