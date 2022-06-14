import React, { useContext, useState } from "react"

const AuthContext = React.createContext()
const SignupOpenContext = React.createContext()
const LoginOpenContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function useSignupOpen() {
    return useContext(SignupOpenContext)
}

export function useLoginOpen() {
    return useContext(LoginOpenContext)
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ authenticated: false })
    const [signupOpen, setSignupOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            <SignupOpenContext.Provider value={{signupOpen, setSignupOpen}}>
                <LoginOpenContext.Provider value={{loginOpen, setLoginOpen}}>
                    {children}
                </LoginOpenContext.Provider>
            </SignupOpenContext.Provider>
        </AuthContext.Provider>
    )
}