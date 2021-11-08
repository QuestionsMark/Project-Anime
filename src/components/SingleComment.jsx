import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { HOST_ADDRESS } from '../config';

const SingleComment = ({comment, animeData, getAnime, setOpen, setResponse}) => {

    const { id, userID, img, username, date, text, likes } = comment;

    const [status,,authorization,,user] = useUser();

    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) return 'active';
        return '';
    }

    const handleLikeClick = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/anime/comment/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: animeData.id,
                    userID: user.id,
                    id,
                }),
            });
            getAnime();
        } else {
            // przenieś do logowania
        }
    };

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/comment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                animeID: animeData.id,
                id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Usunięto komentarz.'});
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        getAnime();
        setOpen(true);
    };

    return ( 
        <div className="comments__item">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--com">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="comments__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${img}`} alt="avatar" className="img" />
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