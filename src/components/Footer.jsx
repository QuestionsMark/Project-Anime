import React from 'react';
import { Link } from 'react-router-dom';

import CopyrightIcon from '@material-ui/icons/Copyright';
import FacebookIcon from '@material-ui/icons/Facebook';

const Footer = () => {
    return ( 
        <footer className="footer">
            <div className="footer__info">
                <div className="footer__socials">
                    <h2 className="footer__title">Social Media</h2>
                    <div className="footer__linksWrapper">
                        <a href="https://www.facebook.com/profile.php?id=100002385831117" target="_blank" rel="noreferrer" className="footer__link">Facebook <FacebookIcon className="footer__linkIcon"/></a>
                        <a href="https://www.facebook.com/profile.php?id=100002385831117" target="_blank" rel="noreferrer" className="footer__link">Facebook <FacebookIcon className="footer__linkIcon"/></a>
                    </div>
                </div>
                <div className="footer__links">
                    <h2 className="footer__title">Linki</h2>
                    <div className="footer__linksWrapper">
                        <Link to="/" className="footer__smallLink link">strona główna</Link>
                        <Link to="/anime-list" className="footer__smallLink link">lista anime</Link>
                        <Link to="/top" className="footer__smallLink link">ranking anime</Link>
                        <Link to="/users" className="footer__smallLink link">użytkownicy</Link>
                        <Link to="/types" className="footer__smallLink link">gatunki</Link>
                        <Link to="/galery" className="footer__smallLink link">galeria</Link>
                        <Link to="/rules" className="footer__smallLink link">regulamin</Link>
                        <Link to="/source" className="footer__smallLink link">źródła</Link>
                        <Link to="/help" className="footer__smallLink link">pomoc</Link>
                    </div>
                </div>
                <div className="footer__additions">
                    <h2 className="footer__title">Dodadki/Nowinki</h2>
                    <div className="footer__linksWrapper">
                        <Link to="/my-projects" className="footer__smallLink link">inne projekty</Link>
                        <Link to="/project-ideas" className="footer__smallLink link">pomysły projektów</Link>
                    </div>
                </div>
            </div>
            <div className="footer__licence">
                <p className="footer__text">Wszelkie prawa absolutnie nie są zastrzeżone! <CopyrightIcon className="footer__copyIcon"/> KEKW</p>
            </div>
        </footer>
     );
}
 
export default Footer;