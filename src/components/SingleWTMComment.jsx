import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';
import { useWTMComments } from '../contexts/WTMCommentsProvider';

const SingleWTMComment = ({comment}) => {

    const { id, username, link, img, text, likes, date} = comment;

    const [,setWTMComments] = useWTMComments();

    const getComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/comments`);
        const WTMComments = await response.json();
        if (!WTMComments.error) {
            setWTMComments(WTMComments);
        }
    }

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
                getComments();
            })
    }

    return ( 
        <li className="WTMC__item">
            <div className="WTMC__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${img}`} alt="User Avatar" className="img" />
            </div>
            <div className="WTMC__commentContent">
                <div className="WTMC__commentInfo">
                    <Link to={`/profile/${link}`} className="WTMC__nick">{username}</Link>
                    <p className="WTMC__date">{date}</p>
                </div>
                <p className="WTMC__text">{text}</p>
                <div className="WTMC__like">
                    <p className="WTMC__likeAmount">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`WTMC__likeIcon ${isActive()}`} onClick={handleLikeClick}/>
                </div>
            </div>
        </li>
     );
}
 
export default SingleWTMComment;