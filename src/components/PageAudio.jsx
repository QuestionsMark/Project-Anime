import React, { useRef, useState } from 'react';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import Audio from '../components/Audio';

import { HOST_ADDRESS } from '../config';
import { useLoginPopup } from '../contexts/LoginPopup';

const PageAudio = ({soundtrack, animeData, getAnime}) => {

    const {id, composer, title, likes} = soundtrack;

    const { setOpenLoginScreen } = useLoginPopup();
    const { setOpen, setResponse } = useResponsePopup();
    const { status, authorization, user } = useUser();

    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) {
            return 'active';
        }
        return '';
    };

    const handleLikeClick = async () => {
        if (status && JSON.stringify(user) !== "{}") {
            await fetch(`${HOST_ADDRESS}/soundtracks/like/${id}/${animeData.id}/${user.id}`, {
                method: 'PUT',
            });
            getAnime();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/soundtracks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });
        if (response.ok) {
            const response2 = await fetch(`${HOST_ADDRESS}/anime/soundtrack`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: animeData.id,
                    id,
                }),
            });
            if (response2.ok) {
                setResponse({status: response2.ok, message: 'Soundtrack został usunięty.'});
            } else {
                const error = await response2.json();
                setResponse({status: response2.ok, message: error.message});
            }
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        } 
        setOpen(true);
    };

    return ( 
        <div className="page__soundtrack">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--audio">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="page__soundtrack-audio">
                <Audio id={id}/>
            </div>
            <p className="audioInterface__soundtrackInfo">{composer}&nbsp;&nbsp;-&nbsp;&nbsp;"{title}"</p>
            <div className="audioInterface__likes">
                <p className="audioInterface__likesValue">{likes.length}</p>
                <FavoriteBorderRoundedIcon className={`audioInterface__likeIcon ${JSON.stringify(user) !== "{}" ? isActive() : ''}`} onClick={(e) => {handleLikeClick(e)}}/>
            </div>
        </div>
     );
}
 
export default PageAudio;