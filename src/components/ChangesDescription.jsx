import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';

import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import ServerResponse from './ServerResponse';

import { HOST_ADDRESS } from '../config';

const ChangesDescription = ({close, anime, getAnime}) => {

    const [,,,,user] = useUser();

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');

    const [description, setDesription] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Opis powinien zawierać conajmniej 50 znaków, ale nie więcej niż 2000.']
    );
    const handleChangeDescription = e => {
        setDesription(e.target.value);
    }

    const checkValidation = () => {
        const errors = [];

        if (description.length < 50 || description.length > 2000) {
            errors.push('Liczba znaków scenariusza powinna wynosić od 2 do 50 znaków.');
        }

        return errors;
    };

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
                    animeID: anime.id,
                    description
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Opis anime został zmieniony.'});
            } else {
                const error = await response.json();
                console.log(error);
                setResponse({status: response.ok, message: error.message});
            }
            getAnime();
            setOpen(true);
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [description]);

    return ( 
        <div className="changes__content">
            <CloseRoundedIcon  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Zmień Opis</h3>
            <textarea className="changes__textarea profileEdit__descriptionText" placeholder="Nowy Opis..." value={description} onChange={handleChangeDescription}/>
            <Button className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zmień</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
            <Popup modal nested open={open} onClose={close} >
                {close => <ServerResponse close={close} response={response}/>}
            </Popup>
        </div>
     );
}
 
export default ChangesDescription;