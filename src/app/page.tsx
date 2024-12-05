"use client"

import { ReactElement } from "react"
import { useRouter } from "next/navigation"
import styles from "@styles/pages/home.module.scss"

export default function Home(): ReactElement {
    const router = useRouter()

    return (
        <div className={styles.homeWrapper}>
            <h1>{"여기는 메인일지도.."}</h1>
            <br />
            <button className={styles.todoBtn} onClick={() => router.push("/todo")}>
                {"TODO List 페이지"}
            </button>
            <br />
            <button className={styles.authSampleBtn} onClick={() => router.push("/authSample")}>
                {"인증 api 샘플 페이지"}
            </button>
        </div>
    )
}
