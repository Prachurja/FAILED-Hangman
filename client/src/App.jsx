import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/complex/Header"
import { AuthProvider } from "./components/core/AuthContext"
import Profile from "./pages/Profile"
import Signup from "./components/simple/Signup"
import Login from "./components/simple/Login"

function App() {
  return (
    <AuthProvider>
      <div className="p-10 grid grid-rows-[auto_1fr] h-screen">
        <Header />
        <Router>
          <Routes>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
      <Signup />
      <Login />
    </AuthProvider>
  )
}

export default App