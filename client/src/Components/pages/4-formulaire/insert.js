
import React,{useState} from 'react';
import './inc.css';
import axios from 'axios';
import { Link} from "react-router-dom";

export default function Insert() {
  
const data ={
  UserId          :'',
  numero_badget   :'',
}
      const [info,setInfo] = useState(data) ;
      const [alerterror,setAlerteerror] = useState('') ;
          
    const handlechanchenge=(e)=>{
      setInfo({...info, [e.target.id]:e.target.value })
  }

  const Add_numero_badget =()=>{
  const {UserId,numero_badget} = info ;
  axios.post(`${process.env.REACT_APP_URL_BADGET_INSERTION}`,{
    UserId          :UserId,
    numero_badget   :numero_badget ,       
  },
  {
    headers: {
        accessToken: localStorage.getItem("accessToken"),
    },
}).then( (response)=>{
    if(response.data.message){
      setAlerteerror(response.data.message)
    }else{
        setInfo({...data})
   
    }}) 
}

    const {UserId,numero_badget} = info ;
    const Btn_envoyer = UserId === '' || numero_badget === ''?
        <div className='btn_lr' onClick={Add_numero_badget} >
            <span>Envoyer</span>
            <span><i className="far fa-paper-plane"></i></span>
        </div>
        :
        <div className='btn_lr' onClick={Add_numero_badget}>
            <span>Envoyer</span>
            <span><i className="far fa-paper-plane"></i></span>
        </div>

  return (
      <div className='container_parent'>
          <div className='img_log_reg_container_lr'>
              <div className='titre_inc_lr'>
                  <span> Insertion</span>
              </div>
              <div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Nom</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input  name="name" autoComplete="off" required type="text" className="container_input_inc" placeholder='UserId' id="UserId" onChange={handlechanchenge} value={UserId} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>numero_badget</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input name="name" autoComplete="off" type="numero_badget" required className="container_input_inc" placeholder='numero_badget' id="numero_badget" onChange={handlechanchenge} value={numero_badget} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" >    <i className="far fa-envelope-open"> </i> </span>
                          </label>
                      </div>
                  </div>
              
              </div>
              {Btn_envoyer}
              <div className='cont_alert'>
                  <span className='alerte'>{alerterror}</span>
              </div>
              <div className='bas_inc_lr' >
                  <Link className='nom_link_btn' to='/logine'>Connection</Link>
              </div>
          </div>
      </div>
  )
}

