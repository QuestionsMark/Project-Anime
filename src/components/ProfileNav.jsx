import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

const ProfileNav = ({match}) => {

    const { status } = useUser();

    const [isAuthorized, setIsAuthorized] = useState(false);

    const checkAuthorization = useCallback(() => {
        if (status && match.params.id === JSON.parse(localStorage.getItem('animark-user-id'))) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [match, status]);
    
    useEffect(() => {
        checkAuthorization();
    },[checkAuthorization, match])

    return ( 
        <div className="profileNav scrollNav" data-id="3">
            <ul className="profileNav__list">
                <li className="profileNav__item">
                    <NavLink to={`/users/${match.params.id}`} className="profileNav__link" exact>Profil</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="profileNav__item">
                    <NavLink to={`/users/${match.params.id}/user-top`} className="profileNav__link">Top Anime</NavLink>
                    <div className="menu__border"></div>
                </li>
                <li className="profileNav__item">
                    <NavLink to={`/users/${match.params.id}/achievements`} className="profileNav__link">Osiągnięcia</NavLink>
                    <div className="menu__border"></div>
                </li>
                {isAuthorized ? <li className="profileNav__item">
                    <NavLink to={`/users/${match.params.id}/settings`} className="profileNav__link">Edytuj</NavLink>
                    <div className="menu__border"></div>
                </li> : null}
                {isAuthorized ? <li className="profileNav__item">
                    <NavLink to={`/users/${match.params.id}/private`} className="profileNav__link">Ustawienia Prywatności</NavLink>
                    <div className="menu__border"></div>
                </li> : null}
            </ul>
        </div>
     );
}
 
export default withRouter(ProfileNav);