import { useState } from "react"
import NavMenu from "../level-3/NavMenu"

function Entry() {
    const [hovering, setHovering] = useState(false)

    return (
        <>
            <ul className="hidden sm:flex justify-end gap-20 items-center">
                <li className="text-lg cursor-pointer">Login</li>
                <li className="text-lg cursor-pointer">Sign Up</li>
            </ul>
            <NavMenu
                hovering={hovering}
                setHovering={setHovering}
                button={<button className={"col-start-2 text-2xl font-[FontAwesome] fa-solid fa-door-" + (hovering ? "open" : "closed")} onClick={() => setHovering(true)}></button>}
                containerClassName="sm:hidden sm:items-center"
                menuClassName="w-36"
            >
                <div className="p-8">
                    <ul className="flex flex-col gap-1">
                        <li className="cursor-pointer font-medium text-[0.9rem]">Sign In</li>
                        <li className="cursor-pointer font-medium text-[0.9rem]">Login</li>
                    </ul>
                </div>
            </NavMenu>
        </>
    )
}

export default Entry