import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/landingpage/landingpage";
import TakeTest from "./pages/student/TakeTest";
import QuizScreen from "./pages/student/QuizScreen";
import ExamIntro from "./pages/student/ExamIntro";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentHistory from "./pages/student/StudentHistory";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import AddQuestions from "./pages/teacher/AddQuestions";
import ExamDetail from "./pages/teacher/ExamDetail";
import TestInterface from "./pages/student/TestInterface";
import CreateTest from "./pages/teacher/CreateTest";
import ExamResults from "./pages/teacher/ExamResults";
import StudentList from "./pages/teacher/StudentList";
import UpdateTest from "./pages/teacher/UpdateTest";
import ResultDetail from "./pages/student/ResultDetail";
import QuestionBank from "./pages/teacher/QuestionBank";
import ClassList from "./pages/teacher/ClassList";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/landingpage" element={<LandingPage />} />

        {/* Student Layout Routes */}
        <Route element={<StudentLayout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/student/dashboard" replace />}
          />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/history" element={<StudentHistory />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/taketest" element={<Navigate to="/take-test" replace />} />
          <Route path="/exam-intro/:examId" element={<ExamIntro />} />
          <Route path="/quiz/:resultsId" element={<QuizScreen />} />
          <Route path="/review/:testCode" element={<ResultDetail />} />
          <Route
            path="/settings"
            element={<div className="p-8">Đây là trang Settings</div>}
          />
        </Route>

        {/* Full-screen Exam Interface (No Sidebar) */}
        <Route path="/exam/:testcode" element={<TestInterface />} />

        <Route element={<TeacherLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/create-exam" element={<CreateExam />} />
          <Route
            path="/teacher/add-questions/:examId"
            element={<AddQuestions />}
          />
          <Route path="/teacher/exams/:examId" element={<ExamDetail />} />
          <Route path="/teacher/students" element={<StudentList />} />
          <Route path="/teacher/create-test" element={<CreateTest />} />
          <Route
            path="/teacher/results"
            element={<Navigate to="/teacher/dashboard" replace />}
          />
          <Route path="/teacher/results/:examCode" element={<ExamResults />} />
          <Route path="/teacher/update-test/:examCode" element={<UpdateTest />} />
          <Route path="/teacher/question-bank" element={<QuestionBank />} />
          <Route path="/teacher/classes" element={<ClassList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
