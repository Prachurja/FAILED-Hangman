import HoveringDiv from "../core/HoveringDiv";

function ErrorText({value, errorText, errors, hasError, setHasError, formSubmitting, notProvidedText}) {
    const notProvided = formSubmitting && value === ""
    
    return (
        <HoveringDiv
            hovering={hasError || notProvided}
            setHovering={setHasError}
            variants={{
                hidden: { opacity: 0, height: "0" },
                visible: { opacity: 1, height: "auto" }
            }}
            className="text-[0.7rem] text-red-500 [font-weight:500_!important] overflow-hidden"
            closeOnClick={false}
        >
            {notProvided ? notProvidedText : errorText}
            <ul>{
                !notProvided &&
                errors?.map(error => {
                    const {regex: errorRegex, errorText: errorErrorText} = error
                    const errorExists = !errorRegex.test(value)

                    return (
                        <li className={`grid gap-2 grid-flow-col grid-cols-[min-content_auto] ${errorExists ? "text-red-500" : "text-emerald-500"}`} key={errorErrorText.toLowerCase().replace(" ", "-")}>
                            <i className={`fa-solid fa-${errorExists ? "xmark" : "check"}`}></i>
                            {errorErrorText}
                        </li>
                    )
                })
            }</ul>
        </HoveringDiv>
    )
}

export default ErrorText