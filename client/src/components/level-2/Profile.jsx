import { useRef, useState } from "react"
import Avatar from "../../assets/avatars/5.webp"
import { average } from "color.js"
import NavMenu from "../level-3/NavMenu"

function Profile() {
    const [hovering, setHovering] = useState(false)
    const avatarAccent = useRef()
    average(Avatar, { amount: 1, format: "hex" }).then(accent => avatarAccent.current = accent)
    
    return (
        <NavMenu
            hovering={hovering}
            setHovering={setHovering}
            button={<button onClick={() => setHovering(true)} className="[border:black_1px_solid] relative col-start-2 grid place-items-center rounded-[50%] h-10 w-10 bg-cover duration-150" style={{backgroundImage: `url(${Avatar}`, color: avatarAccent.current + "BF", boxShadow: hovering ? "0 0 4px 4px" : ""}}></button>}
        >
            <div className="p-8 flex flex-col gap-5 justify-around items-center font-medium [border-bottom:dashed_1px_gray]">
                 <img src={Avatar} alt="avatar" className="w-20 h-20 rounded-[50%] [border:black_1px_solid] hover:shadow-[0_0_4px_4px] duration-150" style={{color: avatarAccent.current + "BF"}} />
                 <p className="font-medium text-sm">lorem</p>
             </div>
             <div className="p-8">
                 <ul className="flex flex-col gap-1">
                     <li className="font-medium text-[0.9rem]">Profile</li>
                     <li className="font-medium text-[0.9rem]">Settings</li>
                     <li className="font-medium text-[0.9rem]">Contact Us</li>
                     <li className="font-medium text-[0.9rem] mt-6">Sign Out</li>
                 </ul>
             </div>
        </NavMenu>
    )
}

export default Profile