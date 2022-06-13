
    
    import React ,{useState} from 'react';
    import './inc.css';
    import axios             from 'axios';
    import { useHistory }    from 'react-router';
    import {useParams}       from "react-router-dom";

    export default function Inc_change_password() {

    let history = useHistory() ;
    const {id ,token} = useParams() ;
 
    const data ={
        password  :'',
        password2  :'',
    }
            const [info,setInfo]              = useState(data) ;
            const [alerterror,setAlerteerror] = useState('') ;
            
        const handlechanchenge=(e)=>{
            setInfo({...info, [e.target.id]:e.target.value })
        }
    
        const Change_password=()=>{
            const {password,password2} = info 
            axios.post(`${process.env.REACT_APP_URL_CHANGE_MOT_DE_PASSE}/${id}/${token}`,{
                password        :password,
                password2       :password2,
            }).then( (response)=>{
                console.log(response.data)
                if(response.data.message){
                    setAlerteerror(response.data.message)

                }else{
                    history.push(`/alerte_passe_oublier`)   
                }
            }).catch ((err)=>{
                console.log(err)
            })
          }
    
        const {password,password2} = info ;
        const Btn_envoyer = password2 ===''|| password === '' ?
            <div className='btn_lr'>
                <span className='btn_text_envoyer_inc'>Envoie</span>
                <span><i className="far fa-paper-plane"></i></span>
            </div>
            :
            <div className='btn_lr' onClick={Change_password} >
                <span className='btn_text_envoyer_inc'>Envoie</span>
                <span><i className="far fa-paper-plane"></i></span>
            </div>
    
      return (
          <div className='container_parent'>
              <div className='img_log_reg_container_lr'>
                  <div className='titre_inc_lr'>
                      <span>Nouveau mot de passe </span>
                  </div>
                   <div>
                   <div className="container_recherche_inc">
                      <input type="password" name="name" autoComplete="off" required className="container_input_inc" placeholder='Nouveau mot de passe' id="password" onChange={handlechanchenge} />
                      <label for="name" className="recherche_name_inc" >
                          <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                      </label>
                  </div>
                  <div className="container_recherche_inc">
                      <input type="password" name="name" autoComplete="off" required className="container_input_inc" placeholder='Confirmation' id="password2" onChange={handlechanchenge} />
                      <label for="name" className="recherche_name_inc" >
                          <span className="recontent-span_inc" ><i className="fas fas fa-user-tie"></i> </span>
                      </label>
                  </div>
                   </div>
                  {Btn_envoyer}
                  <div className='cont_alert'>
                      <span className='alerte'>{alerterror}</span>
                  </div>
              </div>
          </div>
      )
    }
    
