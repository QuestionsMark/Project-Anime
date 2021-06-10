import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import GroupIcon from '@material-ui/icons/Group';
import ImageIcon from '@material-ui/icons/Image';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import logo from '../media/img/icon.jpg';

const Nav = ({isUserLogged}) => {

    const [profileLink, setProfileLink] = useState("cos");

    const handleSignIn = () => {
        document.querySelector('.loginScreen').classList.toggle('none');
    }

    return ( 
        <div className="header">
            <Link to="/" className="logo">
                <div className="logo__imgWrapper">
                    <img src={logo} alt="logo" className="img" />
                </div>
                <h3 className="logo__title"><span className="logo__titleColor1">Ani</span><span className="logo__titleColor2">Marktion</span><span className="logo__titleColor3">.pl</span></h3>
            </Link>
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <NavLink to="/" exact className="menu__link"><HomeIcon className="menu__icon"/>Home</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    <li className="menu__item">
                        <NavLink to="/anime-list" className="menu__link"><MovieCreationOutlinedIcon className="menu__icon"/>Anime</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    <li className="menu__item">
                        <NavLink to="/top" className="menu__link"><Icon className="fas fa-trophy menu__icon"/>Top</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    <li className="menu__item">
                        <NavLink to="/users" className="menu__link"><GroupIcon className="menu__icon"/>Users</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    <li className="menu__item">
                        <NavLink to="/galery" className="menu__link"><ImageIcon className="menu__icon"/>Galery</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    {isUserLogged ? <li className="menu__item"><NavLink to={`/profile/${profileLink}`} className="menu__link"><PersonRoundedIcon className="menu__icon"/>Profil</NavLink><div className="menu__border"></div></li> : null}
                </ul>
            </nav>
            <div className="header__login" onClick={handleSignIn}>
                {isUserLogged ? <><Icon className="fas fa-sign-out-alt header__loginIcon" /><span className="header__loginTxt">Wyloguj</span></> : <><Icon className="fas fa-sign-in-alt header__loginIcon" /><span className="header__loginTxt">Zaloguj</span></> }
            </div>
        </div>
     );
}
 
export default Nav;