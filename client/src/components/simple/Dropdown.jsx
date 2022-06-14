import { useState } from "react"
import Button from "../core/Button"
import Menu from "../basic/Menu"

function Dropdown({title, options}) {
    const [hovering, setHovering] = useState(false)
    const [selection, setSelection] = useState(title)

    return (
        <div>
            <Button onClick={() => setHovering(true)} className="justify-between px-3">
                {selection}
                <i className={`fa-solid fa-play fa-rotate-by [-webkit-text-stroke:black_0.05rem] text-neutral-300 duration-150`} style={{"--fa-rotate-angle": hovering ? "90deg" : "-90deg"}}></i>
            </Button>
            <Menu
                className="duration-150"
                {...{hovering, setHovering}}
                variants={{
                    hidden: { opacity: 0, translateY: "1rem" },
                    visible: { opacity: 1, translateY: "0rem" }
                }}
                options={
                    options.map((option, index) => (
                        <>
                            <input type="radio" name={title} id={index} value={option.title} className="appearance-none" onChange={option.onClick || (() => setSelection(option.title))} />
                            <label htmlFor={index} className="px-[inherit] py-[inherit] [font-size:inherit] absolute top-0 left-0 h-full w-full">{option.title}</label>
                        </>
                    ))
                }
            />
        </div>
    )
}

export default Dropdown