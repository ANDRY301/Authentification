

import React      from 'react';
import Bar_nav from '../bar_nav/bar_nav';
import './login_registre.css';
import Inc_change_password from '../4-formulaire/inc_change_password';

export default function Changer_mot_de_passe() {
  return (
    <div className='container_parent_lr'>
      <Bar_nav nom = "NOUVEAU MPD" />
      <Inc_change_password />
    </div>
  )
}
