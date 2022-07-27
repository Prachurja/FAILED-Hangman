import { useAuth } from "../contexts/AuthContext"
import { useSignupOpen } from "../contexts/ModalsContext"

export default function Button({children, className, onClick, requiresAuth = false}) {
    function useGetOnClick() {
        const authenticated = useAuth().authenticatedState[0]
        const signupState = useSignupOpen()

        return !requiresAuth || (requiresAuth && authenticated) ? onClick : signupState[1](true)
    }

    return (
        <button onClick={useGetOnClick()} className={"w-32 text-xs justify-center flex items-center bg-[#8a8a8a] text-white py-2 rounded-lg " + className}>{children}</button>
    )
}