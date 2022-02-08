import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { useSocket } from '../contexts/SocketProvider';
import { useUser } from '../contexts/UserProvider';

import { HOST_ADDRESS } from '../config';

const SingleWTMComment = ({comment, getWTMComments, WTMID}) => {

    const { id, userID, text, likes, date} = comment;

    const socket = useSocket();
    const { user } = useUser();

    const [avatar, setAvatar] = useState('618808b0272a0338bcef2a09');
    const [username, setUsername] = useState('');
    const getAvatar = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${userID}/comment-info`);
        if (response.ok) {
            const { avatar, username } = await response.json();
            setAvatar(avatar);
            setUsername(username);
        }
    }, [userID]);

    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) {
            return 'active';
        }
        return '';
    }

    const handleLikeClick = async () => {
        await fetch(`${HOST_ADDRESS}/whats-the-melody/${WTMID}/comments/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                commentID: id,
            }),
        });
        socket.emit('whats-the-melody-comment-like');
    }

    useEffect(() => {
        getAvatar();
    }, [getAvatar]);

    return ( 
        <li className="WTMC__item">
            <div className="WTMC__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})` }}/>
            <div className="WTMC__commentContent">
                <div className="WTMC__commentInfo">
                    <Link to={`/users/${userID}`} className="WTMC__nick">{username}</Link>
                    <p className="WTMC__date">{date}</p>
                </div>
                <p className="text WTMC__text">{text}</p>
                <div className="WTMC__like">
                    <p className="WTMC__likeAmount">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`WTMC__likeIcon ${isActive()}`} onClick={handleLikeClick}/>
                </div>
            </div>
        </li>
     );
}
 
export default SingleWTMComment;