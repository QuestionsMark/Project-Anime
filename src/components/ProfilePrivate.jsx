import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';

const ProfilePrivate = ({isUserLogged, match}) => {

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
    }

    const handlePassVisibility = (e) => {
        let target = e.target;
        if (target.localName === 'path') {
            target = target.parentElement;
        }
        if (target.previousSibling.type === 'password') {
            target.previousSibling.type = 'text';
        } else {
            target.previousSibling.type = 'password';
        }
        
    }

    const isChanged = () => {
        if ((login !== previousLogin && login !== '' && oldPassword !== '' && password === password2) || (email !== previousEmail && email !== '' && oldPassword !== '' && password === password2) || (oldPassword !== '' && password !== '' && password2 !== '' && password === password2)) {
            return false;
        }
        return true;
    }

    const handleSave = () => {
        fetch('https://question-mark-project-anime.herokuapp.com/profile/change/private', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                email,
                login,
                oldPassword,
                password,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.reload();
            })
    }

    useEffect(() => {
        if (isUserLogged && match.params.userID === localStorage.getItem('l')) {
            fetch(`https://question-mark-project-anime.herokuapp.com/users/private/${localStorage.getItem('UID')}`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(res => {
                    setEmail(res.email);
                    setPreviousEmail(res.email);
                    setLogin(res.login);
                    setPreviousLogin(res.login);
                })
        }
    },[isUserLogged])

    return ( 
        <div className="profilePrivate profile__content">
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Adres E-mail</h2>
                <input type="text" className="profileEdit__username" data-type="email" placeholder="Email" value={email} onChange={handleInpChange}/>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Login</h2>
                <input type="text" className="profileEdit__username" data-type="login" placeholder="Login" value={login} onChange={handleInpChange}/>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Hasło</h2>
                <div className="profileEdit__inpWrapper">
                    <input type="password" className="profileEdit__username" data-type="password" placeholder="New password" value={password} onChange={handleInpChange}/>
                    <VisibilityRoundedIcon className="profilePrivate__passIcon" onClick={handlePassVisibility}/>
                </div>
                <div className="profileEdit__inpWrapper">
                    <input type="password" className="profileEdit__username" data-type="password2" placeholder="New password again" value={password2} onChange={handleInpChange}/>
                    <VisibilityRoundedIcon className="profilePrivate__passIcon" onClick={handlePassVisibility}/>
                </div>
            </div>
            <div className="profileEdit__inpWrapper profileEdit__inpWrapper--save">
                    <input type="password" className="profileEdit__username" data-type="oldPassword" placeholder="Password" value={oldPassword} onChange={handleInpChange}/>
                    <Button className="button profilePrivate__save" disabled={isChanged() ? true : false} onClick={handleSave}>Zapisz</Button>
                </div>
        </div>
     );
}
 
export default withRouter(ProfilePrivate);