import Modal from "../utils/Modal"
import Field from "../form/Field"

import google from "../../assets/icons/google.png"
import facebook from "../../assets/icons/facebook.png"
import apple from "../../assets/icons/apple.png"
import { useNoticeData } from "../contexts/ModalsContext"
import { useState } from "react"
import axios from "axios"


export default function AuthModal({ name, fields, otherAuthText, otherAuthButton, modalOpen, setModalOpen, submitURL, successImage, additionalOnSubmit }) {
    const tempValidityChart = {}

    Object.keys(fields).forEach(key => {
        tempValidityChart[key] = false
    })

    const validityChartState = useState(tempValidityChart)
    const noticeData = useNoticeData()
    
    async function handleSubmit(event) {
        event.preventDefault()
        const emptyFields = Object.values(event.target).filter(e => e.tagName === "INPUT" && e.value === "")

        if(emptyFields.length > 0) {
            emptyFields.forEach(e => {
                const setTemporaryErrorText = fields[e.name].temporaryErrorTextState[1]
                setTemporaryErrorText(`Please provide ${e.placeholder.toLowerCase()}`)
                setTimeout(() => setTemporaryErrorText(), 1000)
            })
        }

        else {
            const formInput = {}
            
            Object.values(event.target).filter(e => e.tagName === "INPUT").forEach(e => {
                if(e.name in fields && !(e.name in formInput)) {
                    formInput[e.name] = e.value
                }
            })

            if(Object.keys(fields).filter(key => (key in formInput) && fields[key].regex.test(formInput[key])).length === Object.values(formInput).length) {
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
        }
    }
    
    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} className="grid p-12 gap-10 text-xs md:w-[40rem]">
            <h1 className="font-bold text-4xl">{name}</h1>
            <div className="grid sm:grid-cols-[3fr_1fr_3fr] sm:grid-rows-none sm:grid-flow-col grid-rows-[auto_1fr_3fr] items-center">
                <form onSubmit={handleSubmit} className="grid grid-rows-[1fr_auto] h-full sm:gap-10 gap-5">
                    <div className="grid gap-3 auto-rows-min my-auto">{
                        Object.keys(fields).map(key => {
                            const {title, regex, errorText, errors, temporaryErrorTextState} = fields[key]
                            const [temporaryErrorText] = temporaryErrorTextState

                            return <Field
                                key={key}
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
                        <button className="h-8 grid grid-flow-col bg-white items-center justify-start gap-2 p-2 rounded-md text-[0.6rem]">
                            <img src={google} alt="google" className="h-4" />
                            <p>{name} with Google</p>
                        </button>
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