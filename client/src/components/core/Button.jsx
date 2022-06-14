import { useAuth, useSignupOpen } from "./AuthContext"

function Button({children, className, onClick, requiresAuth = false}) {
    function useGetOnClick() {
        const authenticated = useAuth().authenticated
        const signupState = useSignupOpen()

        return !requiresAuth || (requiresAuth && authenticated) ? onClick : signupState.setSignupOpen(true)
    }

    return (
        <button onClick={useGetOnClick()} className={"w-32 text-xs justify-center flex items-center bg-[#8a8a8a] text-white py-2 rounded-lg " + className}>{children}</button>
    )
}

export default Button