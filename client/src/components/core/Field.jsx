import { useState } from "react"
import ErrorText from "../basic/ErrorText"

function Field({ name, regex, errorText, errors, formSubmitting, notProvidedText, validityChartState }) {
    const [value, setValue] = useState("")
    const [validityChart] = validityChartState

    const hasError = () => value !== "" && !regex.test(value)
    const handleChange = (event) => {
        setValue(event.target.value)

        const regexMatches = regex.test(value)
        if(validityChart[name] !== regexMatches) validityChart[name] = regexMatches
    }

    return (
        <div className="grid gap-2">
            <ErrorText
                value={value}
                errorText={errorText}
                errors={errors}
                hasError={hasError()}
                setHasError={() => {}}
                formSubmitting={formSubmitting}
                notProvidedText={notProvidedText}
            />
            <div className="relative grid items-center ">
                <input
                    type="text"
                    placeholder={name}
                    name={name.toLowerCase().replace(" ", "-")}
                    id={name.toLowerCase().replace(" ", "-")}
                    autoComplete="none"
                    spellCheck={false}
                    value={value}
                    onChange={handleChange}
                    className={`outline-0 h-8 w-full p-3 rounded-md bg-stone-300 placeholder-stone-700 transition-[150ms] ${hasError() ? "border-solid border-red-500 border-[2px]" : "border-dotted border-stone-400 border-[1px]"}`}
                />
                <i className={`absolute right-2 fa-solid ${regex.test(value) ? "fa-circle-check text-emerald-500" : "fa-circle-xmark text-red-500"}`}></i>
            </div>
        </div>
    )
}

export default Field