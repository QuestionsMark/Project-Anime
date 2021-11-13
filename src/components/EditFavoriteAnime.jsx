import React, { useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';

const EditFavoriteAnime = () => {

    const [, setOpen,, setResponse] = useResponsePopup();
    const [,,,,user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [favoriteAnime, setFavoriteAnime] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Zmień na inne niż obecne.']
    );
    const handleChangeFavoriteAnime = e => {
        setFavoriteAnime(e.target.value);
    };

    const checkValidation = () => {
        const errors = [];

        if (favoriteAnime === user?.favoriteAnime?.id) {
            errors.push('Zmień na inne niż obecne.');
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const formAnimeList = () => {
        const animeToCHoose = [...user.userAnimeData.watched]
            .filter(a => a.id !== user.favoriteAnime.id);
        animeToCHoose.push(user.favoriteAnime);
        return animeToCHoose.sort(function( a, b ) {
                if ( a.title.toLowerCase() < b.title.toLowerCase() ) return -1;
                if ( a.title.toLowerCase() > b.title.toLowerCase() ) return 1;
                return 0;
            })
            .map(anime => <MenuItem key={anime.id} value={anime.id}>{anime.title}</MenuItem>);
    };

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            const response = await fetch(`${HOST_ADDRESS}/profile/favorite-anime`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    id: user.id,
                    animeId: favoriteAnime
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Ulubione anime zostało zmienione.'});
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
            getUser();
            setOpen(true);
        }
    };

    const setEdit = () => {
        const favoriteAnime = user.favoriteAnime.id;
        setFavoriteAnime(favoriteAnime);
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [favoriteAnime]);

    useEffect(() => {
        if (JSON.stringify(user) !== "{}"){
            setEdit();
        }
    }, [user]);

    return ( 
        <div className="profileEdit__section">
            <h2 className="profileEdit__title mediumTitle">Ulubione Anime</h2>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Ulubione anime</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={favoriteAnime} onChange={handleChangeFavoriteAnime}>
                    {JSON.stringify(user) !== "{}" ? formAnimeList() : null}
                </Select>
            </FormControl>
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zapisz</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                <p className="profileEdit__validation-info">Lista anime do wybrania składa się tylko z Twoich obejrzanych anime!</p>
                {validationList()}
            </ul> : null}
        </div>
     );
}
 
export default EditFavoriteAnime;