import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/landingpage/landingpage";
import TakeTest from "./pages/student/TakeTest";
import QuizScreen from "./pages/student/QuizScreen";
import ExamIntro from "./pages/student/ExamIntro";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import AddQuestions from "./pages/teacher/AddQuestions";
import ExamDetail from "./pages/teacher/ExamDetail";
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
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/exam-intro/:examId" element={<ExamIntro />} />
        <Route path="/quiz/:examId" element={<QuizScreen />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/create-exam" element={<CreateExam />} />
        <Route path="/teacher/add-questions/:examId" element={<AddQuestions />} />
        <Route path="/teacher/exams/:examId" element={<ExamDetail />} />

        {/* Shared Layout Routes */}
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
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
