import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function AdminForms() {
  const [forms, setForms] = useState(null);

  useEffect(() => {
    api.get('/admin/forms')
      .then(r => setForms(r.data))
      .catch(() => setForms([]));
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this form?");
    if (!ok) return;

    try {
      await api.delete(`/admin/forms/${id}`);
      setForms(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      alert("Failed to delete form");
    }
  };

  if (forms === null) return <div className='card small'>Loading...</div>;

  return (
    <div className='list'>
      {forms.length ? forms.map(f => (
        <div key={f._id} className='list-item'>
          
          <div>
            <strong>{f.title}</strong>
            <div className='small'>v{f.version}</div>
          </div>

          <div className='flex' style={{ gap: '10px' }}>

            <Link to={f._id}>
              <button 
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <FaEdit size={20} color="blue" />
              </button>
            </Link>

            <button
              onClick={() => handleDelete(f._id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <FaTrash size={18} color="red" />
            </button>

          </div>

        </div>
      )) : <>No Forms Available !</>}
    </div>
  );
}
