import { createContext, useContext, useState } from "react"

const AuthContext = createContext()
const SignupOpenContext = createContext()
const LoginOpenContext = createContext()
const NoticeDataContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function useSignupOpen() {
    return useContext(SignupOpenContext)
}

export function useLoginOpen() {
    return useContext(LoginOpenContext)
}

export function useNoticeData() {
    return useContext(NoticeDataContext)
}

export function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={{ authenticatedState: useState(false) }}>
            <SignupOpenContext.Provider value={useState(false)}>
                <LoginOpenContext.Provider value={useState(false)}>
                    <NoticeDataContext.Provider value={{imageState: useState(), noticeState: useState(), modalOpenState: useState(false)}}>
                        {children}
                    </NoticeDataContext.Provider>
                </LoginOpenContext.Provider>
            </SignupOpenContext.Provider>
        </AuthContext.Provider>
    )
}