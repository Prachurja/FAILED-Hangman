import HoveringDiv from "../level-4/HoveringDiv"

function NavMenu({children, button, hovering, setHovering, containerClassName, menuClassName}) {
    return (
        <div className={"relative flex justify-end " + containerClassName}>
            <div className="absolute grid gap-2 [grid-template-columns:repeat(2, auto)] [grid-template-rows:repeat(2, auto)]">
                {button}
                <HoveringDiv
                    className={"grid w-60 col-start-1 bg-neutral-100 shadow-lg rounded-lg origin-top-right " + menuClassName}
                    hovering={hovering}
                    setHovering={setHovering}
                    variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                >
                    {children}
                </HoveringDiv>
            </div>
        </div>
    )
}

export default NavMenu