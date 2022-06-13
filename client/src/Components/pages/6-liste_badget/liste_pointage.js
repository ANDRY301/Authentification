

    import React,{useState,useEffect} from 'react';
    import { useParams }   from 'react-router-dom';
    import'./liste_badget.css';
    import axios          from 'axios';
    import Pliste_pointage from './pliste_pointage';
    
    export default function Liste_pointage() { 
        let {id}    = useParams() ;
    
        const [serc,setserc]   = useState("") ;   
        const [Liste_badget,setListe_badget]=useState([])
          
    useEffect( ()=>{
        axios.get(`http://localhost:3001/badgets/liste_date_present/${id}`,{
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
                    <Pliste_pointage
                     date={item.createdAt}
                     numero_badget={item.numero_badget}            
                    />
                </div>
            if (serc === "") {
                return (
                    { Bloc_pliste }
                )
            } else if (item.numero_badget.toLocaleLowerCase().includes(serc.toLocaleLowerCase())) {
                return (
                    { Bloc_pliste }
                )
            }
        }).map((item, index) => {
            return (
                <div key={index}>
                    <Pliste_pointage
                      date={item.createdAt}
                      numero_badget={item.numero_badget}
                    />
                </div>
            )
        })
    
      return (
          <>
             <div className='bloc_recherche_input'>
                  <div className="container_commentaire_input">
                      <input  name="name" autoComplete="off" required type="text" className="commentaire_input" onChange={(e) => { setserc(e.target.value) }} placeholder='Nom' />
                      <label for="name" className="label_input" >
                          <span className="icon_commentaire_input" ><i className="fas fa-search"></i></span>
                      </label>
                  </div>
              </div>
              <div className='container_pointage'>
                  <div className='container_bas_nav_nacre2'>
                      <span className='con_titre1_nacre2'>Numero Badget</span>
                      <span className='con_titre1_nacre2' >date</span>

                  </div>
                  <div className='nacre_affiche'>
                      {Liste_employer_badget}
                  </div>
              </div>
          </>
      )
      ;
    }
    