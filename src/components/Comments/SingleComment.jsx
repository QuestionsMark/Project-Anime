import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FavoriteBorderRounded, RemoveRounded } from '@material-ui/icons';

import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { useLoginPopup } from '../../contexts/LoginPopup';
import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const SingleComment = ({comment, collectionId, getData, collection}) => {

    const { id, userID, date, text, likes } = comment;

    const componentRef = useRef();

    const { setOpenLoginScreen } = useLoginPopup();
    const { setOpen, setResponse } = useResponsePopup();
    const { status, authorization, user } = useUser();

    const [avatar, setAvatar] = useState('618808b0272a0338bcef2a09');
    const [username, setUsername] = useState('');
    const getAvatar = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${userID}/comment-info`);
        if (response.ok) {
            const { avatar, username } = await response.json();
            if (!componentRef.current) return;
            setAvatar(avatar);
            setUsername(username);
        }
    }, [userID]);

    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) return 'active';
        return '';
    }

    const handleLikeClick = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/${collection}/comment/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionID: collectionId,
                    userID: user.id,
                    id,
                }),
            });
            getData();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/${collection}/comment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collectionID: collectionId,
                id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Usunięto komentarz.'});
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        setOpen(true);
        getData();
    };

    useEffect(() => {
        getAvatar();
    },[getAvatar]);

    return ( 
        <div className="comments__item" ref={componentRef}>
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--com">
                <RemoveRounded className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="comments__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})` }}/>
            <div className="comments__content">
                <div className="comments__info">
                    <Link to={`/users/${userID}`} className="comments__nick">{username}</Link>
                    <p className="comments__date">{date}</p>
                </div>
                <p className="text comments__text">{text}</p>
                <div className="comments__likes">
                    <p className="comments__likesValue">{likes.length}</p>
                    <FavoriteBorderRounded className={`comments__likeIcon ${status ? isActive() : ''}`} onClick={handleLikeClick}/>
                </div>
            </div>
        </div>
     );
}
 
export default SingleComment;