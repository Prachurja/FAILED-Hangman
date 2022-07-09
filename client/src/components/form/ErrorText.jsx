import HoveringDiv from "../utils/HoveringDiv";

export default function ErrorText({value, errorText, temporaryErrorText, errors, hasError, setHasError}) {
    return (
        <HoveringDiv
            hovering={hasError || temporaryErrorText}
            setHovering={setHasError}
            variants={{
                hidden: { opacity: 0, height: "0" },
                visible: { opacity: 1, height: "auto" }
            }}
            className="text-[0.7rem] text-red-500 [font-weight:500_!important] overflow-hidden"
            closeOnClick={false}
        >
            {temporaryErrorText ? temporaryErrorText : errorText}
            <ul>{
                !temporaryErrorText &&
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