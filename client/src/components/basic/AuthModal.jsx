import Modal from "../core/Modal"
import Field from "../core/Field"

import google from "../../assets/icons/google.png"
import facebook from "../../assets/icons/facebook.png"
import apple from "../../assets/icons/apple.png"
import { useState } from "react"


function AuthModal({ name, fields, otherAuthText, otherAuthButton, modalOpen, setModalOpen, handleSubmit }) {
    const [formSubmitting, setFormSubmitting] = useState(false)
    const tempValidityChart = {}

    fields.forEach(field => {
        tempValidityChart[field.name] = false
    })

    const validityChartState = useState(tempValidityChart)
    const [validityChart] = validityChartState
    
    function formHandleSubmit(event) {
        event.preventDefault()
        if(!formSubmitting) setFormSubmitting(true)
        setTimeout(() => setFormSubmitting(false), 2000)
        if(new Set(Object.values(validityChart)).size === 1 && Object.values(validityChart)[0] === true) handleSubmit(event)
    }
    
    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="grid p-10 gap-10 text-xs w-[80vw] md:w-[40rem]">
                <h1 className="font-bold text-4xl">{name}</h1>
                <div className="grid sm:grid-cols-[3fr_1fr_3fr] sm:grid-rows-none sm:grid-flow-col grid-rows-[auto_1fr_3fr] items-center">
                    <form onSubmit={formHandleSubmit} className="grid grid-rows-[1fr_auto] h-full sm:gap-10 gap-5">
                        <div className="grid gap-3 auto-rows-min my-auto">{
                            fields.map(field => {
                                const {name: fieldName, regex, errorText, errors} = field

                                return <Field
                                    key={fieldName.toLowerCase().replace(" ", "-")}
                                    name={fieldName}
                                    regex={regex}
                                    errorText={errorText}
                                    errors={errors}
                                    formSubmitting={formSubmitting}
                                    notProvidedText={`Please provide ${fieldName.toLowerCase()}`}
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
            </div>
        </Modal>
    )
}

export default AuthModal