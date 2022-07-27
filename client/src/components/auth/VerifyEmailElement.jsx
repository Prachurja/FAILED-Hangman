import { useParams, Navigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNoticeData } from "../contexts/ModalsContext"
import Image from "../notice/Image"
import axios from "axios"

export default function VerifyEmailElement() {
    const {verifyemailtoken} = useParams()
    const noticeData = useNoticeData()
    const setAuthenticated = useAuth().authenticatedState[1]
    const userData = useAuth().user
    const body = useRef()
  
    useEffect(() => {
      axios.post(`http://localhost:5000/api/auth/verifyemail/${verifyemailtoken}`).then(async res => {
        body.current = res.data
        setAuthenticated(true)
        userData.current.id = body.current.userID
        noticeData.imageState[1](<Image iconClass="fa-circle-check" colorClass="text-emerald-500" title="Success!" />)
      }).catch(err => {
        body.current = err.response.data
        noticeData.imageState[1](<Image iconClass="fa-circle-xmark" colorClass="text-red-500" title="Failure" />)
      }).finally(() => {
        noticeData.modalOpenState[1](true)
        noticeData.noticeState[1](body.current.message)
        setTimeout(() => noticeData.modalOpenState[1](false), body.current.message.split(" ").length * 500)
      })
      //eslint-disable-next-line
    }, [verifyemailtoken, noticeData, setAuthenticated, userData])
  
    return (
      <Navigate to="/" />
    )
}