import { useSignupOpen, useLoginOpen } from "../general/Context"

export function LoginButton({ additionalOnClick, className }) {
    const signupOpenState = useSignupOpen()
    const loginOpenState = useLoginOpen()

    return (
        <button className={className} onClick={() => {
            signupOpenState[1](false)
            loginOpenState[1](true)

            if(additionalOnClick) additionalOnClick()
        }}>Login</button>
    )
}

export function SignupButton({ additionalOnClick, className }) {
    const signupOpenState = useSignupOpen()
    const loginOpenState = useLoginOpen()

    return (
        <button className={className} onClick={() => {
            signupOpenState[1](true)
            loginOpenState[1](false)

            if(additionalOnClick) additionalOnClick()
        }}>Sign Up</button>
    )
}