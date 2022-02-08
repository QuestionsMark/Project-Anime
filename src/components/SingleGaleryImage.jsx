import React from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { HOST_ADDRESS } from '../config';

const SingleGaleryImage = ({image, animeId, getAnimeData}) => {

    const { id, fromAnime } = image;

    const { setOpen, setResponse } = useResponsePopup();
    const { authorization } = useUser();

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/images`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });
        if (response.ok) {
            const response2 = await fetch(`${HOST_ADDRESS}/anime/galery`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: animeId,
                    id,
                }),
            });
            if (response2.ok) {
                setResponse({status: response.ok, message: 'Grafika została usunięta.'});
            } else {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
            }
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        getAnimeData();
        setOpen(true);
    }

    return ( 
        <div className="page__imageLink">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="page__galeryImgWrapper">
                <img src={`${HOST_ADDRESS}/images/${id}`} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
        </div>
     );
}
 
export default SingleGaleryImage;