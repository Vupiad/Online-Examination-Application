import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Clock, 
  Calendar, 
  Lock, 
  FileText, 
  Hash,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateExam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    durationInMinutes: 60,
    startTime: '',
    endTime: '',
    passcode: '',
    description: '',
    status: 'OPEN'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/exams', formData);
      const savedExam = response.data;
      alert('Tạo thông tin chung thành công! Hãy tiếp tục thêm câu hỏi.');
      navigate(`/teacher/add-questions/${savedExam.id}`, { state: { exam: savedExam } });
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Có lỗi xảy ra khi tạo đề thi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--primary)' }}>Tạo đề thi mới</h1>
            <p className="text-sm text-grey m-0">Thiết lập các thông số cơ bản cho bài thi</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600"
            onClick={() => navigate(-1)}
          >
            Hủy bỏ
          </button>
          <button 
            form="create-exam-form"
            type="submit"
            className="px-6 py-2.5 bg-[#006070] text-white border-none rounded-lg text-sm font-bold flex items-center gap-2 shadow-md shadow-[#006070]/20 hover:bg-[#004d5a]"
            disabled={loading}
          >
            <Save size={18} /> {loading ? 'Đang lưu...' : 'Lưu và Tiếp tục'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#006070] text-white flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="text-xs font-bold m-0" style={{ color: 'var(--primary)' }}>Bước 1</p>
                  <p className="text-[10px] text-grey m-0">Thông tin chung</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300" />
              </div>
              <div className="flex items-center gap-4 mb-6 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="text-xs font-bold m-0 text-slate-500">Bước 2</p>
                  <p className="text-[10px] text-slate-400 m-0">Ngân hàng câu hỏi</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="text-xs font-bold m-0 text-slate-500">Bước 3</p>
                  <p className="text-[10px] text-slate-400 m-0">Cấu hình bảo mật</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e0f2fe] p-6 rounded-2xl border border-[#bae6fd]">
              <h4 className="text-sm font-bold text-[#0369a1] mb-2">Mẹo nhỏ</h4>
              <p className="text-xs text-[#0c4a6e] leading-relaxed">
                Bạn có thể đặt mật mã bài thi để đảm bảo chỉ những sinh viên có mật mã mới có thể tham gia.
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
            <form id="create-exam-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-md font-bold mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-[#006070]" /> Thông tin bài thi
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tên đề thi</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                      placeholder="VD: Kiểm tra Giữa kỳ I - Toán 12"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Môn học</label>
                      <select 
                        className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="">Chọn môn học</option>
                        <option value="Math">Toán học</option>
                        <option value="Literature">Ngữ Văn</option>
                        <option value="English">Tiếng Anh</option>
                        <option value="Physics">Vật lý</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Thời gian (phút)</label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="number" 
                          className="w-full p-3 pl-10 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                          value={formData.durationInMinutes}
                          onChange={e => setFormData({...formData, durationInMinutes: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ngày bắt đầu</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="datetime-local" 
                          className="w-full p-3 pl-10 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                          value={formData.startTime}
                          onChange={e => setFormData({...formData, startTime: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ngày kết thúc</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="datetime-local" 
                          className="w-full p-3 pl-10 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                          value={formData.endTime}
                          onChange={e => setFormData({...formData, endTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mật mã bài thi (Tùy chọn)</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        className="w-full p-3 pl-10 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10"
                        placeholder="Để trống nếu không muốn dùng mật mã"
                        value={formData.passcode}
                        onChange={e => setFormData({...formData, passcode: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mô tả bài thi</label>
                    <textarea 
                      className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#006070]/10 min-h-[100px]"
                      placeholder="Nhập hướng dẫn hoặc ghi chú cho sinh viên..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold m-0">Tự động xáo trộn câu hỏi</h4>
                  <p className="text-[10px] text-grey m-0">Đảm bảo mỗi sinh viên nhận được thứ tự câu hỏi khác nhau</p>
                </div>
                <div className="w-12 h-6 bg-[#006070] rounded-full p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
