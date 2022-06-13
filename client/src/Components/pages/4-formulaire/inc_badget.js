
import React,{useState} from 'react';
import './inc.css';
import axios         from 'axios';
import { Link }      from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Inc_badget() {

let {id} = useParams() ;
  
const data ={
  nom            :'',
  prenom         :'',
  telephone      :'',
  numero_badget  :'' 
}
      const [info,setInfo] = useState(data) ;
      const [confirmation,setAlerteerror] = useState('') ;

          
    const handlechanchenge=(e)=>{
      setInfo({...info, [e.target.id]:e.target.value })
  }

  const Add_numero_badget =()=>{
  const {nom,prenom,numero_badget,telephone} = info ;
  axios.post(`${process.env.REACT_APP_URL_BADGET_INC}/${id}`,{
        nom             :nom,
        prenom          :prenom ,
        telephone       :telephone,
        numero_badget   :numero_badget,
  },
  {
    headers: {
        accessToken: localStorage.getItem("accessToken"),
    },
}
  
  ).then( (response)=>{
    setAlerteerror(response.data)
    setInfo({...data})
    if(response.data.message){
      setAlerteerror(response.data.message)
    }}).catch ( (err)=>{
        console.log(err)
    })
}

    const {nom,numero_badget,prenom,telephone} = info ;
    const Btn_envoyer = nom === '' || numero_badget === '' || prenom === '' || telephone === ''?
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
                  <span> Badget</span>
              </div>
              <div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Nom</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input  name="name" autoComplete="off" required type="text" className="container_input_inc" placeholder='Nom' id="nom" onChange={handlechanchenge} value={nom} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>prenom</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input name="name" autoComplete="off" type="prenom" required className="container_input_inc" placeholder='prenom' id="prenom" onChange={handlechanchenge} value={prenom} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" >    <i className="far fa-envelope-open"> </i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Telephone</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input  name="name" autoComplete="off" required type="text" className="container_input_inc" placeholder='Telephone' id="telephone" onChange={handlechanchenge} value={telephone} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Numero badget</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input name="name" autoComplete="off" type="numero_badget" required className="container_input_inc" placeholder='Mot de passe' id="numero_badget" onChange={handlechanchenge} value={numero_badget} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" > <i className="fas fa-lock"></i> </span>
                          </label>
                      </div>
                  </div>
              
              </div>
              {Btn_envoyer}
              <div className='cont_alert'>
                  <span >{confirmation}</span>
              </div>
              <div className='bas_inc_lr' >
                  <Link className='nom_link_btn' to='/logine'>Connection</Link>
              </div>
          </div>
      </div>
  )
}
