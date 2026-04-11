import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, Shield, Info, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Confirm password does not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.register({
        username: formData.username,
        fullName: formData.fullName,
        password: formData.password,
        role: role.toUpperCase()
      });
      console.log('Registration success:', response);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      // Handle Spring validation errors
      const errorMessage = err?.errors 
        ? Object.values(err.errors).join(', ') 
        : (err?.message || 'Registration failed. Please try again.');
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Navigation Header */}
      <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 96, 112, 0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>Assessment Management</h2>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Explore</Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Docs</Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>Contact</Link>
        </nav>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="card" style={{ maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Create New Account</h1>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.925rem' }}>Start your peaceful learning journey with us.</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <p className="input-label" style={{ marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em' }}>WHO ARE YOU?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className={`btn ${role === 'student' ? 'btn-primary' : 'btn-social'}`}
                style={{ flex: 1, height: '100px', flexDirection: 'column', gap: '0.5rem' }}
                onClick={() => setRole('student')}
              >
                <div style={{ background: role === 'student' ? 'rgba(255,255,255,0.2)' : 'var(--primary-light)', padding: '8px', borderRadius: '8px' }}>
                  <User size={24} />
                </div>
                I am a Student
              </button>
              <button
                className={`btn ${role === 'teacher' ? 'btn-primary' : 'btn-social'}`}
                style={{ flex: 1, height: '100px', flexDirection: 'column', gap: '0.5rem' }}
                onClick={() => setRole('teacher')}
              >
                <div style={{ background: role === 'teacher' ? 'rgba(255,255,255,0.2)' : 'var(--primary-light)', padding: '8px', borderRadius: '8px' }}>
                  <Shield size={24} />
                </div>
                I am a Teacher
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Username</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="john_doe"
                  required
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Password</label>
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
                <p style={{ fontSize: '0.7rem', color: 'var(--text-grey)', marginTop: '0.25rem' }}>* Min 8 chars, uppercase, lowercase & number.</p>
              </div>
              <div className="input-group">
                <label className="input-label">Confirm</label>
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
              <span>I agree to the <Link to="#" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>Privacy Policy</Link> of Assessment Management.</span>
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Register</>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-grey)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', paddingBottom: '2rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={14} /> HIGH SECURITY
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={14} /> TRUSTED
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
