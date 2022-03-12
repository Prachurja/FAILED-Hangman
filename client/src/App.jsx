import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/level-1/Header"

function App() {
  return (
    <div className="p-10 grid grid-rows-[auto_1fr] h-screen">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App