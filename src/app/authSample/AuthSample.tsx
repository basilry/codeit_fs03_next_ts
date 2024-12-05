"use client"

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { loginQuery } from "@services/login"
import styles from "@styles/pages/authSample.module.scss"

const Button = ({
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): ReactElement => {
    return <button className={styles.button} {...props} />
}

const AuthSample = (): ReactElement => {
    const [sampleResponse, setSampleResponse] = useState<any>({
        cookie: "",
        session: "",
        token: "",
    })

    const onCookieApi = async (): Promise<void> => {
        await loginQuery.getCookieSample()
    }

    const onSessionApi = async (): Promise<void> => {
        const result = await loginQuery.getSessionSample()

        setSampleResponse((prev: any) => ({
            ...prev,
            session: result.data,
        }))
    }

    const onTokenApi = async (): Promise<void> => {
        const result = await loginQuery.getTokenSample()

        setSampleResponse((prev: any) => ({
            ...prev,
            token: result.data.token,
        }))
    }

    return (
        <div className={styles.authSampleWrapper}>
            <div className={styles.eachWrapper}>
                <Button onClick={onCookieApi}>쿠키 api 샘플</Button>
                <textarea
                    readOnly
                    value={"개발자도구 > 네트워크 탭 참조.\nJS 콘솔에서 쿠키 접근 불가능 - 크롬 브라우저 정책"}
                />
            </div>

            <div className={styles.eachWrapper}>
                <Button onClick={onSessionApi}>세션 api 샘플</Button>
                <textarea readOnly value={sampleResponse.session} />
            </div>
            <div className={styles.eachWrapper}>
                <Button onClick={onTokenApi}>토큰 api 샘플</Button>
                <textarea readOnly value={sampleResponse.token} />
            </div>
        </div>
    )
}

export default AuthSample
