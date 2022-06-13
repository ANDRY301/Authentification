import React from 'react'

export default function Pliste_pointage({
    date          ="",
    numero_badget ="",
   
}) {

   const date_fr = new Date(date).toLocaleDateString("fr") 
  return (
      <div className='container_bas_nav_nacre2'>
          <span className='con_titre1_nacre2'>{numero_badget}</span>
          <span className='con_titre1_nacre2' >{date_fr}</span>
      </div>
   
  )
}


