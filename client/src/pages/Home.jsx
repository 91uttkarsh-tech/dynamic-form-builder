import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
export default function Home(){
  const [forms, setForms] = useState(null);
  useEffect(()=>{ api.get('/public/forms').then(r=>setForms(r.data)).catch(()=>setForms([])); },[]);
  if(forms===null) return <Loading/>;
  return (
    <div>
      <div className='card'><h2>Available Forms</h2><p className='muted'>Click a form to fill and submit</p></div>
      <div className='list'>
        {forms.length?forms.map(f=>(
          <div key={f._id} className='list-item'>
            <div>
              <div><strong>{f.title}</strong></div>
              <div className='small'>{f.description}</div>
            </div>
            <div><Link to={'/forms/'+f._id}><button>Open</button></Link></div>
          </div>
        )): <div className='card muted'>No forms published yet.</div>}
      </div>
    </div>
  );
}
