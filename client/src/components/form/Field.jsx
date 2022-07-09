import { useState } from "react"
import ErrorText from "./ErrorText"

export default function Field({ name, title, regex, errorText, temporaryErrorText, errors }) {
    const [value, setValue] = useState("")

    const hasError = () => (value !== "" && !regex.test(value)) || temporaryErrorText
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className="grid gap-2">
            <ErrorText
                value={value}
                errorText={errorText}
                temporaryErrorText={temporaryErrorText}
                errors={errors}
                hasError={hasError()}
                setHasError={() => {}}
            />
            <div className="relative grid items-center ">
                <input
                    type="text"
                    placeholder={title}
                    name={name}
                    id={name}
                    autoComplete="none"
                    spellCheck={false}
                    value={value}
                    onChange={handleChange}
                    className={`outline-0 h-8 w-full p-3 rounded-md bg-stone-300 placeholder-stone-700 transition-[150ms] border-[1px] ${hasError() ? "border-solid border-red-500" : "border-dotted border-stone-400"}`}
                />
                <i className={`absolute right-2 fa-solid bg-white rounded-full ${regex.test(value) && !temporaryErrorText ? "fa-circle-check text-emerald-500" : "fa-circle-xmark text-red-500"}`}></i>
            </div>
        </div>
    )
}