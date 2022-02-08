import React from 'react';
import Popup from 'reactjs-popup';

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import ChangesDescription from '../../ChangesDescription';

import { useUser } from '../../../contexts/UserProvider';
import { textHelper } from '../../../utils/textHelper';
import { HOST_ADDRESS } from '../../../config';
import { useResponsePopup } from '../../../contexts/ResponsePopupProvider';
import { Link } from 'react-router-dom';

const Description = ({ id, authorId, author, description, getAnimeData }) => {

    const { status, authorization } = useUser();
    const { setResponse, setOpen } = useResponsePopup();

    const handleResetDescription = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/description`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                animeID: id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Usunięto opis anime.'});
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        setOpen(true);
        getAnimeData();
    };

    return ( 
        <div className="page__description text--indent scrollNav" data-id="3">
            {(status && description.includes('Lorem ipsum')) || (authorization === '2' || authorization === '3') ? <div className="page__adminChanges">
                <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                    {close => <ChangesDescription close={close} id={id} getAnimeData={getAnimeData}/>}
                </Popup>
            </div> : null}
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--description">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleResetDescription}/>
            </div> : null}
            <h3 className="page__descriptionTitle mediumTitle">Opis</h3>
            <div className="text page__descriptionText">
                {textHelper(description)}
                <Link to={`/users/${authorId}`} className="page__author">{author}</Link>
            </div>
        </div>
     );
}
 
export default Description;