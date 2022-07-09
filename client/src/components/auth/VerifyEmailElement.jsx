import { useParams, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth, useNoticeData } from "../general/Context"
import Image from "../notice/Image"
import Cookies from "universal-cookie"

export default function VerifyEmailElement() {
    const {verifyemailtoken} = useParams()
    const noticeData = useNoticeData()
    const setAuthenticated = useAuth().authenticatedState[1]
  
    //eslint-disable-next-line
    useEffect(async () => {
      const res = await fetch(`http://localhost:5000/api/auth/verifyemail/${verifyemailtoken}`, {
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        method: "POST"
      })
  
      const body = await res.json()

      if(res.ok) {
        setAuthenticated(true)
        new Cookies().set("token", body.token, {httpOnly: true, path: "/"})
      }

      noticeData.imageState[1](res.ok ? <Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" /> : <Image iconClass="fa-circle-xmark" colorClass="text-red-500" title="Failure" />)
      noticeData.modalOpenState[1](true)
      noticeData.noticeState[1](body.message)
      setTimeout(() => noticeData.modalOpenState[1](false), body.message.split(" ").length * 500)
    }, [verifyemailtoken, noticeData, setAuthenticated])
  
    return (
      <Navigate to="/" />
    )
}