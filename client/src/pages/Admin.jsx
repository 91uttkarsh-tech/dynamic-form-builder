import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminForms from './admin/Forms';
import AdminFormEdit from './admin/FormEdit';

export default function Admin() {
  return (
    <div>
      <div className='card'>
        <h2>Admin Dashboard</h2>
        <div className='muted'>Manage forms and view submissions</div>
      </div>

      {/* Navigation */}
      <div className='card'>
        <nav className='flex gap-4'>

          <NavLink
            to="forms"
            className={({ isActive }) =>
              `px-3 py-1 rounded transition-all ${
                isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
              }`
            }
          >
            Forms
          </NavLink>

          <NavLink
            to="forms/new"
            className={({ isActive }) =>
              `px-3 py-1 rounded transition-all ${
                isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
              }`
            }
          >
            New Form
          </NavLink>

        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="forms" element={<AdminForms />} />
        <Route path="forms/new" element={<AdminFormEdit />} />
        <Route path="forms/:id" element={<AdminFormEdit />} />
      </Routes>
    </div>
  );
}
