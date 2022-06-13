import React from 'react';
import axios from 'axios';

export default function fliste_badget({
    nom       ="",
    prenom    ="",
    telephone ="",
    cont_id   = ""

}) {

    const Delete_liste = (de_id) => {
        axios
            .delete(`${process.env.REACT_APP_URL_BADGET_LISTE_DELETE_LISTE}/${de_id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.meessage) {
                    console.log(response.data.meessage)
                } else {
                    console.log(response.data)
                    window.location.reload();
                }

            }).catch((err) => {
                console.log(err)
            });
    };
     /*/
    const Get_date = new Date(date).toLocaleDateString("fr") ;
    /*/
  return (
      <div className='container_bas_nav_nacre2'>
          <div className='container_liste1_nacre2'>
              <span className='con_titre1_nacre2_code'>{nom}</span>
              <div className='con_titre1_nacre2_Intitules'>
                  <span className='text_intitule' >{prenom}</span>
              </div>
              <span className='con_titre1_nacre2'>{telephone}</span>
              <div className='con_titre1_nacre2_code' onClick={() => Delete_liste(cont_id)}>
                  <i className="fas fa-trash"></i>
              </div>
          </div>
      </div>
  
  )
}
