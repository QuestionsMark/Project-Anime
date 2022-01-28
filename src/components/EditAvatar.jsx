import React, { useCallback, useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';

import { HOST_ADDRESS } from '../config';

const EditAvatar = () => {

    const { setOpen, setResponse } = useResponsePopup();
    const { user, setUser } = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        ['Wybierz grafikę lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.']
    );
    const handleChangeAvatar = e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const data = new FormData();
            data.append('myImg', file);
            const url = URL.createObjectURL(file);
            const size = file.size / 1024 / 1024;
            const type = file.type;
            setAvatarPreview({url, size, type});
            setAvatar(data);
        } else {
            setAvatar(null);
            setEdit();
        }
    };

    const checkValidation = useCallback(() => {
        const errors = [];

        let test = /jpg|jpeg|png|webp|gif/.test(avatarPreview.type);

        if (!avatar || !test) {
            errors.push('Wybierz grafikę lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.');
        }

        if (avatarPreview.size > 0.524288) {
            errors.push('Grafika jest za duża.');
        }

        return errors;
    }, [avatar, avatarPreview]);

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setAvatar(null);
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'POST',
                headers: {
                    'user': user.id,
                },
                body: avatar,
            });
            if (response.ok) {
                const images = await response.json();
                const response2 = await fetch(`${HOST_ADDRESS}/profile/avatar`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        id: user.id,
                        img: images[0],
                    }),
                });
                if (response2.ok) {
                    setResponse({status: response2.ok, message: `Twój avatar został zmieniony.`});
                } else {
                    const error = await response2.json();
                    setResponse({status: response2.ok, message: error.message});
                }
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
            getUser();
            setOpen(true);
        }
    };

    const setEdit = useCallback(() => {
        const { avatar } = user;
        setAvatarPreview({ size: 0, url: `${HOST_ADDRESS}/images/${avatar}`, type: ''});
    }, [user]);

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [avatar, checkValidation]);

    useEffect(() => {
        if (JSON.stringify(user) !== "{}"){
            setEdit();
        }
    }, [setEdit, user]);

    return ( 
        <div className="profileEdit__section">
            <h2 className="profileEdit__title mediumTitle">Zmień Avatar</h2>
            <form className="profileEdit__addFileForm">
                <label htmlFor="avatar-upload" className="profileEdit__addFileLabel">Wybierz nowy avatar</label>
                <input type="file" id="avatar-upload" className="profileEdit__addFile" onChange={handleChangeAvatar}/>
            </form>
            {JSON.stringify(avatarPreview) !== "{}" ? <div className ="profileEdit__preview">{avatarPreview.url !== `${HOST_ADDRESS}/images/${user.avatar}` ? <p className="changes__size" style={{color: avatarPreview.size < 0.524288 ? '#5ec45e' : '#d14141'}}>{avatarPreview.size.toFixed(2)} MB {avatarPreview.size < 0.524288 ? 'OK' : 'Plik jest za duży!'}</p> : null}
            <div className="profileEdit__img-preview profileEdit__img-preview--square" style={{ backgroundImage: `url(${avatarPreview.url})` }}/>
            <div className="profileEdit__img-preview profileEdit__img-preview--round" style={{ backgroundImage: `url(${avatarPreview.url})` }}/>
            </div> : null}
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zapisz</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                {validationList()}
            </ul> : null}
        </div>
     );
}
 
export default EditAvatar;