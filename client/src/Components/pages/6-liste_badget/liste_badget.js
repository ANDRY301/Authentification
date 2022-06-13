import React, { useState ,useEffect} from 'react'
import {  useHistory } from 'react-router-dom';
import Absent_liste   from './absent_liste';
import Liste_employer from './liste_employer'
import Liste_pointage from './liste_pointage';
import Present_liste  from './present_liste';


export default function Liste_badget() {
    let history = useHistory() ;   

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/");
        }
      }, []);


    const [liste_employer,setliste_employer] = useState(true);
    const [absent,setAbsent]                 = useState(false);
    const [present,setPresent]               = useState(false) ;
    const [pointage,setpointage]             = useState(false) ;


const click_liste_employer=()=>{
    setliste_employer(true)
    setAbsent(false)
    setPresent(false)
    setpointage(false)
}

const click_liste_absent=()=>{
    setliste_employer(false)
    setAbsent(true)
    setPresent(false)
    setpointage(false)
}

const click_liste_present=()=>{
    setliste_employer(false)
    setAbsent(false)
    setPresent(true)
    setpointage(false)
}
const click_liste_pointage=()=>{
    setliste_employer(false)
    setAbsent(false)
    setPresent(false)
    setpointage(true)
}

  return (
    <div className='container_liste_de_badget'>
          <div className='container_btn_liste'>
              <div className='btn_liste' onClick={click_liste_employer}>
                  <span >Liste Employer</span>
              </div>
              <div className='btn_liste' onClick={click_liste_absent}>
                  <span >Absent</span>
              </div>
              <div className='btn_liste' onClick={click_liste_present}>
                  <span >Present</span>
              </div>
              <div className='btn_liste' onClick={click_liste_pointage}>
                  <span >Pointage</span>
              </div>
          </div>
          {liste_employer && <Liste_employer/>}
          {absent         && <Absent_liste/>}
          {present        && <Present_liste/>}
          {pointage       && <Liste_pointage/>}
    </div>
  )
}
