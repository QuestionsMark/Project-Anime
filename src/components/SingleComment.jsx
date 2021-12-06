import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { HOST_ADDRESS } from '../config';
import { useLoginPopup } from '../contexts/LoginPopup';

const SingleComment = ({comment, data, getData, collection}) => {

    const { id, userID, date, text, likes } = comment;

    const { setOpenLoginScreen } = useLoginPopup();
    const [, setOpen,, setResponse] = useResponsePopup();
    const [status,,authorization,,user] = useUser();

    const [avatar, setAvatar] = useState('618808b0272a0338bcef2a09');
    const [username, setUsername] = useState('');
    const getAvatar = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${userID}`);
        if (response.ok) {
            const { avatar, username } = await response.json();
            setAvatar(avatar);
            setUsername(username);
        }
    };

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
                    collectionID: data.id,
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
                collectionID: data.id,
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
    },[]);

    return ( 
        <div className="comments__item">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--com">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="comments__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${avatar}`} alt="avatar" className="img" />
            </div>
            <div className="comments__content">
                <div className="comments__info">
                    <Link to={`/users/${userID}`} className="comments__nick">{username}</Link>
                    <p className="comments__date">{date}</p>
                </div>
                <p className="comments__text">{text}</p>
                <div className="comments__likes">
                    <p className="comments__likesValue">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`comments__likeIcon ${status ? isActive() : ''}`} onClick={handleLikeClick}/>
                </div>
            </div>
        </div>
     );
}
 
export default SingleComment;