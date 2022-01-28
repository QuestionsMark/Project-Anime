import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';

import { Button } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { HOST_ADDRESS } from '../config';

const ChangesInfo = ({close, anime}) => {

    const saveButton = useRef();

    const { setOpen, setResponse } = useResponsePopup();

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

    const checkValidation = useCallback(() => {
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
    }, [duration, productionDate, scenario]);

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
                setResponse({status: response.ok, message: error.message});
            }
            setOpen(true);
            close();
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [scenario, productionDate, duration, checkValidation]);

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
        </div>
     );
}
 
export default ChangesInfo;