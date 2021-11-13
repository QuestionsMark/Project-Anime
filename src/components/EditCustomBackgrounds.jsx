import React, { useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';

import preview from '../media/img/hos-back20502.webp';
import { HOST_ADDRESS } from '../config';

const EditAvatar = () => {

    const [, setOpen,, setResponse] = useResponsePopup();
    const [,,,,user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [background, setBackground] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        ['Wybierz grafikę lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.']
    );
    const handleChangeBackground = e => {
        const file = e.target.files[0];
        if (e.target.files.length > 0) {
            const data = new FormData();
            data.append('myImg', file);
            const url = URL.createObjectURL(file);
            const size = file.size / 1024 / 1024;
            const type = file.type;
            setBackgroundPreview({url, size, type});
            setBackground(data);
        }
    };

    const checkValidation = () => {
        const errors = [];

        let test = /jpg|jpeg|png|webp|gif/.test(backgroundPreview.type);

        if (!background || !test) {
            errors.push('Wybierz grafikę lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.');
        }

        if (backgroundPreview.size > 3.145728) {
            errors.push('Grafika jest za duża.');
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setBackground(null);
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                headers: {
                    'user': user.id
                },
                method: 'POST',
                body: background,
            });
            if (response.ok) {
                const images = await response.json();
                const response2 = await fetch(`${HOST_ADDRESS}/profile/background/add`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        id: user.id,
                        background: images[0],
                    }),
                });
                if (response2.ok) {
                    setResponse({status: response2.ok, message: `Dodano nowe tło.`});
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

    const setEdit = () => {
        setBackgroundPreview({ size: 0, url: preview, type: ''});
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [background]);

    useEffect(() => {
        setEdit();
    }, [user]);

    return ( 
        <>
        {JSON.stringify(user) !== "{}" && user.customBackgrounds.length < 3 ? <div className="profileEdit__addCustomBackground">
            <h3 className="profileEdit__backgroundsTitle">Dodaj Własne Tło</h3>
            <form className="profileEdit__addFileForm">
                <label htmlFor="background-upload" className="profileEdit__addFileLabel">Wybierz swoje tło</label>
                <input type="file" id="background-upload" className="profileEdit__addFile" onChange={handleChangeBackground}/>
            </form>
            {JSON.stringify(backgroundPreview) !== "{}" ? <div className ="profileEdit__preview">{backgroundPreview.url !== preview ? <p className="changes__size" style={{color: backgroundPreview.size < 3.145728 ? '#5ec45e' : '#d14141'}}>{backgroundPreview.size.toFixed(2)} MB {backgroundPreview.size < 3.145728 ? 'OK' : 'Plik jest za duży!'}</p> : null}
            <div className="profileEdit__img-preview profileEdit__img-preview--background">
                <img src={backgroundPreview.url} alt="avatar" className="img"/>
            </div></div> : null}
            <Button className={`button profileEdit__save ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Dodaj</Button>
            {validationErrors.length > 0 ? <ul className="changes__validation-list changes__validation-list--profile">
                {validationList()}
            </ul> : null}
        </div> : null}
        </>
     );
}
 
export default EditAvatar;