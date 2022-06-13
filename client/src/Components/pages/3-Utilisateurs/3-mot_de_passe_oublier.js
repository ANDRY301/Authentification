import React      from 'react';
import './login_registre.css';
import Bar_nav   from '../bar_nav/bar_nav';

import Inc_password_oublier from '../4-formulaire/Inc_password_oublier';

export default function Mot_de_passe_oublier() {
  return (
    <div className='container_parent_lr'>
      <Bar_nav nom="MDP oublié" />
      <Inc_password_oublier />
    </div>
  )
}
