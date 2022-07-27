import { useState } from "react";
import { SignupButton } from "./Buttons";
import AuthModal from "./AuthModal";
import { useLoginOpen } from "../contexts/ModalsContext";
import Image from "../notice/Image";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const loginOpenState = useLoginOpen()
    
    const userData = useAuth().user
    const setAuthenticated = useAuth().authenticatedState[1]

    function additionalOnSubmit(body) {
        userData.current.id = body.id
        userData.current.avatar = body.avatar
        userData.current.username = body.username
        setAuthenticated(true)
    }

    return (
        <AuthModal
            name="Login"
            fields={{
                "email": {
                    title: "Email",
                    regex: /^(([\w\d].{0,62}[\w\d])|([\w\d]{1,64}))@(?=.{1,63}(\..{1,63}){1,2}$)[\d\w]+-?[\d\w]+(\.[\d\w]+-?[\d\w]+){1,2}$/,
                    errorText: "Please provide a valid email",
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
            otherAuthText="Don't have an account?"
            otherAuthButton={<SignupButton className="text-blue-500" />}
            modalOpen={loginOpenState[0]}
            setModalOpen={loginOpenState[1]}
            submitURL="http://localhost:5000/api/auth/login"
            successImage={<Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" />}
            additionalOnSubmit={additionalOnSubmit}
        />
    )
}