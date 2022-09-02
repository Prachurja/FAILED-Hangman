import Modal from "../utils/Modal"
import Field from "../form/Field"

import facebook from "../../assets/icons/facebook.png"
import apple from "../../assets/icons/apple.png"
import { useNoticeData } from "../contexts/ModalsContext"
import { useState } from "react"
import axios from "axios"
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import { useEffect } from "react"
import Image from "../notice/Image"
import { useAuth } from "../contexts/AuthContext"


export default function AuthModal({ name, fields, otherAuthText, otherAuthButton, modalOpen, setModalOpen, submitURL, successImage, additionalOnSubmit }) {
    const setAuthenticated = useAuth().authenticatedState[1]
    const userData = useAuth().user

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: clientId,
                scope: ''
            })
        }
        
        gapi.load('client:auth2', initClient);
        //eslint-disable-next-line
    }, [])

    const tempValidityChart = {}
    const usernameErrorTextState = useState()

    Object.keys(fields).forEach(key => {
        tempValidityChart[key] = false
    })

    const validityChartState = useState(tempValidityChart)
    const noticeData = useNoticeData()
    
    function defaultPost(formInput) {
        axios.post(submitURL, formInput).then(res => {
            const body = res.data

            setModalOpen(false)
            noticeData.modalOpenState[1](true)
            noticeData.imageState[1](successImage)
            noticeData.noticeState[1](body.message)

            additionalOnSubmit(body)

            setTimeout(() => noticeData.modalOpenState[1](false), body.message.split(" ").length * 500)
        }).catch(err => {
            const body = err.response.data
            
            Object.keys(body.message).forEach(key => {
                const setTemporaryErrorText = fields[key].temporaryErrorTextState[1]
                setTemporaryErrorText(body.message[key])
                setTimeout(() => setTemporaryErrorText(), 1000)
            })
        })
    }

    function thirdPartyPost(data) {
        return (formInput) => {
            const {username} = formInput
            axios.post("http://localhost:5000/api/auth/thirdpartysignup", {...data, username}).then(res => {
                const body = res.data
            
                userData.current.id = body.id
                userData.current.avatar = body.avatar
                userData.current.username = body.username
                setAuthenticated(true)

                setModalOpen(false)
                noticeData.modalOpenState[1](true)
                noticeData.imageState[1](<Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" />)
                noticeData.noticeState[1](body.message)

                setTimeout(() => noticeData.modalOpenState[1](false), body.message.split(" ").length * 500)
            }).catch(err => {
                const setTemporaryErrorText = usernameErrorTextState[1]
                setTemporaryErrorText(err.response.data.message.username)
                setTimeout(() => setTemporaryErrorText(), 1000)
            })
        }
    }

    async function handleSubmit(event, post=defaultPost) {
        event.preventDefault()
        const emptyFields = Object.values(event.target).filter(e => e.tagName === "INPUT" && e.value === "")

        if(emptyFields.length > 0) {
            emptyFields.forEach(e => {
                //eslint-disable-next-line
                const setTemporaryErrorText = e.name == "third-party-username" ? usernameErrorTextState[1] : fields[e.name].temporaryErrorTextState[1]
                setTemporaryErrorText(`Please provide ${e.placeholder.toLowerCase()}`)
                setTimeout(() => setTemporaryErrorText(), 1000)
            })
        }

        else {
            const formInput = {}
            
            Object.values(event.target).filter(e => e.tagName === "INPUT").forEach(e => {
                if(!(e.name in formInput)) {
                    formInput[e.name] = e.value
                }
            })

            if(Object.keys(fields).filter(key => (key in formInput) && fields[key].regex.test(formInput[key])).length === Object.values(formInput).length) {
                post(formInput)
            }
        }
    }

    function handle3rdPartySubmit(data) {
        axios.post("http://localhost:5000/api/auth/thirdpartylogin", data).then(res => {
            const body = res.data
            
            userData.current.id = body.id
            userData.current.avatar = body.avatar
            userData.current.username = body.username
            setAuthenticated(true)

            setModalOpen(false)
            noticeData.modalOpenState[1](true)
            noticeData.imageState[1](<Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" />)
            noticeData.noticeState[1](body.message)

            setTimeout(() => noticeData.modalOpenState[1](false), body.message.split(" ").length * 500)
        }).catch(() => {
            setModalOpen(false)
            noticeData.modalOpenState[1](true)
            noticeData.imageState[1](<h1 className="font-bold text-3xl w-1/2">Choose Username</h1>)
            noticeData.noticeState[1](
                <form autoComplete="off" onSubmit={e => handleSubmit(e, thirdPartyPost(data))} className="pt-4 grid gap-2 text-xs">
                    <Field
                        key="third-party-username"
                        type="text"
                        name="third-party-username"
                        title="Username"
                        value={data.username}
                        regex={/^[^#]+$/}
                        errorText={"Username cannot contain #"}
                        temporaryErrorText={usernameErrorTextState[0]}
                        validityChartState={validityChartState}
                    />
                    <button type="submit" className="bg-stone-400 text-white h-8 w-full text-left pl-3 border-dotted border-stone-500 border-[1px] rounded-md">Submit</button>
                </form>
            )
        })
    }
    
    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} className="grid p-12 gap-10 text-xs md:w-[40rem]">
            <h1 className="font-bold text-4xl">{name}</h1>
            <div className="grid sm:grid-cols-[3fr_1fr_3fr] sm:grid-rows-none sm:grid-flow-col grid-rows-[auto_1fr_3fr] items-center">
                <form autoComplete="off" onSubmit={handleSubmit} className="grid grid-rows-[1fr_auto] h-full sm:gap-10 gap-5">
                    <div className="grid gap-3 auto-rows-min my-auto">{
                        Object.keys(fields).map(key => {
                            const {title, type, regex, errorText, errors, temporaryErrorTextState} = fields[key]
                            const [temporaryErrorText] = temporaryErrorTextState

                            return <Field
                                key={key}
                                type={type}
                                name={key}
                                title={title}
                                regex={regex}
                                errorText={errorText}
                                temporaryErrorText={temporaryErrorText}
                                errors={errors}
                                validityChartState={validityChartState}
                            />
                        })
                    }</div>
                    <button type="submit" className="bg-stone-400 text-white h-8 w-full text-left pl-3 border-dotted border-stone-500 border-[1px] rounded-md">{name}</button>
                </form>
                <div className="grid place-items-center sm:gap-10 sm:grid-rows-[1fr_auto] sm:h-full">
                    <p>or,</p>
                    <div className="sm:h-8 sm:block hidden"></div>
                </div>
                <div className="grid grid-rows-[1fr_auto] h-full gap-10">
                    <div className="grid gap-3 auto-rows-min my-auto">
                        <GoogleLogin
                            clientId={clientId}
                            buttonText={`${name} with Google`}
                            onSuccess={res => handle3rdPartySubmit((({name: username, ...rest}) => ({username, ...rest}))(res.profileObj))}
                            onFailure={() => {}}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                        <button className="h-8 grid grid-flow-col bg-blue-600 text-white items-center justify-start gap-2 p-2 rounded-md text-[0.6rem]">
                            <img src={facebook} alt="facebook" className="h-4" />
                            <p>{name} with Facebook</p>
                        </button>
                        <button className="h-8 grid grid-flow-col bg-black text-white items-center justify-start gap-2 p-2 rounded-md text-[0.6rem]">
                            <img src={apple} alt="apple" className="h-4" />
                            <p>{name} with Apple</p>
                        </button>
                    </div>
                    <div className="grid justify-start items-center p-2">
                        <p>{otherAuthText} {otherAuthButton}!</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}