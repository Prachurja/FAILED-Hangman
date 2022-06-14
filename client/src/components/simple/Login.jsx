import { SignupButton } from "../basic/AuthButtons";
import Auth from "../basic/AuthModal";
import { useLoginOpen } from "../core/AuthContext";

function Login() {
    const loginOpenState = useLoginOpen()

    return (
        <Auth
            name="Login"
            fields={["Username", "Password"]}
            otherAuthText="Don't have an account?"
            otherAuthButton={<SignupButton className="text-blue-500" />}
            modalOpen={loginOpenState.loginOpen}
            setModalOpen={loginOpenState.setLoginOpen}
        />
    )
}

export default Login