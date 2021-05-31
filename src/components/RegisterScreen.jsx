import React from 'react';
import { Link } from 'react-router-dom';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const RegisterScreen = () => {

    const handleQuit = (e) => {
        if (e.target.className === 'loginScreen__curtain') {
            e.target.parentElement.classList.toggle('none')
        }
    }

    return ( 
        <div className="loginScreen registerScreen none" onClick={handleQuit}>
            <div className="loginScreen__curtain">
                <div className="loginScreen__panel">
                    <h2 className="loginScreen__title">Rejestracja</h2>
                    <form className="loginScreen__form">
                        <input type="text" className="loginScreen__input" placeholder="login"/>
                        <input type="text" className="loginScreen__input" placeholder="hasło"/>
                        <input type="text" className="loginScreen__input" placeholder="e-mail"/>
                        <FormControlLabel control={<Checkbox />} label="Oświadczam, że zapoznałem się z regulaminem platformy i zobowiązuję się do jego przestrzegania."/>
                        <input type="submit" className="loginScreen__submit" value="Zarejestruj"/>
                    </form>
                    <div className="loginScreen__help">
                        <Link to="/rules" target="_blank" className="loginScreen__link link">regulamin</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RegisterScreen;