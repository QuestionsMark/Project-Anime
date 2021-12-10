import React from 'react';

import { useUser } from '../contexts/UserProvider';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { HOST_ADDRESS } from '../config';
import { useResponsePopup } from '../contexts/ResponsePopupProvider';

const SingleNewsImage = ({id, _id, newsID, title, getNewsData}) => {

    const { setOpen, setResponse } = useResponsePopup();

    const { authorization } = useUser();

    const handleRemoveImage = async () => {
        let graphics = [];
        const graphicsResponse = await fetch(`${HOST_ADDRESS}/anime/mini`);
        if (graphicsResponse.ok) {
            graphics = await graphicsResponse.json();
        } else {
            setResponse({status: false, message: 'Przepraszamy, spróbuj ponownie później.'});
            return;
        }
        const isDefault = graphics.findIndex(g => g.id === id) !== -1;
        if (!isDefault) {
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                setResponse({status: response.ok, message: error.message});
                return;
            }
        }
        const response2 = await fetch(`${HOST_ADDRESS}/news/${newsID}/images/${_id}`, {
            method: 'DELETE',
        });
        if (response2.ok) {
            setResponse({status: response2.ok, message: 'Grafika została usunięta.'});
        } else {
            const error = await response2.json();
            setResponse({status: response2.ok, message: error.message});
        }
        setOpen(true);
        getNewsData();
    };

    return ( 
        <div className="news-page__image">
            {authorization === '2' || authorization === '3' ? <RemoveRoundedIcon className="news-page__remove-icon" onClick={handleRemoveImage}/> : null}
            <img key={id} className="img" src={`${HOST_ADDRESS}/images/${id}`} alt={`Aktualności: ${title}`}/>
        </div>
     );
}
 
export default SingleNewsImage;