import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';

import { Button } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import ServerResponse from './ServerResponse';

import { HOST_ADDRESS } from '../config';

const ChangesInfo = ({close, anime, getAnime}) => {

    const saveButton = useRef();

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');

    const [scenario, setScenario] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [duration, setDuration] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Liczba znaków scenariusza powinna wynosić od 2 do 50 znaków.', 'Rok produkcji powinien zawierać 4 znaki oraz składać się wyłącznie z liczb.', 'Czas trwania powinien zawierać conajmniej 5 znaków…. 25min." lub (w przypadku filmu) "2godz. 20min."']
    );
    const handleChangeScenario = e => {
        setScenario(e.target.value);
    };
    const handleChangeProductionDate = e => {
        setProductionDate(e.target.value);
    };
    const handleChangeDuration = e => {
        setDuration(e.target.value);
    };

    const checkValidation = () => {
        const errors = [];
        const dateAllowedSigns = /[^0-9]/g;

        if (scenario.length < 2 || scenario.length > 50) {
            errors.push('Liczba znaków scenariusza powinna wynosić od 2 do 50 znaków.');
        }

        if (productionDate.length !== 4 || productionDate.match(dateAllowedSigns)) {
            errors.push('Rok produkcji powinien zawierać 4 znaki oraz składać się wyłącznie z liczb.');
        }

        if (duration.length < 5) {
            errors.push('Czas trwania powinien zawierać conajmniej 5 znaków i wyglądać w następujący sposób: "10odc. 25min." lub (w przypadku filmu) "2godz. 20min."');
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setScenario('');
            setProductionDate('');
            setDuration('');
            const response = await fetch(`${HOST_ADDRESS}/anime/info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: anime.id,
                    scenario,
                    productionDate,
                    duration
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Zaktualizowano informacje na temat anime.'});
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
    }, [scenario, productionDate, duration]);

    return ( 
        <div className="changes__content">
            <CloseRoundedIcon  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Zmień Informacje o Anime</h3>
            <form onSubmit={handleSave}>
                <input type="text" className="changes__scenario create__inputText" placeholder="Scenariusz" value={scenario} onChange={handleChangeScenario}/>
                <input type="text" className="changes__productionDate create__inputText" placeholder="Rok Produkcji" value={productionDate} onChange={handleChangeProductionDate}/>
                <input type="text" className="changes__duration create__inputText" placeholder="Czas Trwania" value={duration} onChange={handleChangeDuration}/>
                <Button type="submit" className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} ref={saveButton} onClick={handleSave}>Zmień</Button>
            </form>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
            <Popup modal nested open={open} onClose={close} >
                {close => <ServerResponse close={close} response={response}/>}
            </Popup>
        </div>
     );
}
 
export default ChangesInfo;