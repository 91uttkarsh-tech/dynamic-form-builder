import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Admin from './pages/Admin';
import FormPage from './pages/FormPage';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, logout } = useAuth();
  return (
    <div className='app'>
      <header className='header'>
        <div className='brand'>
          <Link to='/'>Dynamic Form Builder</Link>
          </div>
        <nav>
          <Link to='/'>Forms</Link>
          {user ? <Link to='/admin/forms'>Admin</Link> : null}
          {user ? <button className='link-like' onClick={logout}>Logout</button> : <><Link to='/login'>Login</Link><Link to='/signup'>Sign up</Link></>}
          {user ? <Link to='#'> {user?.email}</Link> : null}
        </nav>
      </header>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/forms/:id' element={<FormPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/*' element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
