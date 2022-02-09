import React, { useEffect, useState, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { VisibilityRounded } from '@material-ui/icons';

import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const ProfilePrivate = ({match}) => {

    const componentRef = useRef();

    const { user } = useUser();

    const inputPassword1 = useRef();
    const inputPassword2 = useRef();

    const [email, setEmail] = useState('');
    const [previousEmail, setPreviousEmail] = useState('');
    const [login, setLogin] = useState('');
    const [previousLogin, setPreviousLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const handleInpChange = (e) => {
        const type = e.target.getAttribute('data-type');
        if (type === 'email') {
            setEmail(e.target.value);
        } else if (type === 'login') {
            setLogin(e.target.value);
        } else if (type === 'password') {
            setPassword(e.target.value);
        } else if (type === 'password2') {
            setPassword2(e.target.value);
        } else if (type === 'oldPassword') {
            setOldPassword(e.target.value);
        }
    };

    const getPrivateData = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}/private`);
        if (response.ok) {
            const {email, login} = await response.json();
            if (!componentRef.current) return;
            setEmail(email);
            setLogin(login);
            setPreviousEmail(email);
            setPreviousLogin(login);
        }
    }, [user]);

    const handleChangeVisibility = () => {
        if (inputPassword1.current.type === 'password') {
            inputPassword1.current.type = 'text';
            inputPassword2.current.type = 'text';
        } else {
            inputPassword1.current.type = 'password';
            inputPassword2.current.type = 'password';
        }
    };

    const isChanged = () => {
        if ((login !== previousLogin && login !== '' && oldPassword !== '' && password === password2) || (email !== previousEmail && email !== '' && oldPassword !== '' && password === password2) || (oldPassword !== '' && password !== '' && password2 !== '' && password === password2)) return false;
        return true;
    };

    const handleSave = async () => {
        const response = await fetch(`${HOST_ADDRESS}/profile/change/private`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                email,
                login,
                oldPassword,
                password,
            }),
        });
        if (response.ok) {
            console.log('Ustawienia prywatne zostały zmienione.');
        }
        setPassword('');
        setPassword2('');
        setOldPassword('');
        getPrivateData();
    };

    useEffect(() => {
        if (JSON.stringify(user) !== "{}" && match.params.userID === user.id) {
            getPrivateData();
        }
    },[getPrivateData, match, user])

    return ( 
        <div className="profilePrivate profile__content" ref={componentRef}>
            <form className="profileEdit__section" autoComplete="off">
                <h2 className="profileEdit__title mediumTitle">Zmień Adres E-mail</h2>
                <input type="text" className="profileEdit__username" data-type="email" placeholder="Email" value={email} onChange={handleInpChange}/>
            </form>
            <form className="profileEdit__section" autoComplete="off">
                <h2 className="profileEdit__title mediumTitle">Zmień Login</h2>
                <input type="text" className="profileEdit__username" data-type="login" placeholder="Login" value={login} onChange={handleInpChange}/>
            </form>
            <form className="profileEdit__section" autoComplete="off">
                <h2 className="profileEdit__title mediumTitle">Zmień Hasło</h2>
                <div className="profileEdit__inpWrapper">
                    <input type="password" ref={inputPassword1} className="profileEdit__username" data-type="password" placeholder="New password" value={password} onChange={handleInpChange}/>
                    <VisibilityRounded className="profilePrivate__passIcon" onClick={handleChangeVisibility}/>
                </div>
                <div className="profileEdit__inpWrapper">
                    <input type="password" ref={inputPassword2} className="profileEdit__username" data-type="password2" placeholder="New password again" value={password2} onChange={handleInpChange}/>
                </div>
            </form>
            <div className="profileEdit__inpWrapper profileEdit__inpWrapper--save">
                    <input type="password" className="profileEdit__username" data-type="oldPassword" placeholder="Password" value={oldPassword} onChange={handleInpChange}/>
                    <Button className="button profilePrivate__save" disabled={isChanged() ? true : false} onClick={handleSave}>Zapisz</Button>
                </div>
        </div>
     );
}
 
export default withRouter(ProfilePrivate);