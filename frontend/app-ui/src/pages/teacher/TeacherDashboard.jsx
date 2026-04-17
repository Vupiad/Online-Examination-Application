import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  LogOut, 
  Bell, 
  Search, 
  Filter, 
  MoreVertical,
  BookOpen,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState({
    openExamsCount: 0,
    studentsTestingCount: 0,
    completionRateToday: 0
  });

  const [exams, setExams] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await api.get('/api/exam/stats');
        setStats(statsRes.data);
        const examsRes = await api.get('/api/exam');
        setExams(examsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--primary)' }}>Bảng điều khiển</h1>
          <p className="text-sm text-grey">Tổng quan các hoạt động kiểm tra hiện tại</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-full shadow-sm cursor-pointer relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex items-center gap-3 bg-white p-1 pl-4 rounded-full shadow-sm border border-slate-100">
            <div className="text-right">
              <p className="text-xs font-bold m-0">GS. Nguyễn Văn An</p>
              <p className="text-[10px] text-grey m-0">Giảng viên cao cấp</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] font-bold">
              AN
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="stat-icon bg-[#e0f2fe] text-[#0369a1]">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-grey font-semibold mb-1">Đề thi đang mở</p>
            <h2 className="text-2xl font-bold m-0">{stats.openExamsCount}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-[#f0fdf4] text-[#166534]">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-grey font-semibold mb-1">Học sinh đang thi</p>
            <h2 className="text-2xl font-bold m-0">{stats.studentsTestingCount}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-[#f5f3ff] text-[#5b21b6]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-grey font-semibold mb-1">Hoàn thành hôm nay</p>
            <h2 className="text-2xl font-bold m-0">{stats.completionRateToday}%</h2>
          </div>
        </div>
      </div>

      {/* Exam Table Section */}
      <section className="table-container mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-grey" />
            <h2 className="text-md font-bold m-0">Danh sách đề thi gần đây</h2>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey" />
              <input 
                type="text" 
                placeholder="Tìm kiếm đề thi..." 
                className="pl-9 pr-4 py-2 bg-[#f1f5f9] border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f1f5f9] border-none rounded-lg text-sm text-grey font-semibold cursor-pointer">
              <Filter size={16} /> Lọc
            </button>
          </div>
        </div>

        <table className="exam-table">
          <thead>
            <tr>
              <th>Tên đề thi</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Hạn bài thi</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? exams.slice(0, 5).map((exam, index) => (
              <tr key={index}>
                <td>
                  <Link 
                    to={`/teacher/exams/${exam.id}`} 
                    className="font-bold m-0 text-slate-800 hover:text-[#006070] transition-colors decoration-none"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {exam.title}
                  </Link>
                  <p className="text-xs text-grey m-0">{exam.subject}</p>
                </td>
                <td>
                  <span className={`status-badge ${exam.status === 'OPEN' ? 'status-open' : 'status-closed'}`}>
                    {exam.status === 'OPEN' ? 'Đang mở' : exam.status === 'DRAFT' ? 'Nháp' : 'Đã đóng'}
                  </span>
                </td>
                <td>{exam.durationInMinutes} phút</td>
                <td>
                  {exam.startTime ? new Date(exam.startTime).toLocaleDateString('vi-VN') : 'N/A'} - 
                  {exam.endTime ? new Date(exam.endTime).toLocaleDateString('vi-VN') : 'N/A'}
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-grey" />
                    <span>{exam.status === 'OPEN' ? '42/45 sinh viên' : 'Đã hoàn thành'}</span>
                  </div>
                </td>
                <td><MoreVertical size={18} className="text-grey cursor-pointer" /></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-grey)' }}>
                  Chưa có đề thi nào. Hãy tạo đề thi mới!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          <p className="text-xs text-grey">Hiển thị 1-3 trong số 12 đề thi</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-[#f1f5f9] border-none rounded text-xs font-semibold cursor-pointer">Trước</button>
            <button className="px-3 py-1 bg-[#0369a1] text-white border-none rounded text-xs font-semibold cursor-pointer">1</button>
            <button className="px-3 py-1 bg-[#f1f5f9] border-none rounded text-xs font-semibold cursor-pointer">2</button>
            <button className="px-3 py-1 bg-[#f1f5f9] border-none rounded text-xs font-semibold cursor-pointer">Tiếp</button>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-md font-bold mb-6 flex items-center gap-2">Thông báo từ hệ thống</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm font-bold m-0">Cập nhật tính năng chống gian lận mới</p>
                <p className="text-xs text-grey mt-1">Hệ thống đã bổ sung tính năng theo dõi tab trình duyệt...</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
              <div>
                <p className="text-sm font-bold m-0">Bảo trì hệ thống định kỳ</p>
                <p className="text-xs text-grey mt-1">Chủ nhật này từ 02:00 đến 04:00 sáng...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f9ff] p-6 rounded-xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[#0369a1] text-md font-bold mb-4">Mẹo dành cho giáo viên</h3>
            <p className="text-sm text-[#0c4a6e] leading-relaxed mb-6">
              Bạn có biết rằng việc sử dụng ngân hàng câu hỏi giúp tiết kiệm 40% thời gian tạo đề thi?
            </p>
            <button className="btn btn-primary bg-[#0369a1] border-none py-2 px-6 w-auto text-xs">
              Khám phá Ngân hàng đề
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 text-[#e0f2fe]">
            <Lightbulb size={120} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeacherDashboard;
