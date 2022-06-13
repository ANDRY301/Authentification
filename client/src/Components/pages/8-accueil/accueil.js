import React,{useEffect,useContext}  from 'react';
import './accueil.css';
import { useHistory } from 'react-router';
import  {AuthConte}       from '../../heaauth/autfront'
import { Accuel_Liste }   from './liste_accueil'; 
import Pfliste_accueil    from './pfliste_accueil';

export default function Accueil() {

let history = useHistory() ;
const {id}  = useContext(AuthConte) ;

useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/");
    }
   });
   
    const Box_blox_milieu =  Accuel_Liste.map((item, index) => {
        return (
            <div key={index}>
                <Pfliste_accueil
                    text={item.text}
                    path={item.path}
                    icone_accueil={item.icone_accueil}
                    clas_box={item.clas_box}
                    id={id}
                />
            </div>
   
        )
    })    

    return (
        <>
            <div className="container_accueil_parent" >
                <div className="container_accueil">
                    {Box_blox_milieu}
                </div>
            </div>
        </>
    )

}

