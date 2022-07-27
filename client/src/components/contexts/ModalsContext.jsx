import { createContext, useContext, useState } from "react"

const SignupOpenContext = createContext()
const LoginOpenContext = createContext()
const NoticeDataContext = createContext()

export function useSignupOpen() {
    return useContext(SignupOpenContext)
}

export function useLoginOpen() {
    return useContext(LoginOpenContext)
}

export function useNoticeData() {
    return useContext(NoticeDataContext)
}

export function ModalsProvider({ children }) {
    return (
        <SignupOpenContext.Provider value={useState(false)}>
            <LoginOpenContext.Provider value={useState(false)}>
                <NoticeDataContext.Provider value={{imageState: useState(), noticeState: useState(), modalOpenState: useState(false)}}>
                    {children}
                </NoticeDataContext.Provider>
            </LoginOpenContext.Provider>
        </SignupOpenContext.Provider>
    )
}