
import React, { useEffect, useState } from 'react';
import './base.css';
import axios             from 'axios';
import { BrowserRouter as Router, Route, Switch, Link,useHistory} from "react-router-dom"; 
import { Liste_menu, Liste_menu_no_connecte } from './liste_menu';
import { AuthConte }        from '../../heaauth/autfront';

import Logos                from '../2-images/logos_gmao.ico';
import Connection_          from '../3-Utilisateurs/1-connection_';
import Inscription          from '../3-Utilisateurs/2-inscription';
import Inscription_badget   from '../3-Utilisateurs/5-inscription_badget';
import Insertion            from '../3-Utilisateurs/insertion';
import Liste_badget         from '../6-liste_badget/liste_badget';
import Mot_de_passe_oublier from '../3-Utilisateurs/3-mot_de_passe_oublier';
import Changer_mot_de_passe from '../3-Utilisateurs/4-changer_mot_de_passe';
import Accueil_no_connecte  from '../5-accueil_no_connecte/accueil_no_connecte';
import Accueil              from '../8-accueil/accueil';
import Alerte_lien_envoyer  from '../4-formulaire/alerte_lien_envoyer';
import Alerte_passe_oublier from '../4-formulaire/alerte_passe_oublier';
import Erreur_pages         from '../4-formulaire/erreur_pages';
import Footer               from '../footer/footer';



export default function Base() {

  let history = useHistory() ;
  
  const [stateAuth,setstateAuth] = useState({username :"",id:0,status:false}) ;
  const [bar_menu,setbar_menu]   = useState(true) ;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL_AUTH}`, {
      headers: { accessToken: localStorage.getItem("accessToken") }
    })
      .then((response) => {
        if (response.data.error) {
          setstateAuth({ username: '', id: 0, status: false })
        } else {
          setstateAuth({
            username: response.data.username,
            id: response.data.id,
            status: true
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  },[])


  /*/ Function pour afficher le menu petit ecran/*/
  const Func_bar_menu =()=>{
    setbar_menu(!bar_menu)
  }

  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_URL}/auth`,{
        headers:{accessToken:localStorage.getItem("accessToken")}
    })
    .then( (response)=>{
        if(response.data.error){
            setstateAuth({username:'',id:0,status:false})
        }else{
            setstateAuth({
          username:response.data.username,
          id      : response.data.id ,
          status  :true        

      })}
    }).catch( (err)=>{
      console.log(err)
    })
})

const id =  stateAuth.id

  /*/ GRAND ECRAN MENU /*/
  const Menu_bas_grand_ecran = Liste_menu.map( (item,index)=>{
    return(
      <div className='container_menu_nav_grand_ecran' key={index}>
      <Link to={`${item.path}/${id}`} className='link_no_decoration'></Link>
    </div>
    )
  })
  const Menu_bas_grand_ecran_no_connecte = Liste_menu_no_connecte.map( (item,index)=>{
    return(
      <div className='container_menu_nav_grand_ecran' key={index}>
      <Link to={item.path}  className='link_no_decoration'>{item.nom}</Link>
    </div>
    )
  })

/*/ PETIT ECRAN MENU /*/
  const Menu_bas_petit_ecran = Liste_menu.map( (item,index)=>{
    return(
      <div className='container_menu_nav_grand_petite' key={index}>
      <Link to={`${item.path}/${id}`} className='link_no_decoration_2'>{item.nom}</Link>
    </div> 
    )
  })
  const Menu_bas_petit_ecran_no_connecte = Liste_menu_no_connecte.map( (item,index)=>{
    return(
      <div className='container_menu_nav_grand_petite' key={index}>
      <Link to={item.path}  className='link_no_decoration_2'>{item.nom}</Link>
    </div> 
    )
  })
  
  const Menu_bas_petit_ecran_avec_accueil =
    <div>
      <div className='container_menu_nav_grand_petite' >
        <Link to='/' className='link_no_decoration_2'>Accueil</Link>
      </div>
      {Menu_bas_petit_ecran}
    </div>


  /*/ Deconnection /*/
  const LougOut=()=>{   
    localStorage.removeItem("accessToken");
    setstateAuth({...stateAuth,status:false});
    window.location.reload();
    history.push('/connnection_') ;
  
  
}
  /*/ Affichage si je suis connecté ou pas /*/
  const Footer_base                      =  stateAuth.status      ?  <Footer id = {stateAuth.id}/> : <div></div>
  const Route_accueil                    =  stateAuth.status      ?  <Route path ='/' exact component={Accueil} />  :  <Route path='/' exact component={Accueil_no_connecte} /> 
  const icon_logout_logine               =  stateAuth.status      ?  <span><i class="fas fa-sign-out-alt"></i></span>        :   <span><i class="fas fa-sign-out-alt"></i></span>  ;
  const Menu_grand_ecran                 =  stateAuth.status      ?  Menu_bas_grand_ecran : Menu_bas_grand_ecran_no_connecte
  const Menu_petit_ecran                 =  stateAuth.status      ?  Menu_bas_petit_ecran_avec_accueil : Menu_bas_petit_ecran_no_connecte
  const Affichage_nom_accueil            =  stateAuth.status      ?  <span className ='nom_accueil' >accueil</span> : <span></span>
 
  const Nom_logine_logout                =  stateAuth.status      ? 
    <div className='btn_icon_connection' onClick={LougOut}>
      <span className='btn_connection' >logout</span>
      {icon_logout_logine}
    </div>
    :
    <div className='btn_icon_connection'  >
      <Link className='btn_connection' to='/connnection_' >Connection</Link>
      {icon_logout_logine}
    </div>
  /*/  Petit ecran affichage de menu ou pas /*/
  const Affiche_bas_barmenu_petit_ecran  = bar_menu ?  Menu_petit_ecran : <div></div> ;
  return (
    <div>
      <AuthConte.Provider value={{ stateAuth, setstateAuth ,id}}>
        <Router>
          <div className='container_premier'>
            <div className='container_nav_fond'>     
                <div className='container_nav'>
                  <div className='menu_logo8_petit_ecran' >
                    <div className='menu_petit_ecran' onClick={Func_bar_menu}><i className="fas fa-bars"></i></div>
                    <Link to ='/'  className='link_accueil'>
                      {Affichage_nom_accueil}
                      <img
                      src={Logos}
                      alt='logo_petit_ecran'
                      className='logo_petit_ecran'
                    />              
                    </Link>
                  </div>
                  <div className='container_grand_ecran'>
                    {Menu_grand_ecran}
                    {Nom_logine_logout}
                  </div> 
                </div>
                {Affiche_bas_barmenu_petit_ecran}

            <Switch>
              {Route_accueil}
              <Route path='/inscription'                    exact component={Inscription} />
              <Route path='/connnection_'                   exact component={Connection_} />
              <Route path='/mot_de_passe_oublier'           exact component={Mot_de_passe_oublier} />
              <Route path='/change_password/:id/:token'     exact component={Changer_mot_de_passe} />
              <Route path='/alerte_lien_envoyer'            exact component={Alerte_lien_envoyer} />
              <Route path='/alerte_passe_oublier'           exact component={Alerte_passe_oublier} />  
              <Route path='/Inscription_badget/:id'         exact component={Inscription_badget} /> 
              <Route path='/Insertion/:id'                  exact component={Insertion} />    
              <Route path='/liste_badget/:id'               exact component={Liste_badget} />    

              <Route path="*"                               exact component={Erreur_pages}/>
            </Switch>
            </div>
              {Footer_base}
          </div>
        </Router>
      </AuthConte.Provider>
    </div>
  )
}
