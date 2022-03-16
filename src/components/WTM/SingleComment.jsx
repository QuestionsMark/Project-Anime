import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { FavoriteBorderRounded } from '@material-ui/icons';

import RemoveComment from '../RemoveComment';

import { useSocket } from '../../contexts/SocketProvider';
import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const SingleComment = ({comment, WTMID}) => {

    const { id, userID, text, likes, date} = comment;

    const socket = useSocket();
    const { user, authorization } = useUser();

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

    const removeCommentComponent = useMemo(() => authorization === '2' || authorization === '3' ? <RemoveComment collection="whats-the-melody" collectionId={WTMID} id={id}/> : null, [WTMID, authorization, id]);

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
                    <FavoriteBorderRounded className={`WTMC__likeIcon ${isActive()}`} onClick={handleLikeClick}/>
                </div>
                {removeCommentComponent}
            </div>
        </li>
     );
}
 
export default SingleComment;