import React    from 'react';
import { Link } from 'react-router-dom';

export default function Pfooter({
    icone_accueil = '',
    text          = '',
    path          = ''
}) {
    
    return (
        <Link className='containericon_footer' to={path}>
            <span><i className={icone_accueil}></i></span>
            <span className='nom-footer'>{text}</span>
        </Link>
    )
}
    