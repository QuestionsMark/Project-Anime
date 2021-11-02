import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const SingleWTMComment = ({id, nick, img, message, likes, link, date, callAPI}) => {
    const isActive = () => {
        if (likes.findIndex(l => l === localStorage.getItem('UID')) !== -1) {
            return 'active';
        }
        return '';
    }

    const handleLikeClick = (e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement;
        }
        fetch(`${HOST_ADDRESS}/wtm/comment-like`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                id
            })
        })
            .then(res => res.json())
            .then(() => {
                callAPI();
            })
    }

    return ( 
        <li className="WTMC__item">
            <div className="WTMC__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${img}`} alt="User Avatar" className="img" />
            </div>
            <div className="WTMC__commentContent">
                <div className="WTMC__commentInfo">
                    <Link to={`/profile/${link}`} className="WTMC__nick">{nick}</Link>
                    <p className="WTMC__date">{date}</p>
                </div>
                <p className="WTMC__text">{message}</p>
                <div className="WTMC__like">
                    <p className="WTMC__likeAmount">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`WTMC__likeIcon ${isActive()}`} onClick={handleLikeClick}/>
                </div>
            </div>
        </li>
     );
}
 
export default SingleWTMComment;