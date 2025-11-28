import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { signup } = useAuth();
  const nav = useNavigate();

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handle = async e => {
    e.preventDefault();
    const msg = validate();
    setErr(msg);
    setTimeout(() => {
      setErr('');
    }, 1000);
    if (msg) return;

    try {
      await signup(email, password);
      nav('/login');
    } catch {
      setErr('Signup failed. Try again.');
      setTimeout(() => {
        setErr('');
      }, 1000);
    }
  };

  return (
    <div className='card'>
      <h3>Sign Up</h3>

      <form onSubmit={handle}>
        {err && <div className="error-box">{err}</div>}

        <div className='form-row'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='form-row'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
