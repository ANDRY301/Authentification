import React        from 'react'
import Inc_registre from '../4-formulaire/inc_registre';
import Bar_nav      from '../bar_nav/bar_nav';
import './login_registre.css';

export default function Inscription() {
  return (
    <div className='container_parent_lr'>
      <Bar_nav nom="Inscription" />
      <Inc_registre />
    </div>
  )
}
