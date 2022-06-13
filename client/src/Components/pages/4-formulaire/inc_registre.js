import React ,{useState}from 'react';
import './inc.css';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

export default function Inc_registre() {

let history = useHistory() ;
  
const data ={
  username  :'',
  email     :'',
  password  :'' 
}
      const [info,setInfo] = useState(data) ;
      const [alerterror,setAlerteerror] = useState('') ;
          
    const handlechanchenge=(e)=>{
      setInfo({...info, [e.target.id]:e.target.value })
  }

    const Inscription = () => {
        const { username, email, password } = info;
        axios.post(`${process.env.REACT_APP_URL_INSCRIPTION}`, {
            username: username,
            email   : email,
            password: password

        }).then((response) => {
            console.log(response.data)
            if (response.data.message) {
                setAlerteerror(response.data.message)
            } else {
                setInfo({ ...data })
                history.push('/connnection_')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const {username,password,email} = info ;
    const Btn_envoyer = username === '' || password === '' || email === '' ?
        <div className='btn_lr'>
            <span>Envoyer</span>
            <span><i className="far fa-paper-plane"></i></span>
        </div>
        :
        <div className='btn_lr' onClick={Inscription}>
            <span>Envoyer</span>
            <span><i className="far fa-paper-plane"></i></span>
        </div>

  return (
      <div className='container_parent'>
          <div className='img_log_reg_container_lr'>
              <div className='titre_inc_lr'>
                  <span> Inscription</span>
              </div>
              <div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Nom</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input  name="name" autoComplete="off" required type="text" className="container_input_inc" placeholder='Nom' id="username" onChange={handlechanchenge} value={username} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Mot de passe</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input name="name" autoComplete="off" type="password" required className="container_input_inc" placeholder='Mot de passe' id="password" onChange={handlechanchenge} value={password} />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" > <i className="fas fa-lock"></i> </span>
                          </label>
                      </div>
                  </div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Email</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input name="name" autoComplete="off" type="email" required className="container_input_inc" placeholder='Email' id="email" onChange={handlechanchenge} value={email} />
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
                  <Link className='nom_link_btn' to='/connnection_'>Connection</Link>
              </div>
          </div>
      </div>
  )
}
