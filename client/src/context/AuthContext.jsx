import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dfb_user')) || null;
    } catch {
      return null;
    }
  });

  // Restore token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('dfb_token');

    if (!token) {
      logout(); 
      return;
    }

    api.setToken(token);

    // If user missing but token exists → fetch the logged-in user
    if (!user) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data.user);
        })
        .catch(() => {
          logout(); // Token invalid
        });
    }
  }, []);

  // Save/remove user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('dfb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dfb_user');
    }
  }, [user]);

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    api.setToken(res.data.token);
    localStorage.setItem('dfb_token', res.data.token);
    return res;
  };

  // SIGNUP
  const signup = async (email, password) => {
    return await api.post('/auth/signup', { email, password });
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    api.setToken(null);
    localStorage.removeItem('dfb_token');
    localStorage.removeItem('dfb_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
