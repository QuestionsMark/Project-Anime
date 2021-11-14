import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';
import { useLoginPopup } from '../contexts/LoginPopup';

const LoginScreen = () => {

    const { setOpenLoginScreen, setOpenRegistrationScreen } = useLoginPopup();
    const handleOpenRegistrationScreen = () => {
        setOpenLoginScreen(false);
        setOpenRegistrationScreen(true);
    };

    const [loginResponse, setLoginResponse] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChange = (type, e) => {
        if (type === "login") {
            setLogin(e.target.value);
        } else if (type === "password") {
            setPassword(e.target.value);
        }
    }

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${HOST_ADDRESS}/users/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            })
        });
        if (response.ok) {
            const userConfig = await response.json();
            // document.cookie = `authorization-token=${userConfig.token}`;
            localStorage.setItem('animark-user-id', JSON.stringify(userConfig.id));
            localStorage.setItem('animark-token', JSON.stringify(userConfig.token));
            window.location.reload();
            setLogin('');
            setPassword('');
        } else {
            setLoginResponse('Błędny login lub hasło!');
        }
    };

    return ( 
        <div className="loginScreen__panel">
            <h2 className="loginScreen__title">Logowanie</h2>
            <form className="loginScreen__form" autoComplete="off" onSubmit={handleUserLogin}>
                <input type="text" autoComplete="off" className="loginScreen__input" placeholder="login" value={login} onChange={(e) => {handleInputChange("login", e)}}/>
                <input type="password" autoComplete="off" className="loginScreen__input" placeholder="hasło" value={password} onChange={(e) => {handleInputChange("password", e)}}/>
                <Button type="submit" className="button loginScreen__submit" onClick={handleUserLogin}>Zaloguj</Button>
                {loginResponse ? <p className="loginScreen__response loginScreen__response--red">{loginResponse}</p> : null}
            </form>
            <div className="loginScreen__help">
                <p className="loginScreen__text link">Zapomniałeś hasła?</p>
                <p className="loginScreen__text">Nie masz jeszcze konta? <span className="loginScreen__goRegister" onClick={handleOpenRegistrationScreen}>Zarejestruj się</span> już teraz!</p>
            </div>
        </div>
     );
}
 
export default LoginScreen;