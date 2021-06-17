import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const ProfileNav = ({match}) => {

    const [isAuthorized, setIsAuthorized] = useState(true);

    return ( 
        <div className="profileNav scrollNav" data-id="3">
            <ul className="profileNav__list">
                <li className="profileNav__item">
                    <NavLink to={`/profile/${match.params.userLink}`} className="profileNav__link" exact>Profil</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="profileNav__item">
                    <NavLink to={`/profile/${match.params.userLink}/user-top`} className="profileNav__link">Top Anime</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="profileNav__item">
                    <NavLink to={`/profile/${match.params.userLink}/achievements`} className="profileNav__link">Osiągnięcia</NavLink>
                    <div className="menu__border"></div>
                </li>
                {isAuthorized ? <li className="profileNav__item">
                    <NavLink to={`/profile/${match.params.userLink}/settings`} className="profileNav__link">Edytuj</NavLink>
                    <div className="menu__border"></div>
                </li> : null}
            </ul>
        </div>
     );
}
 
export default withRouter(ProfileNav);