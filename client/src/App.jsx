import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/home/Header"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import {Notice} from "./components/notice/Notice"
import VerifyEmailElement from "./components/auth/VerifyEmailElement"
import { useAuth } from "./components/contexts/AuthContext"
import { useEffect } from "react"

import axios from "axios"
import { useState } from "react"
axios.defaults.withCredentials = true

export default function App() {
  const setAuthenticated = useAuth().authenticatedState[1]
  const userData = useAuth().user
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.post("http://localhost:5000/api/auth/check").then(async res => {
      const body = res.data
      userData.current.id = body.id
      userData.current.avatar = body.avatar
      userData.current.username = body.username
      setAuthenticated(true)
    }).catch(() => {}).finally(() => setLoading(false))
    //eslint-disable-next-line
  }, [])

  return (
      !loading &&
      <>
        <div className="p-10 grid grid-rows-[auto_1fr] h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/verifyEmail/:verifyemailtoken" element={<VerifyEmailElement />} />
          </Routes>
        </div>
        <Signup />
        <Login />
        <Notice />
      </>
  )
}