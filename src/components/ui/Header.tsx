"use client"

import { ReactElement } from "react"
import { signOut } from "next-auth/react"
import { useCoreStore } from "@lib/stores/store"
import styles from "@styles/ui/header.module.scss"

const Header = (): ReactElement => {
    const { userId, changeUserId } = useCoreStore()

    const handleLogout = (): void => {
        changeUserId("")
        signOut({ callbackUrl: "/" })
    }

    return (
        <div className={styles.headerWrapper}>
            <h1>{"Codeit_FS03_F/E_Sample"}</h1>
            {userId && (
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    로그아웃
                </button>
            )}
        </div>
    )
}

export default Header
