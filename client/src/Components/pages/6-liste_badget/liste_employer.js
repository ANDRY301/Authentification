    import React,{useState,useEffect} from 'react';
    import { useHistory, useParams }   from 'react-router-dom';
    import'./liste_badget.css';

    import Pfliste_badget from './pfliste_badget';
    import axios          from 'axios';
    
    export default function Liste_employer() { 
        let {id}    = useParams() ;
    
        const [serc,setserc]   = useState("") ;   
        const [Liste_badget,setListe_badget]=useState([])
          
    useEffect( ()=>{
        axios.get(`${process.env.REACT_APP_URL_BADGET_LISTE_EMPLOYER}/${id}`,{
            headers:{accessToken: localStorage.getItem("accessToken")},
        })
        .then( (response)=>{
            if (response.data.meessage) {
                console.log(response.data.meessage)
            } else {
                setListe_badget(response.data)
            }
        }).catch( (err)=>{
            console.log(err)
        })
    },[])
    
        const Liste_employer_badget = Liste_badget.filter((item, index) => {
            const Bloc_pliste =
                <div key={index}>
                    <Pfliste_badget
                        nom={item.nom}
                        prenom={item.prenom}
                        telephone={item.telephone}
                        cont_id={item.id}
                    />
                </div>
            if (serc === "") {
                return (
                    { Bloc_pliste }
                )
            } else if (item.nom.toLocaleLowerCase().includes(serc.toLocaleLowerCase())) {
                return (
                    { Bloc_pliste }
                )
            }
        }).map((item, index) => {
            return (
                <div key={index}>
                    <Pfliste_badget
                        nom={item.nom}
                        prenom={item.prenom}
                        telephone={item.telephone}
                        cont_id={item.id}

                    />
                </div>
            )
        })
    
      return (
          <>
              <div className='bloc_recherche_input'>
                  <div className="container_commentaire_input">
                      <input name="name" autoComplete="off" required type="text" className="commentaire_input" onChange={(e) => { setserc(e.target.value) }} placeholder='Nom'/>
                      <label for="name" className="label_input" >
                          <span className="icon_commentaire_input" ><i className="fas fa-search"></i></span>
                      </label>
                  </div>
              </div>
              <div className='container_bas_nav_nacre'>
                  <div className='container_liste1_nacre'>
                      <span className='con_titre1_nacre_code'>Nom</span>
                      <span className='con_titre1_nacre_Intitules'>Prenom</span>
                      <span className='con_titre1_nacre'>Telephone</span>
                      <span className='con_titre1_nacre_code'>N</span>
                  </div>
                  <div className='nacre_affiche'>
                      {Liste_employer_badget}
                  </div>
              </div>
          </>
      )
      ;
    }
    