import { LoginButton } from "../basic/AuthButtons";
import Auth from "../basic/AuthModal";
import { useSignupOpen } from "../core/AuthContext";

function Signup() {
    const signupOpenState = useSignupOpen()

    return (
        <Auth
            name="Sign up"
            fields={["Username", "Email", "Password"]}
            otherAuthText="Already have an account?"
            otherAuthButton={<LoginButton className="text-blue-500" />}
            modalOpen={signupOpenState.signupOpen}
            setModalOpen={signupOpenState.setSignupOpen}
        />
    )
}

export default Signup