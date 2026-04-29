import React, { useState } from 'react';
import { getStorage, setStorage } from '../context/AppContext';

export default function LoginPage() {
  const [tab, setTab] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regErrors, setRegErrors] = useState({});
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  const [modal, setModal] = useState({ open: false, title: '', msg: '' });

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

    if (!user) {
      setLoginErrors({ email: 'Invalid email or password.' });
      return;
    }

    setStorage('cw_loggedIn', user);
    setModal({ open: true, title: `Welcome back, ${user.name}! 👋`, msg: 'You have logged in successfully. (Demo only)' });

    setLoginEmail('');
    setLoginPassword('');
  };

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

    users.push({
      name: regName.trim(),
      email: regEmail,
      password: regPassword,
      createdAt: new Date().toISOString()
    });

    setStorage('cw_users', users);

    setModal({
      open: true,
      title: 'Account Created! 🎉',
      msg: `Welcome to CleanWave, ${regName.trim()}! (Demo only)`
    });

    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegConfirm('');
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

          {/* Login */}
          <div className={`auth-form${tab === 'login' ? ' active' : ''}`}>
            <h3>Welcome Back</h3>

            <form onSubmit={handleLogin}>
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email" />
              <input type={showLoginPwd ? 'text' : 'password'} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Password" />

              <button type="submit">Login</button>
            </form>

            <p>
              Don't have an account?{' '}
              <button type="button" onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                Register here
              </button>
            </p>
          </div>

          {/* Register */}
          <div className={`auth-form${tab === 'register' ? ' active' : ''}`}>
            <h3>Create Account</h3>

            <form onSubmit={handleRegister}>
              <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="Full Name" />
              <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email" />
              <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Password" />
              <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} placeholder="Confirm Password" />

              <button type="submit">Create Account</button>
            </form>

            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                Login here
              </button>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}