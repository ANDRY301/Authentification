import React from 'react';
import './footer.css'    ;
import Pfooter    from './pfooter';


export default function Footer({
    id =""
}) {

    console.log(id)
       const Liste_footer = [
        {
            text :'Contact',
            icone_accueil:'fas fa-phone',
            path:`/contact/${id}`,
            clas_box :'container_Pfliste_accueil2'
          
        },
        {
            text :'Procedure',
            icone_accueil:'fas fa-table',
            path:`/procedure/${id}`,
            clas_box :'container_Pfliste_accueil1'
        },
        {
            text :'Note',
            icone_accueil:'far fa-clipboard',
            path:`/note/${id}`,
            clas_box :'container_Pfliste_accueil2'
          
        },
        
        {
            text :'Maintenance',
            icone_accueil:'fas fa-tools',
            path: `/maintenance/${id}`,
            clas_box :'container_Pfliste_accueil2'
        },  

     /*/<FontAwesomeIcon icon="fa-solid fa-square-list"  fas fa-list/>/*/
    ]
    
    const Box_blox_footer =  Liste_footer.map((item, index) => {
        return (
            <Pfooter key={index}
                text           = {item.text}
                path           = {item.path}
                icone_accueil  = {item.icone_accueil}
            />
        )
    })
 
    return (
        <>
            <div className='container_footer'>
                {Box_blox_footer}
            </div>
        </>
    )
}
