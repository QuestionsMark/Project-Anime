import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { useUser } from '../../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../../config';
import { useResponsePopup } from '../../../contexts/ResponsePopupProvider';

const EditDescription = ({close, id, getAnimeData}) => {

    const { setOpen, setResponse } = useResponsePopup();
    const { user } = useUser();

    const [description, setDesription] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Opis powinien zawierać od 50 do 5000 znaków.']
    );
    const handleChangeDescription = e => {
        setDesription(e.target.value);
    }

    const checkValidation = useCallback(() => {
        const errors = [];

        if (description.length < 50 || description.length > 5000) {
            errors.push('Opis powinien zawierać od 50 do 5000 znaków.');
        }

        return errors;
    }, [description]);

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setDesription('');
            const response = await fetch(`${HOST_ADDRESS}/anime/description`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                    description
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Opis anime został zmieniony.'});
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
            setOpen(true);
            getAnimeData();
            close();
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [checkValidation, description]);

    return ( 
        <div className="changes__content">
            <CloseRounded  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Zmień Opis</h3>
            <textarea className="changes__textarea profileEdit__descriptionText" placeholder="Nowy Opis..." value={description} onChange={handleChangeDescription}/>
            <Button className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zmień</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
        </div>
     );
}
 
export default EditDescription;