import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

const RegisterScreen = ({handleSignIn}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const handleInputChange = (type, e) => {
        if (type === "login") {
            setLogin(e.target.value);
        } else if (type === "password") {
            setPassword(e.target.value);
        } else if (type === "email") {
            setEmail(e.target.value);
        } else if (type === "nick") {
            setNick(e.target.value);
        }
    }

    const [rulesAccept, setRulesAccept] = useState(false);
    const handleRulesAcceptChange = () => {
        setRulesAccept((prev) => !prev);
    }

    const [registerResponse, setRegisterResponse] = useState('');
    const [responseColor, setResponseColor] = useState('green');
    const [validationErrorsList, setValidationErrorsList] = useState([]);

    const handleQuit = (e) => {
        let target = e;
        if (target.className === 'loginScreen__curtain') {
            target.parentElement.classList.toggle('none')
        }
    }

    const handleUserRegister = (e) => {
        let target = e.target;
        const validationErrors = [];
        if (login.indexOf(' ') !== -1 || login.indexOf('!') !== -1 || login.indexOf('@') !== -1 || login.indexOf('#') !== -1 || login.indexOf('$') !== -1 || login.indexOf('%') !== -1 || login.indexOf('^') !== -1 || login.indexOf('&') !== -1 || login.indexOf('*') !== -1 || login.indexOf('(') !== -1 || login.indexOf(')') !== -1 || login.indexOf('-') !== -1 || login.indexOf('_') !== -1 || login.indexOf('=') !== -1 || login.indexOf('+') !== -1 || login.indexOf('`') !== -1 || login.indexOf('~') !== -1 || login.indexOf('[') !== -1 || login.indexOf(']') !== -1 || login.indexOf('{') !== -1 || login.indexOf('}') !== -1 || login.indexOf(';') !== -1 || login.indexOf(':') !== -1 || login.indexOf("'") !== -1 || login.indexOf('"') !== -1 || login.indexOf('\\') !== -1 || login.indexOf('|') !== -1 || login.indexOf(',') !== -1 || login.indexOf('<') !== -1 || login.indexOf('.') !== -1 || login.indexOf('>') !== -1 || login.indexOf('/') !== -1 || login.indexOf('?') !== -1) {
            validationErrors.push("Login nie może zawierać znaków specjalnych ani spacji!");
        }
        if (nick.indexOf(' ') !== -1 || nick.indexOf('!') !== -1 || nick.indexOf('@') !== -1 || nick.indexOf('#') !== -1 || nick.indexOf('$') !== -1 || nick.indexOf('%') !== -1 || nick.indexOf('^') !== -1 || nick.indexOf('&') !== -1 || nick.indexOf('*') !== -1 || nick.indexOf('(') !== -1 || nick.indexOf(')') !== -1 || nick.indexOf('-') !== -1 || nick.indexOf('_') !== -1 || nick.indexOf('=') !== -1 || nick.indexOf('+') !== -1 || nick.indexOf('`') !== -1 || nick.indexOf('~') !== -1 || nick.indexOf('[') !== -1 || nick.indexOf(']') !== -1 || nick.indexOf('{') !== -1 || nick.indexOf('}') !== -1 || nick.indexOf(';') !== -1 || nick.indexOf(':') !== -1 || nick.indexOf("'") !== -1 || nick.indexOf('"') !== -1 || nick.indexOf('\\') !== -1 || nick.indexOf('|') !== -1 || nick.indexOf(',') !== -1 || nick.indexOf('<') !== -1 || nick.indexOf('.') !== -1 || nick.indexOf('>') !== -1 || nick.indexOf('/') !== -1 || nick.indexOf('?') !== -1) {
            validationErrors.push("Nick nie może zawierać znaków specjalnych ani spacji!");
        }
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            validationErrors.push("Nieprawidłowy adres Email!");
        }
        if (password.indexOf(' ') !== -1) {
            validationErrors.push("Serio? Spacja w haśle? Proszę Cię to nie aplikacja bankowa...");
        }
        if (!rulesAccept) {
            validationErrors.push("Nie zapoznałeś się z regulaminem!");
        }
        if (validationErrors.length === 0) {
            const date = new Date();
            const createAccountDate = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
            fetch('https://question-mark-project-anime.herokuapp.com/users/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    createAccountDate,
                    email,
                    login,
                    password,
                    rank: '1',
                    username: nick
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === 11000) {
                    setRegisterResponse('Użytkownik o takim loginie lub z takim adresem email już isnieje!');
                    setResponseColor('red');
                } else if (res.response) {
                    setRegisterResponse(res.response);
                    setResponseColor('green');
                    setTimeout(() => {
                        if (target.localName === "span") {
                            target = target.parentElement.parentElement.parentElement.parentElement;
                        } else if (target.localName === "button") {
                            target = target.parentElement.parentElement.parentElement;
                        }
                        handleQuit(e = target);
                        handleSignIn();
                        setEmail('');
                        setPassword('');
                        setLogin('');
                        setNick('');
                        setRegisterResponse('');
                        setRulesAccept(false);
                    }, 1500);
                }
            });
        }
        setValidationErrorsList(validationErrors);
    }

    const validationErrors = validationErrorsList.map((e, i) => <li key={i} className="loginScreen__errorItem">{e}</li>);

    return ( 
        <div className="loginScreen registerScreen none" onClick={(e) => {handleQuit(e = e.target)}}>
            <div className="loginScreen__curtain">
                <div className="loginScreen__panel">
                    <h2 className="loginScreen__title">Rejestracja</h2>
                    <ul className="loginScreen__list">
                        {validationErrors}
                    </ul>
                    <form className="loginScreen__form">
                        <input type="text" className="loginScreen__input" placeholder="login" value={login} onChange={(e) => {handleInputChange("login", e)}}/>
                        <input type="text" className="loginScreen__input" placeholder="hasło" value={password} onChange={(e) => {handleInputChange("password", e)}}/>
                        <input type="text" className="loginScreen__input" placeholder="e-mail" value={email} onChange={(e) => {handleInputChange("email", e)}}/>
                        <input type="text" className="loginScreen__input" placeholder="nick" value={nick} onChange={(e) => {handleInputChange("nick", e)}}/>
                        <FormControlLabel control={<Checkbox />} label="Oświadczam, że zapoznałem się z regulaminem platformy i zobowiązuję się do jego przestrzegania." checked={rulesAccept} onChange={handleRulesAcceptChange}/>
                        <Button className="button loginScreen__submit" onClick={handleUserRegister}>Zarejestruj</Button>
                        {registerResponse ? <p className="loginScreen__response" style={{color: responseColor}}>{registerResponse}</p> : null}
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