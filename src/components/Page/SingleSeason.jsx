import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { RemoveRounded } from '@material-ui/icons';

import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const SingleSeason = ({season, animeId, getAnimeData}) => {

    const { id, title, background } = season;

    const { setOpen, setResponse } = useResponsePopup();
    const { authorization } = useUser();

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/seasons`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                animeID: animeId,
                season: id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Powiązane anime zostało usunięte.'});
        } else {
            const error = await response.json();
            console.log(error);
            setResponse({status: response.ok, message: error.message});
        }
        setOpen(true);
        getAnimeData();
    };

    return ( 
        <div className="page__season">
            {authorization ? <div className="page__adminChanges">
                <RemoveRounded className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <Popup className="normal-popup" position="top center" offsetY={2} on="hover" mouseEnterDelay={200} trigger={<Link to={`/anime/${id}`} className="page__season-link" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${background})`}}/>}>
                {title}
            </Popup>
        </div>
     );
}
 
export default SingleSeason;