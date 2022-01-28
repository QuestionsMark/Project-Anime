import React, { useCallback, useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';

const EditUsername = () => {

    const { setOpen, setResponse } = useResponsePopup();
    const { user, setUser } = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [username, setUsername] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Nick powinien zawierać od 2 do 50 znaków.']
    );
    const handleChangeUsername = e => {
        setUsername(e.target.value);
    };

    const checkValidation = useCallback(() => {
        const errors = [];

        if (username.length < 2 || username.length > 50) {
            errors.push('Nick powinien zawierać od 2 do 50 znaków.');
        }

        return errors;
    }, [username]);

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setUsername('');
            const response = await fetch(`${HOST_ADDRESS}/profile/username`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    id: user.id,
                    username
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Twój nick został zmieniony.'});
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
            getUser();
            setOpen(true);
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [checkValidation, username]);

    return ( 
        <div className="profileEdit__section">
            <h2 className="profileEdit__title mediumTitle">Zmień Swój Nick</h2>
            <input type="text" className="profileEdit__username" placeholder="Nowy nick" value={username} onChange={handleChangeUsername}/>
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zapisz</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                {validationList()}
            </ul> : null}
        </div>
        
     );
}
 
export default EditUsername;