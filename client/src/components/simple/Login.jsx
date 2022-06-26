import { SignupButton } from "../basic/AuthButtons";
import AuthModal from "../basic/AuthModal";
import { useLoginOpen } from "../core/AuthContext";

function Login() {
    const loginOpenState = useLoginOpen()

    function handleSubmit(event) {
        console.log("login!")
    }

    return (
        <AuthModal
            name="Login"
            fields={[
                {
                    name: "Username",
                    regex: /^[^#]+$/,
                    errorText: "Username cannot contain #"
                },
                {
                    name: "Password",
                    regex: /^((?=.*[A-Z])(?=.*[a-z])(?=.*\d).*){8,}/,
                    errorText: "Password must have",
                    errors: [
                        {
                            regex: /^.{8,}$/,
                            errorText: "8 characters"
                        },
                        {
                            regex: /\d/,
                            errorText: "1 digit"
                        },
                        {
                            regex: /[A-Z]/,
                            errorText: "1 uppercase letter"
                        },
                        {
                            regex: /[a-z]/,
                            errorText: "1 lowercase letter"
                        }
                    ]
                }
            ]}
            otherAuthText="Don't have an account?"
            otherAuthButton={<SignupButton className="text-blue-500" />}
            modalOpen={loginOpenState.loginOpen}
            setModalOpen={loginOpenState.setLoginOpen}
            handleSubmit={handleSubmit}
        />
    )
}

export default Login