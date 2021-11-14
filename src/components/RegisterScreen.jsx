import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { HOST_ADDRESS } from '../config';
import { useLoginPopup } from '../contexts/LoginPopup';

const RegisterScreen = () => {

    const { setOpenLoginScreen, setOpenRegistrationScreen } = useLoginPopup();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const [rulesAccept, setRulesAccept] = useState(false);
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
    };
    const handleRulesAcceptChange = () => {
        setRulesAccept((prev) => !prev);
    };
    const [registerResponse, setRegisterResponse] = useState('');
    const [responseColor, setResponseColor] = useState('green');
    const [validationErrorsList, setValidationErrorsList] = useState([]);

    const handleRegistrationSucces = () => {
        setOpenRegistrationScreen(false);
        setOpenLoginScreen(true);
    };

    const handleUserRegister = async () => {
        const validationErrors = [];
        const re = /[^A-Za-z0-9 ]/g;
        if (nick.match(re)) {
            console.log(nick.match(re));
            validationErrors.push('Nick nie może zawierać znaków specjalnych!');
        }
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            validationErrors.push("Nieprawidłowy adres Email!");
        }
        if (!rulesAccept) {
            validationErrors.push("Nie zapoznałeś się z regulaminem!");
        }
        if (validationErrors.length === 0) {
            const date = new Date();
            const createAccountDate = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
            const response = await fetch(`${HOST_ADDRESS}/users`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    createAccountDate,
                    email,
                    login,
                    password,
                    username: nick
                }),
            });
            if (response.ok) {
                const registration = await response.json();
                setRegisterResponse(registration.message);
                setResponseColor('green');
                setTimeout(() => {
                    setEmail('');
                    setPassword('');
                    setLogin('');
                    setNick('');
                    setRegisterResponse('');
                    setRulesAccept(false);
                    handleRegistrationSucces();
                }, 1500);
            } else {
                const {error} = await response.json();
                if (error.code === 11000) {
                    setRegisterResponse('Użytkownik o takim loginie lub z takim adresem email już isnieje!');
                    setResponseColor('red');
                } else {
                    setRegisterResponse('Przepraszamy, spróbuj ponownie później.');
                    setResponseColor('red');
                }
            }
        }
        setValidationErrorsList(validationErrors);
    };

    const validationErrors =  () => {
        return validationErrorsList.map((e, i) => <li key={i} className="loginScreen__errorItem">{e}</li>);
    };

    return ( 
        <div className="loginScreen__panel">
            <h2 className="loginScreen__title">Rejestracja</h2>
            <ul className="loginScreen__list">
                {validationErrors()}
            </ul>
            <form className="loginScreen__form">
                <input type="text" className="loginScreen__input" placeholder="login" value={login} onChange={(e) => {handleInputChange("login", e)}}/>
                <input type="password" className="loginScreen__input" placeholder="hasło" value={password} onChange={(e) => {handleInputChange("password", e)}}/>
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
     );
}
 
export default RegisterScreen;