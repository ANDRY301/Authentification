
    import React,{useState,useEffect} from 'react';
    import { useParams }   from 'react-router-dom';
    import'./liste_badget.css';
    import axios          from 'axios';
    import Pliste_present from './pliste_present';
    
    export default function Present_liste() {
        let {id}    = useParams() ;
    
        const [serc,setserc]   = useState("") ;
        const [Liste_badget,setListe_badget]=useState([])
        const [date_arrive,setdate_arrive] = useState([]);

          
    useEffect( ()=>{
        axios.get(`${process.env.REACT_APP_URL_BADGET_LISTE_PRESENT}/${id}`,
        {
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

        axios.get(`http://localhost:3001/badgets/liste_date_present/${id}`,
        {
            headers:{accessToken: localStorage.getItem("accessToken")},
        })
        .then( (response)=>{       
        setdate_arrive(response.data)
        }).catch( (err)=>{
            console.log(err)
        })

    },[])
    
const date_pour_arrive = date_arrive.map( (item,index)=>{
    return(
        <div>
            <div>{item.createdAt}</div>
        </div>
    )
})

        const Liste_badget_present = Liste_badget.filter((item, index) => {
            const Bloc_pliste =
                <div key={index}>
                    <Pliste_present
                        nom={item.nom}
                        prenom={item.prenom}
                        telephone={item.telephone}
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
                    <Pliste_present
                        nom={item.nom}
                        prenom={item.prenom}
                        telephone={item.telephone}
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

                  </div>
                  <div>
                      <div className='nacre_affiche'>
                          {Liste_badget_present}
                      </div>
                  </div>

              </div>
          </>
      )
      ;
    }
    