import React from 'react';
import './bar_nav.css';
import img_bar from '../2-images/img_bar.png'

export default function Bar_nav({
    nom = ""
}) {
  return (
      <div className='bar_titre'>
          <span className='nom_bar'>{nom}</span>
          <img
              src={img_bar}
              className='img_bar'
              alt='logos'
          />
      </div>
  )
}
