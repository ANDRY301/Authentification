import React from 'react'

export default function Pliste_present({
    nom   ="",
    prenom ="",
    telephone ="",
}) {

   /*/const Get_date = new Date(date).toLocaleDateString("fr") /*/
  return (
    <div className='container_bas_nav_nacre2'>
    <div className='container_liste1_nacre2'>
        <span className='con_titre1_nacre2_code'>{nom}</span>
        <div className='con_titre1_nacre2_Intitules'>
            <span className='text_intitule' >{prenom}</span>
        </div>
        <span className='con_titre1_nacre2'>{telephone}</span>
     
    </div>
</div>
  )
}


