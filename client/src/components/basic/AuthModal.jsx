import Modal from "../core/Modal"
import Field from "../core/Field"

import google from "../../assets/icons/google.png"
import facebook from "../../assets/icons/facebook.png"
import apple from "../../assets/icons/apple.png"

function AuthModal({ name, fields, otherAuthText, otherAuthButton, modalOpen, setModalOpen }) {
    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="grid p-10 gap-10 text-xs w-[80vw] md:w-[40rem]">
                <h1 className="font-bold text-4xl">{name}</h1>
                <div className="grid sm:grid-cols-[3fr_1fr_3fr] sm:grid-rows-none sm:grid-flow-col grid-rows-[auto_1fr_3fr] items-center">
                    <div className="grid grid-flow-row gap-3 grid-rows-[min-content]">
                        { fields.map(field => <Field key={field} name={field} />) }
                        <button type="submit" className="sm:hidden block bg-stone-400 text-white h-8 w-full text-left pl-3 border-dotted border-stone-500 border-[1px] rounded-md">{name}</button>
                    </div>
                    <p className="grid place-items-center">or,</p>
                    <div className="grid grid-flow-row gap-3">
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
                </div>
                <div className="grid grid-flow-col sm:grid-cols-[3fr_1fr_3fr] grid-cols-1">
                    <div className="sm:grid justify-start hidden sm:visible">
                        <button type="submit" className="bg-stone-400 text-white h-8 w-28 border-dotted border-stone-500 border-[1px] rounded-md">{name}</button>
                    </div>
                    <div className="hidden sm:block"></div>
                    <div className="grid justify-start">
                        <p>{otherAuthText} {otherAuthButton}!</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AuthModal