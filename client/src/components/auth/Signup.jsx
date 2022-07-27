import { useState } from "react";
import { LoginButton } from "./Buttons";
import AuthModal from "./AuthModal";
import { useSignupOpen } from "../contexts/ModalsContext";
import Image from "../notice/Image";

export default function Signup() {
    const signupOpenState = useSignupOpen()

    return (
        <AuthModal
            name="Sign up"
            fields={{
                "username": {
                    title: "Username",
                    regex: /^[^#]+$/,
                    errorText: "Username cannot contain #",
                    temporaryErrorTextState: useState(),
                },
                "email": {
                    title: "Email",
                    regex: /^(([\w\d].{0,62}[\w\d])|([\w\d]{1,64}))@(?=.{1,63}(\..{1,63}){1,2}$)[\d\w]+-?[\d\w]+(\.[\d\w]+-?[\d\w]+){1,2}$/,
                    errorText: "Please provide a valid email",
                    afterSubmit: true,
                    temporaryErrorTextState: useState()
                },
                "password": {
                    title: "Password",
                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    errorText: "Password must have",
                    temporaryErrorTextState: useState(),
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
            }}
            otherAuthText="Already have an account?"
            otherAuthButton={<LoginButton className="text-blue-500" />}
            modalOpen={signupOpenState[0]}
            setModalOpen={signupOpenState[1]}
            submitURL="http://localhost:5000/api/auth/signup"
            successImage={<Image iconClass="fa-envelope" iconStyle="fa-regular"/>}
        />
    )
}