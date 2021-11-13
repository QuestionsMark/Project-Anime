import React, { useState, useEffect } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useAnime } from '../contexts/AnimeProvider';

import { Button, FormControl, RadioGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import Search from './Search';

import { HOST_ADDRESS } from '../config';

const ChangesSeason = ({close, animeData}) => {

    const [, setOpen,, setResponse] = useResponsePopup();
    const [anime] = useAnime();

    const [seasons, setSeasons] = useState([]);
    const [validationErrors, setValidationErrors] = useState(
        ['Powinno zostać zaznaczone conajmniej jedno anime z listy.']
    );
    const [searchPhrase, setSearchPhrase] = useState('');
    const handleChangeSeasons = (e) => {
        const seasonsList = [...seasons];
        const id = e.target.value;
        const index = seasonsList.indexOf(id);
        if (index === -1) {
            seasonsList.push(id);
        } else {
            seasonsList.splice(index, 1);
        }
        setSeasons(seasonsList);
    }
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const isChecked = (id) => {
        if (seasons.indexOf(id) === -1) {
            return false
        } else {
            return true
        }
    }

    const checkValidation = () => {
        const errors = [];

        if (seasons.length < 1) {
            errors.push('Powinno zostać zaznaczone conajmniej jedno anime z listy.');
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const animeLabelList =  () => {
        const filtered = anime.filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()));
        const sorted = filtered.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        return sorted.map(a => <FormControlLabel key={a.id} checked={isChecked(a.id)} value={a.id} control={<Checkbox />} label={a.title} onChange={handleChangeSeasons}/>);
    }

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setSeasons([]);
            const response = await fetch(`${HOST_ADDRESS}/anime/seasons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: animeData.id,
                    seasons
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Powiązane anime zostały zaktualizowane.'});
            } else {
                const error = await response.json();
                console.log(error);
                setResponse({status: response.ok, message: error.message});
            }
            setOpen(true);
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [seasons]);

    return ( 
        <div className="changes__content">
            <CloseRoundedIcon  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Dodaj Powiązane Anime</h3>
            <Search handleSearch={handleSearch}/>
            <FormControl component="fieldset">
                <RadioGroup value={seasons}>
                    {animeLabelList()}
                </RadioGroup>
            </FormControl>
            <Button className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Dodaj</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
        </div>
     );
}
 
export default ChangesSeason;