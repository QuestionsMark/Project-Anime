import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';

const EditFavoriteType = () => {

    const componentRef = useRef();

    const { setOpen, setResponse } = useResponsePopup();
    const { user, setUser } = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [types, setTypes] = useState([]);
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            if (!componentRef.current) return;
            setTypes(types);
        }
    };

    const [favoriteType, setFavoriteType] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        ['Zmień na inny niż obecne.']
    );
    const handleChangeFavoriteType = e => {
        setFavoriteType(e.target.value);
    };

    const checkValidation = useCallback(() => {
        const errors = [];

        if (favoriteType === user?.favoriteType) {
            errors.push('Zmień na inny niż obecne.');
        }

        return errors;
    }, [favoriteType, user]);

    const validationList = () => {
        return validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);
    };

    const formTypeList = () => {
        return [...types]
            .sort((a, b) => {
                if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
                if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
                return 0;
            })
            .map(t => <MenuItem key={t.id} value={t.name}>{t.name}</MenuItem>);
    };

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            if (!componentRef.current) return;
            setFavoriteType('');
            const response = await fetch(`${HOST_ADDRESS}/profile/favorite-type`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    id: user.id,
                    favoriteType,
                }),
            });
            if (response.ok) {
                setResponse({status: response.ok, message: 'Twój ulubiony gatunek został zmieniony.'});
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
            getUser();
            setOpen(true);
        }
    };

    const setEdit = useCallback(() => {
        const favoriteType = user.favoriteType;
        setFavoriteType(favoriteType);
    }, [user]);

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [checkValidation, favoriteType]);

    useEffect(() => {
        if (JSON.stringify(user) !== "{}" && types.length > 0){
            setEdit();
        }
    }, [user, types, setEdit]);

    return ( 
        <div className="profileEdit__section" ref={componentRef}>
            <h2 className="profileEdit__title mediumTitle">Ulubiony Gatunek</h2>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Ulubiony Gatunek</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={favoriteType} onChange={handleChangeFavoriteType}>
                    <MenuItem value="Brak">
                        <em>Brak</em>
                    </MenuItem>
                    {types.length > 0 ? formTypeList() : null}
                </Select>
            </FormControl>
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zapisz</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                {validationList()}
            </ul> : null}
        </div>
     );
}
 
export default EditFavoriteType;