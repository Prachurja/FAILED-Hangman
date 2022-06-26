import { LoginButton } from "../basic/AuthButtons";
import AuthModal from "../basic/AuthModal";
import { useSignupOpen } from "../core/AuthContext";

function Signup() {
    const signupOpenState = useSignupOpen()

    function handleSubmit(event) {
        console.log("signup!")
    }

    return (
        <AuthModal
            name="Sign up"
            fields={[
                {
                    name: "Username",
                    regex: /^[^#]+$/,
                    errorText: "Username cannot contain #"
                },
                {
                    name: "Email",
                    regex: /^(([\w\d].{0,62}[\w\d])|([\w\d]{1,64}))@(?=.{1,63}(\..{1,63}){1,2}$)[\d\w]+-?[\d\w]+(\.[\d\w]+-?[\d\w]+){1,2}$/,
                    errorText: "Please provide a valid email",
                    afterSubmit: true
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
            otherAuthText="Already have an account?"
            otherAuthButton={<LoginButton className="text-blue-500" />}
            modalOpen={signupOpenState.signupOpen}
            setModalOpen={signupOpenState.setSignupOpen}
            handleSubmit={handleSubmit}
        />
    )
}

export default Signup