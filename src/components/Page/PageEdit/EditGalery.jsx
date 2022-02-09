import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import SingleImagePreview from '../../SingleImagePreview';

import { useResponsePopup } from '../../../contexts/ResponsePopupProvider';
import { useUser } from '../../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../../config';

const EditGalery = ({close, id, getAnimeData}) => {

    const { setOpen, setResponse } = useResponsePopup();
    const { user } = useUser();

    const [validationErrors, setValidationErrors] = useState(
        ['Wybierz grafikę lub grafiki typu jpg, jpeg, png, webp, gif.']
    );
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState(null);
    const handleFileChange = e => {
        const files = [...e.target.files];
        const data = new FormData();
        files.forEach(f => data.append('myImg', f));
        setImages(data);
        const previewList = files.map(f => {
            const url = URL.createObjectURL(f);
            const size = f.size / 1024 / 1024;
            const type = f.type;
            return { url, size, type };
        });
        setImagesPreview(previewList);
    };

    const checkValidation = useCallback(() => {
        const errors = [];

        let test = true;
        for (const { type } of imagesPreview) {
            if (!(/jpg|jpeg|png|webp|gif/.test(type))) {
                test = false;
            }
        }

        if (!images || !test) {
            errors.push('Wybierz grafikę lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.');
        }

        const tooBigFiles = imagesPreview.filter(p => p.size > 2.62144);
        if (tooBigFiles.length > 0) {
            errors.push(`${tooBigFiles.length > 1 ? `Grafiki za dużo ważą! (${tooBigFiles.length})` : 'Grafika za dużo waży'}`);
        }

        return errors;
    }, [images, imagesPreview]);

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const previewList = () => imagesPreview.map((p, i) => <SingleImagePreview key={i} image={p} />);

    const responseMessage = (value) => {
        switch (value) {
            case 1:
                return 'Galeria została powiększona o 1 grafikę.';
            case 2:
                return 'Galeria została powiększona o 2 grafiki.';
            case 3:
                return 'Galeria została powiększona o 3 grafiki.';
            case 4:
                return 'Galeria została powiększona o 4 grafiki.';
            default:
                return `Galeria została powiększona o ${value} grafik.`;
        }
    };

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setImages(null);
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'POST',
                headers: {
                    'user': user.id,
                },
                body: images,
            });
            if (response.ok) {
                const images = await response.json();
                const response2 = await fetch(`${HOST_ADDRESS}/anime/galery`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        animeID: id,
                        images,
                    }),
                });
                if (response2.ok) {
                    setResponse({status: response2.ok, message: responseMessage(images.length)});
                } else {
                    const error = await response2.json();
                    setResponse({status: response2.ok, message: error.message});
                }
            } else {
                const error = await response.json();
                console.log(error);
                setResponse({status: response.ok, message: error.message});
            }
            setOpen(true);
            getAnimeData();
            close();
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [checkValidation, images]);

    return ( 
        <div className="changes__content">
            <CloseRounded  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Dodaj Grafikę</h3>
            <form className="changes__form">
                <input type="file" id="galery" multiple className="changes__galeryInp none" data-type="galery" onChange={handleFileChange}/>
                <label htmlFor="galery" className="changes__galeryLabel create__imageLabel">Wybierz Grafikę</label>
            </form>
            <ul className="changes__preview-list">
                {previewList()}
            </ul>
            <Button className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Dodaj</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
        </div>
     );
}
 
export default EditGalery;