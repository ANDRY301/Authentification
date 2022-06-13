
    import React ,{useState}from 'react';
    import './inc.css';
    import axios             from 'axios';
    import { Link }          from 'react-router-dom';
    import { useHistory }    from 'react-router';

    
    export default function Inc_password_oublier() {

    let history = useHistory() ;
        
            const [email,setemail]            = useState('') ;
            const [alerterror,setAlerteerror] = useState('') ;
            
        const Send_mail=()=>{   
            axios.post(`${process.env.REACT_APP_URL_MOT_DE_PASSE_OUBLIE}`,{
                  email        :email,
            }).then( (response)=>{

                console.log(response.data)
                  if(response.data.message ){
                      setAlerteerror(response.data.message)
                  }else{
                    setAlerteerror(response.data)                    
                    history.push(`/alerte_lien_envoyer`)  
                  }
            })  
          }
   
        const Btn_envoyer = email === '' ?
            <div className='btn_lr'>
                <span className='btn_text_envoyer_inc'>Envoyer</span>
                <span><i className="far fa-paper-plane"></i></span>
            </div>
            :
            <div className='btn_lr' onClick={Send_mail} >
                <span className='btn_text_envoyer_inc'>Envoyer</span>
                <span><i className="far fa-paper-plane"></i></span>
            </div>
    
      return (
        <div className='container_parent'>
              <div className='img_log_reg_container_lr'>
              <div className='titre_inc_lr'>
                  <span> mot de passe oublié</span>
              </div>
              <div>
                  <div className='box_nom_et_input'>
                      <div className='nom_input_lr'>
                          <span>Email</span>
                      </div>
                      <div className="container_recherche_inc">
                          <input  onChange={(e)=>{setemail(e.target.value)}}  type="email" name="name" autoComplete="off" required className="container_input_inc" placeholder='Email'  />
                          <label for="name" className="recherche_name_inc" >
                              <span className="recontent-span_inc" > <i className="far fa-envelope-open"> </i> </span>
                          </label>
                      </div>
                  </div>
              </div>
              {Btn_envoyer}
              <div className='cont_alert'>
                  <span className='alerte'>{alerterror}</span>
              </div>
    
              <div className='bas_inc_lr' >
                  <Link className='nom_link_btn' to='/inscription'>Inscription</Link>
              </div>
          </div>
        </div>
      )
    }
    