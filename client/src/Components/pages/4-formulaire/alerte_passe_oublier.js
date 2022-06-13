    
    import React        from 'react';
    import { Link }     from 'react-router-dom';
    import './inc.css';

    export default function Alerte_passe_oublier() {
                    
      return (
          <div className='container_parent'>
              <div className='img_log_reg_container_lr_alerte'>
                  <div className='titre_inc_lr'>
                      <span>Mot de passe modifier</span>
                  </div>
                  <div className='bas_inc_lr' >
                      <Link className='nom_link_btn' to='/connnection_'>Login</Link>
                  </div>
              </div>
          </div>
      )
    }
    