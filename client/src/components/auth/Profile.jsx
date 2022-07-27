import { useRef, useState } from "react"
import { average } from "color.js"
import NavMenu from "../utils/NavMenu"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { hex, hsl } from "color-convert"
import axios from "axios"
import { useNoticeData } from "../contexts/ModalsContext"
import Image from "../notice/Image"

export default function Profile() {
    const [hovering, setHovering] = useState(false)
    const avatarAccent = useRef()
    const darkAvatarAccent = useRef()
    const userData = useAuth().user
    const [loading, setLoading] = useState(true)
    const setAuthenticated = useAuth().authenticatedState[1]
    const noticeData = useNoticeData()

    useEffect(() => {
        average(userData.current.avatar, { amount: 1, format: "hex" }).then(accent => {
            avatarAccent.current = accent
    
            const hslValue = hex.hsl(accent)
            hslValue[2] = 40
            darkAvatarAccent.current = `#${hsl.hex(hslValue)}`
        }).finally(() => setLoading(false))
        //eslint-disable-next-line
    }, [])

    function handleSignout() {
        axios.post("http://localhost:5000/api/auth/signout").then(res => {
            setAuthenticated(false)
            userData.current = {}

            const body = res.data
            noticeData.modalOpenState[1](true)
            noticeData.imageState[1](<Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" />)
            noticeData.noticeState[1](body.message)
            setTimeout(() => noticeData.modalOpenState[1](false), body.message.split(" ").length * 500)
        }).catch(() => {})
    }
    
    return (
        !loading && <NavMenu
            hovering={hovering}
            setHovering={setHovering}
            button={<button onClick={() => setHovering(true)} className="relative col-start-2 grid place-items-center rounded-[50%] h-10 w-10 bg-cover duration-150" style={{border: "1px solid " + darkAvatarAccent.current, backgroundImage: `url(${userData.current.avatar}`, color: avatarAccent.current + "BF", boxShadow: hovering ? "0 0 4px 4px" : ""}}></button>}
        >
            <div className="p-8 flex flex-col gap-5 justify-around items-center font-medium [border-bottom:dashed_1px_gray]">
                 <img src={userData.current.avatar} alt="avatar" className="w-20 h-20 rounded-[50%] hover:shadow-[0_0_4px_4px] duration-150" style={{border: "1px solid " + darkAvatarAccent.current, color: avatarAccent.current + "BF"}} />
                 <p className="font-medium text-sm">{userData.current.username}</p>
             </div>
             <div className="p-8">
                 <ul className="flex flex-col gap-1">
                     <li className="font-medium text-[0.9rem]">
                        <Link to={`/profile/${userData.current.id}`}>Profile</Link>
                     </li>
                     <li className="font-medium text-[0.9rem]">
                        <Link to="/settings">Settings</Link>
                     </li>
                     <li className="font-medium text-[0.9rem]">
                        <Link to="/contact-us">Contact Us</Link>
                     </li>
                     <li className="font-medium text-[0.9rem] mt-6">
                        <button onClick={handleSignout}>Sign Out</button>
                     </li>
                 </ul>
             </div>
        </NavMenu>
    )
}