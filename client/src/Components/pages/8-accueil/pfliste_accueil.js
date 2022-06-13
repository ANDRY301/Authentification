

import React  from 'react' ;
import  './accueil.css' ;
import {Link} from 'react-router-dom' ;


export default function Pfliste_accueil({
    text ='',
    path ='',
    icone_accueil='',
    clas_box ='',
    id        =''
    
}) {

    return (
        <>
            <Link to={`${path}/${id}`} className={clas_box} >
                <div className='titre_bloc'>
                    <span >{text}</span>
                </div>
                <div >
                    <span><i className={icone_accueil}></i></span>
                </div>
            </Link>
        </>
    )
}


