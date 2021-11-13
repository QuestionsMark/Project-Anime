import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/Home';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import GroupIcon from '@material-ui/icons/Group';
import ImageIcon from '@material-ui/icons/Image';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import logo from '../media/img/icon.jpg';

const Nav = ({ history }) => {

    const [status,,,, user] = useUser();

    const handleSignIn = () => {
        document.querySelector('.loginScreen').classList.toggle('none');
    }

    const handleLogOut = () => {
        localStorage.removeItem('animark-user-id')
        localStorage.removeItem('animark-token');
        localStorage.removeItem('animark-link');
        history.push('/');
        window.location.reload();
      }

    return ( 
        <div className="header">
            <Link to="/" className="logo">
                <div className="logo__imgWrapper">
                    <img src={logo} alt="logo" className="img" />
                </div>
                <h3 className="logo__title"><span className="logo__titleColor1">Ani</span><span className="logo__titleColor2">Mark</span><span className="logo__titleColor3">.pl</span></h3>
            </Link>
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <NavLink to="/" exact className="menu__link"><HomeIcon className="menu__icon"/>Home</NavLink>
                        <div className="menu__border"></div>
                    </li>
                    <li className="menu__item">
                        <NavLink to="/anime" className="menu__link"><MovieCreationOutlinedIcon className="menu__icon"/>Anime</NavLink>
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
                    {status ? <li className="menu__item"><NavLink to={`/users/${user.id}`} className="menu__link"><PersonRoundedIcon className="menu__icon"/>Profil</NavLink><div className="menu__border"></div></li> : null}
                </ul>
            </nav>
            {status ? <div className="header__login" onClick={handleLogOut}><Icon className="fas fa-sign-out-alt header__loginIcon" /><span className="header__loginTxt">Wyloguj</span></div> : <div className="header__login" onClick={handleSignIn}><Icon className="fas fa-sign-in-alt header__loginIcon" /><span className="header__loginTxt">Zaloguj</span></div> }
        </div>
     );
}
 
export default withRouter(Nav);