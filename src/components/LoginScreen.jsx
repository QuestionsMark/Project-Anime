import { Button } from '@material-ui/core';
import React, { useState } from 'react';

const LoginScreen = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChange = (type, e) => {
        if (type === "login") {
            setLogin(e.target.value);
        } else if (type === "password") {
            setPassword(e.target.value);
        }
    }

    const [loginResponse, setLoginResponse] = useState('');

    const handleQuit = (e) => {
        let target = e;
        if (target.className === 'loginScreen__curtain') {
            target.parentElement.classList.toggle('none')
        }
    }

    const handleGoRegister = () => {
        document.querySelector('.loginScreen').classList.toggle('none');
        document.querySelector('.registerScreen').classList.toggle('none');
    }

    const handleUserLogin = (e) => {
        let target = e.target;
        if (login.indexOf(' ') !== -1 || login.indexOf('!') !== -1 || login.indexOf('@') !== -1 || login.indexOf('#') !== -1 || login.indexOf('$') !== -1 || login.indexOf('%') !== -1 || login.indexOf('^') !== -1 || login.indexOf('&') !== -1 || login.indexOf('*') !== -1 || login.indexOf('(') !== -1 || login.indexOf(')') !== -1 || login.indexOf('-') !== -1 || login.indexOf('_') !== -1 || login.indexOf('=') !== -1 || login.indexOf('+') !== -1 || login.indexOf('`') !== -1 || login.indexOf('~') !== -1 || login.indexOf('[') !== -1 || login.indexOf(']') !== -1 || login.indexOf('{') !== -1 || login.indexOf('}') !== -1 || login.indexOf(';') !== -1 || login.indexOf(':') !== -1 || login.indexOf("'") !== -1 || login.indexOf('"') !== -1 || login.indexOf('\\') !== -1 || login.indexOf('|') !== -1 || login.indexOf(',') !== -1 || login.indexOf('<') !== -1 || login.indexOf('.') !== -1 || login.indexOf('>') !== -1 || login.indexOf('/') !== -1 || login.indexOf('?') !== -1) {
            setLoginResponse("Nie prawidłowy login lub hasło!");
        } else if (password.indexOf(' ') !== -1) {
            setLoginResponse("Nie prawidłowy login lub hasło!");
        } else {
            fetch('http://localhost:9000/users/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    login,
                    password,
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.token) {
                    localStorage.setItem('UID', res.id);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('l', res.link);
                    if (target.localName === "span") {
                        target = target.parentElement.parentElement.parentElement.parentElement;
                    } else if (target.localName === "button") {
                        target = target.parentElement.parentElement.parentElement;
                    }
                    handleQuit(e = target);
                    setLogin('');
                    setPassword('');
                    window.location.reload();
                } else {
                    setLoginResponse('Błędny login lub hasło!');
                }
            })
        }
    }

    return ( 
        <div className="loginScreen none" onClick={(e) => {handleQuit(e = e.target)}}>
            <div className="loginScreen__curtain">
                <div className="loginScreen__panel">
                    <h2 className="loginScreen__title">Logowanie</h2>
                    <form className="loginScreen__form">
                        <input type="text" className="loginScreen__input" placeholder="login" value={login} onChange={(e) => {handleInputChange("login", e)}}/>
                        <input type="text" className="loginScreen__input" placeholder="hasło" value={password} onChange={(e) => {handleInputChange("password", e)}}/>
                        <Button className="button loginScreen__submit" onClick={handleUserLogin}>Zaloguj</Button>
                        {loginResponse ? <p className="loginScreen__response loginScreen__response--red">{loginResponse}</p> : null}
                    </form>
                    <div className="loginScreen__help">
                        <p className="loginScreen__text link">Zapomniałeś hasła?</p>
                        <p className="loginScreen__text">Nie masz jeszcze konta? <span className="loginScreen__goRegister" onClick={handleGoRegister}>Zarejestruj się</span> już teraz!</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginScreen;