import { useSignupOpen, useLoginOpen } from "../core/AuthContext"

export function LoginButton({ additionalOnClick, className }) {
    const signupOpenState = useSignupOpen()
    const loginOpenState = useLoginOpen()

    return (
        <button className={className} onClick={() => {
            signupOpenState.setSignupOpen(false)
            loginOpenState.setLoginOpen(true)

            if(additionalOnClick) additionalOnClick()
        }}>Login</button>
    )
}

export function SignupButton({ additionalOnClick, className }) {
    const signupOpenState = useSignupOpen()
    const loginOpenState = useLoginOpen()

    return (
        <button className={className} onClick={() => {
            signupOpenState.setSignupOpen(true)
            loginOpenState.setLoginOpen(false)

            if(additionalOnClick) additionalOnClick()
        }}>Sign Up</button>
    )
}