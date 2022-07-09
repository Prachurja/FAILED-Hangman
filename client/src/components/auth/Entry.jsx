import { useState } from "react"
import NavMenu from "../utils/NavMenu"
import { LoginButton, SignupButton } from "./Buttons"

export default function Entry() {
    const [hovering, setHovering] = useState(false)

    return (
        <>
            <ul className="hidden sm:flex justify-end gap-20 items-center">
                <li className="text-lg cursor-pointer"><LoginButton /></li>
                <li className="text-lg cursor-pointer"><SignupButton /></li>
            </ul>
            <NavMenu
                hovering={hovering}
                setHovering={setHovering}
                button={<button className={"col-start-2 text-2xl font-[FontAwesome] fa-solid fa-door-" + (hovering ? "open" : "closed")} onClick={() => setHovering(true)}></button>}
                containerClassName="sm:hidden sm:items-center"
                menuClassName="w-[10rem]"
            >
                <div className="p-8">
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium text-[0.9rem]"><LoginButton additionalOnClick={() => setHovering(false)} /></li>
                        <li className="cursor-pointer font-medium text-[0.9rem]"><SignupButton additionalOnClick={() => setHovering(false)} /></li>
                    </ul>
                </div>
            </NavMenu>
        </>
    )
}