import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/landingpage/landingpage";
import TakeTest from "./pages/student/TakeTest";
import TestInterface from "./pages/student/TestInterface";
import CreateTest from "./pages/teacher/CreateTest";
import ExamResults from "./pages/teacher/ExamResults";
// Import Layout
import StudentLayout from "./components/StudentLayout";
import TeacherLayout from "./components/TeacherLayout";
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
        <Route path="/exam/:testcode" element={<TestInterface />} />

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
        <Route element={<TeacherLayout />}>
          <Route
            path="/teacher/dashboard"
            element={<div className="p-8">Đây là trang Teacher Dashboard</div>}
          />
          <Route path="/teacher/create-test" element={<CreateTest />} />
          <Route
            path="/teacher/results"
            element={<Navigate to="/teacher/dashboard" replace />}
          />
          <Route path="/teacher/results/:examCode" element={<ExamResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
