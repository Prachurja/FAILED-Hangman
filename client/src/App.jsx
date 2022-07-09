import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/home/Header"
import { AuthProvider } from "./components/general/Context"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import {Notice} from "./components/notice/Notice"
import VerifyEmailElement from "./components/auth/VerifyEmailElement"

export default function App() {
  return (
    <AuthProvider>
      <div className="p-10 grid grid-rows-[auto_1fr] h-screen">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/verifyEmail/:verifyemailtoken" element={<VerifyEmailElement />} />
          </Routes>
        </Router>
      </div>
      <Signup />
      <Login />
      <Notice />
    </AuthProvider>
  )
}