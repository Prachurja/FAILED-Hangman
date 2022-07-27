import { createContext, useContext, useRef, useState } from "react"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={{ authenticatedState: useState(false), user: useRef({}) }}>
            {children}
        </AuthContext.Provider>
    )
}