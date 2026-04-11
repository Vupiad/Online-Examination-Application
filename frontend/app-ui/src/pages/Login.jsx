import React, { useState } from 'react';
import { BookOpen, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="login-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
            <BookOpen size={24} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>Assessment Management</h1>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.925rem' }}>Chào mừng trở lại</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email hoặc Tên đăng nhập</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Mật khẩu</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-grey)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              Ghi nhớ đăng nhập
            </label>
            <Link to="/forgot-password" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="btn btn-primary">
            Đăng nhập <ArrowRight size={18} />
          </button>
        </form>

        <div className="divider">Hoặc đăng nhập với</div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-social">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '18px', marginRight: '8px' }} />
            Google
          </button>
          <button className="btn btn-social">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" style={{ width: '18px', marginRight: '8px' }} />
            Facebook
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-grey)' }}>
          Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Đăng ký ngay</Link>
        </p>
      </div>

      <p style={{ maxWidth: '600px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8125rem', marginTop: '1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
        "Sự tĩnh lặng không phải là sự vắng mặt của âm thanh, mà là sự hiện diện của sự chú tâm."
      </p>

      <footer className="footer-links" style={{ width: '100%', maxWidth: '1100px', padding: '2rem 1rem' }}>
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

export default Login;
