import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/LandingPage/Landing.jsx'
import Login from './pages/Login/Login.jsx'
import TestBuilder from './pages/TestBuilder/TestBuilder.jsx'
import DashboardTeacher from './pages/DashboardTeacher/DashboardTeacher.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-builder" element={<TestBuilder />} />
          <Route path="/dashboard-teacher" element={<DashboardTeacher />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
