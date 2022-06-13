import React      from 'react';
import './login_registre.css';
import Inc_logine from '../4-formulaire/inc_logine';
import Bar_nav    from '../bar_nav/bar_nav';

export default function Connection_() {
  return (
    <div className='container_parent_lr'>
      <Bar_nav nom = "Connection" />
      <Inc_logine />
    </div>
  )
}
