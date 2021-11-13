import React, { useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';

const EditIntroduction = () => {

    const [, setOpen,, setResponse] = useResponsePopup();
    const [,,,,user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Tytuł powinien zawierać od 1 do 100 znaków.', 'Opis powinien zawierać od 1 do 10000 znaków.']
    );
    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };
    const handleChangeDescription = e => {
        setDescription(e.target.value);
    };

    const checkValidation = () => {
        const errors = [];

        if (description.length < 1 || description.length > 10000) {
            errors.push('Opis powinien zawierać od 1 do 10000 znaków.');
        }

        if (title.length < 1 || title.length > 100) {
            errors.push('Tytuł powinien zawierać od 1 do 100 znaków.');
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setTitle('');
            setDescription('');
            const response = await fetch(`${HOST_ADDRESS}/profile/introduction`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    id: user.id,
                    title,
                    description,
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Twój opis profilu został zaktualizowany.'});
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
    }, [title, description]);

    return ( 
        <div className="profileEdit__section">
            <h2 className="profileEdit__title mediumTitle">Zmień Opis</h2>
            <div className="profileEdit__description">
                <input type="text" className="profileEdit__descriptionTitle" placeholder="Tytuł" value={title} onChange={handleChangeTitle}/>
                <textarea className="profileEdit__descriptionText" placeholder="Napisz coś o sobie..." value={description} onChange={handleChangeDescription}/>
            </div>
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zapisz</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                <p className="profileEdit__validation-info">Aktualna ilość znaków opisu ( <span style={{color: description.length === 0 || description.length > 10000 ? '#d14141' : '#5ec45e'}}>{description.length}</span> ).</p>
                {validationList()}
            </ul> : null}
        </div>
     );
}
 
export default EditIntroduction;