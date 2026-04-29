import React, { useState } from 'react';
import { getStorage, setStorage } from '../context/AppContext';

export default function LoginPage() {
  const [tab, setTab] = useState('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regErrors, setRegErrors] = useState({});
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  // Modal state
  const [modal, setModal] = useState({ open: false, title: '', msg: '' });

  // ── Login ────────────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail))
      errs.email = 'Please enter a valid email.';
    if (!loginPassword || loginPassword.length < 6)
      errs.password = 'Password must be at least 6 characters.';
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    const users = getStorage('cw_users');
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (!user) { setLoginErrors({ email: 'Invalid email or password.' }); return; }

    setStorage('cw_loggedIn', user);
    setModal({ open: true, title: `Welcome back, ${user.name}! 👋`, msg: 'You have logged in successfully. (Demo only)' });
    setLoginEmail(''); setLoginPassword('');
  };

  // ── Register ─────────────────────────────────────────────────────────────────
  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!regName || regName.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!regEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errs.email = 'Please enter a valid email address.';
    if (!regPassword || regPassword.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (regPassword !== regConfirm) errs.confirm = 'Passwords do not match.';
    setRegErrors(errs);
    if (Object.keys(errs).length) return;

    const users = getStorage('cw_users');
    if (users.find(u => u.email === regEmail)) {
      setRegErrors({ email: 'This email is already registered.' });
      return;
    }

    users.push({ name: regName.trim(), email: regEmail, password: regPassword, createdAt: new Date().toISOString() });
    setStorage('cw_users', users);
    setModal({ open: true, title: 'Account Created! 🎉', msg: `Welcome to CleanWave, ${regName.trim()}! Your account has been created. (Demo only)` });
    setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirm('');
    setTab('login');
  };

  return (
    <section className="page active" id="login">
      <div className="section-container narrow">
        <div className="auth-container">
          <div className="auth-tabs">
            <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>Login</button>
            <button className={`auth-tab${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')}>Register</button>
          </div>

          {/* Login Form */}
          <div className={`auth-form${tab === 'login' ? ' active' : ''}`}>
            <div className="auth-icon"><i className="fas fa-lock"></i></div>
            <h3>Welcome Back</h3>
            <p>Log in to manage your orders</p>
            <form noValidate onSubmit={handleLogin}>
              <div className="form-group">
                <label><i className="fas fa-envelope"></i> Email</label>
                <input type="email" value={loginEmail} onChange={e => { setLoginEmail(e.target.value); setLoginErrors({}); }}
                  placeholder="your@email.com" className={loginErrors.email ? 'error' : ''} />
                <span className="error-msg">{loginErrors.email}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-lock"></i> Password</label>
                <div className="password-wrap">
                  <input type={showLoginPwd ? 'text' : 'password'} value={loginPassword}
                    onChange={e => { setLoginPassword(e.target.value); setLoginErrors({}); }}
                    placeholder="Your password" className={loginErrors.password ? 'error' : ''} />
                  <button type="button" className="toggle-pwd" onClick={() => setShowLoginPwd(v => !v)}>
                    <i className={`fas ${showLoginPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                <span className="error-msg">{loginErrors.password}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
            </form>
            <p className="auth-switch">Don't have an account? <a onClick={() => setTab('register')}>Register here</a></p>
          </div>

          {/* Register Form */}
          <div className={`auth-form${tab === 'register' ? ' active' : ''}`}>
            <div className="auth-icon"><i className="fas fa-user-plus"></i></div>
            <h3>Create Account</h3>
            <p>Join thousands of happy customers</p>
            <form noValidate onSubmit={handleRegister}>
              <div className="form-group">
                <label><i className="fas fa-user"></i> Full Name</label>
                <input type="text" value={regName} onChange={e => { setRegName(e.target.value); setRegErrors({}); }}
                  placeholder="Your full name" className={regErrors.name ? 'error' : ''} />
                <span className="error-msg">{regErrors.name}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-envelope"></i> Email</label>
                <input type="email" value={regEmail} onChange={e => { setRegEmail(e.target.value); setRegErrors({}); }}
                  placeholder="your@email.com" className={regErrors.email ? 'error' : ''} />
                <span className="error-msg">{regErrors.email}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-lock"></i> Password</label>
                <div className="password-wrap">
                  <input type={showRegPwd ? 'text' : 'password'} value={regPassword}
                    onChange={e => { setRegPassword(e.target.value); setRegErrors({}); }}
                    placeholder="Min. 6 characters" className={regErrors.password ? 'error' : ''} />
                  <button type="button" className="toggle-pwd" onClick={() => setShowRegPwd(v => !v)}>
                    <i className={`fas ${showRegPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                <span className="error-msg">{regErrors.password}</span>
              </div>
              <div className="form-group">
                <label><i className="fas fa-lock"></i> Confirm Password</label>
                <div className="password-wrap">
                  <input type={showRegConfirm ? 'text' : 'password'} value={regConfirm}
                    onChange={e => { setRegConfirm(e.target.value); setRegErrors({}); }}
                    placeholder="Repeat password" className={regErrors.confirm ? 'error' : ''} />
                  <button type="button" className="toggle-pwd" onClick={() => setShowRegConfirm(v => !v)}>
                    <i className={`fas ${showRegConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                <span className="error-msg">{regErrors.confirm}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-user-plus"></i> Create Account
              </button>
            </form>
            <p className="auth-switch">Already have an account? <a onClick={() => setTab('login')}>Login here</a></p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {modal.open && (
        <div className="modal-overlay active">
          <div className="modal">
            <div className="modal-icon success"><i className="fas fa-check-circle"></i></div>
            <h3>{modal.title}</h3>
            <p>{modal.msg}</p>
            <button className="btn btn-primary" onClick={() => setModal({ open: false, title: '', msg: '' })}>Continue</button>
          </div>
        </div>
      )}
    </section>
  );
}
