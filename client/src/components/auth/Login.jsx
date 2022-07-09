import { useState } from "react";
import { SignupButton } from "./Buttons";
import AuthModal from "./AuthModal";
import { useLoginOpen } from "../general/Context";
import Image from "../notice/Image";

export default function Login() {
    const loginOpenState = useLoginOpen()

    return (
        <AuthModal
            name="Login"
            fields={{
                "username": {
                    title: "Username",
                    regex: /^[^#]+$/,
                    errorText: "Username cannot contain #",
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
        />
    )
}