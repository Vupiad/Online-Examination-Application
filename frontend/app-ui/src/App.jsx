import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/landingpage/landingpage";
import TakeTest from "./pages/student/TakeTest";
// Import Layout
import StudentLayout from "./components/StudentLayout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Các trang công khai (Không có Sidebar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<LandingPage />} />

        <Route element={<StudentLayout />}>
          <Route
            path="/dashboard"
            element={<div className="p-8">Đây là trang Dashboard</div>}
          />
          <Route path="/taketest" element={<TakeTest />} />
          <Route
            path="/settings"
            element={<div className="p-8">Đây là trang Settings</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
