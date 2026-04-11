import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, Shield, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', { ...formData, role });
  };

  return (
    <div className="register-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Navigation Header */}
      <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 96, 112, 0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>Assessment Management</h2>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Khám phá</Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Tài liệu</Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Liên hệ</Link>
        </nav>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="card" style={{ maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Tạo tài khoản mới</h1>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.925rem' }}>Bắt đầu hành trình học tập an nhiên cùng chúng tôi.</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p className="input-label" style={{ marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em' }}>BẠN LÀ AI?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className={`btn ${role === 'student' ? 'btn-primary' : 'btn-social'}`}
                style={{ flex: 1, height: '100px', flexDirection: 'column', gap: '0.5rem' }}
                onClick={() => setRole('student')}
              >
                <div style={{ background: role === 'student' ? 'rgba(255,255,255,0.2)' : 'var(--primary-light)', padding: '8px', borderRadius: '8px' }}>
                  <User size={24} />
                </div>
                Tôi là Học sinh
              </button>
              <button
                className={`btn ${role === 'teacher' ? 'btn-primary' : 'btn-social'}`}
                style={{ flex: 1, height: '100px', flexDirection: 'column', gap: '0.5rem' }}
                onClick={() => setRole('teacher')}
              >
                <div style={{ background: role === 'teacher' ? 'rgba(255,255,255,0.2)' : 'var(--primary-light)', padding: '8px', borderRadius: '8px' }}>
                  <Shield size={24} />
                </div>
                Tôi là Giáo viên
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Họ tên</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Nguyễn Văn A"
                  required
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  className="input-field"
                  placeholder="example@scholar.com"
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Mật khẩu</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••"
                    required
                    style={{ paddingLeft: '2.5rem' }}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Xác nhận</label>
                <div className="input-wrapper">
                  <CheckCircle size={18} className="input-icon" />
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••"
                    required
                    style={{ paddingLeft: '2.5rem' }}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2rem', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text-grey)', lineHeight: '1.5' }}>
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                style={{ marginTop: '3px', accentColor: 'var(--primary)' }}
              />
              <span>Tôi đồng ý với các <Link to="#" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>điều khoản dịch vụ</Link> và <Link to="#" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>chính sách bảo mật</Link> của Assessment Management.</span>
            </label>

            <button type="submit" className="btn btn-primary">
              Đăng ký
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-grey)' }}>
            Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Đăng nhập</Link>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', paddingBottom: '2rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={14} /> BẢO MẬT CAO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={14} /> TIN CẬY
        </div>
      </div>

      <footer className="footer-links" style={{ padding: '2rem 5%', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <div>© 2024 Assessment Management. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Help Center</Link>
        </div>
      </footer>
    </div>
  );
};

export default Register;
