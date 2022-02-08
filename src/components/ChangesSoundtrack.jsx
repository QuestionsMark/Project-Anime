import React, { useCallback, useEffect, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import Audio from './Audio';

import { HOST_ADDRESS } from '../config';

const ChangesSoundtrack = ({close, id, getAnimeData}) => {

    const { setOpen, setResponse } = useResponsePopup();
    const { user } = useUser();

    const [validationErrors, setValidationErrors] = useState(
        ['Wybierz audio w formacie mp3.', 'Kompozytor i tytuł powinny zawierać minimum po 2 znaki.']
    );
    const [composer, setComposer] = useState('');
    const [title, setTitle] = useState('');
    const [soundtrackPreview, setSoundtrackPreview] = useState([]);
    const [soundtrack, setSoundtrack] = useState(null);
    const handleInputChange = (type, e) => {
        if (type === "composer") {
            setComposer(e.target.value);
        } else if (type === "title") {
            setTitle(e.target.value);
        }
    }
    const handleFileChange = e => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('myMp3', file);
        const url = URL.createObjectURL(file);
        const size = file.size / 1024 / 1024;
        const type = file.type;
        setSoundtrackPreview([{url, size, type}]);
        setSoundtrack(data);
    }

    const checkValidation = useCallback(() => {
        const errors = [];

        let test = true;
        for (const { type } of soundtrackPreview) {
            if (!(/mp3|mpeg/.test(type))) {
                test = false;
            }
        }

        if (!soundtrack || !test) {
            errors.push('Wybierz audio w formacie mp3.');
        }

        if (soundtrackPreview.size > 8.388608) {
            errors.push('Audio za dużo waży.');
        }

        if (composer.length < 2 || title.length < 2) {
            errors.push('Kompozytor i tytuł powinny zawierać minimum po 2 znaki.');
        }

        return errors;
    }, [composer, soundtrack, soundtrackPreview, title]);

    const validationList = () => validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);

    const soundtracksPreviewList = () => {
        return soundtrackPreview.map(p => (
            <div key={p.url} className="changes__preview-item">
                <p className="changes__size" style={{color: p.size < 8.388608 ? '#5ec45e' : '#d14141'}}>{p.size <= 8.388608 ? `${p.size.toFixed(2)} MB OK!` : `${p.size.toFixed(2)} MB Plik audio jest za duży!`}</p>
                <Audio id={p.url} isUrl={true}/>
            </div>
        ))
    }

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setSoundtrack(null);
            const response = await fetch(`${HOST_ADDRESS}/soundtracks/${composer}/${title}/${user.id}`, {
                method: 'POST',
                body: soundtrack,
            });
            if (response.ok) {
                const soundtrack = await response.json();
                const response2 = await fetch(`${HOST_ADDRESS}/anime/soundtrack`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        animeID: id,
                        soundtrack,
                        composer,
                        title,
                    }),
                });
                if (response2.ok) {
                    setResponse({status: response2.ok, message: 'Soundtrack został dodany.'});
                } else {
                    const error = await response2.json();
                    setResponse({status: response2.ok, message: error.message});
                }
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
    }, [soundtrack, composer, title, checkValidation]);

    return ( 
        <div className="changes__content">
            <CloseRoundedIcon  className="changes__close-icon" onClick={close}/>
            <h3 className="changes__title mediumTitle">Dodaj Soundtrack</h3>
            <form className="changes__form">
                <input type="file" multiple id="soundtrack" className="changes__soundtrackInp none" data-type="soundtrack" onChange={handleFileChange}/>
                <label htmlFor="soundtrack" className="changes__soundtrackLabel create__imageLabel">Wybierz Soundtrack</label>
            </form>
            <input type="text" className="changes__composer create__inputText" placeholder="Kompozytor" value={composer} onChange={(e) => {handleInputChange("composer", e)}}/>
            <input type="text" className="changes__soundtrackTitle create__inputText" placeholder="Tytuł utworu" value={title} onChange={(e) => {handleInputChange("title", e)}}/>
            {soundtracksPreviewList()}
            <Button className={`button changes__button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Dodaj</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
        </div>
     );
}
 
export default ChangesSoundtrack;