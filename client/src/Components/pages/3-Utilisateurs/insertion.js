

import React   from 'react';
import './login_registre.css';
import Insert from '../4-formulaire/insert';
import Bar_nav from '../bar_nav/bar_nav';

export default function Insertion() {
  return (
    <div className='container_parent_lr'>
      <Bar_nav nom="Insertion" />
      <Insert />
    </div>
  )
}

