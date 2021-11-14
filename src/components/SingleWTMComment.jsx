import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';
import { useWTMComments } from '../contexts/WTMCommentsProvider';
import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';

const SingleWTMComment = ({comment}) => {

    const { id, userID, username, img, text, likes, date} = comment;

    const [,,,, user] = useUser();
    const { whatsTheMelody, setWhatsTheMelodyComments } = useData();
    const getWhatsTheMelodyComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/${whatsTheMelody.id}/comments`);
        if (response.ok) {
            const whatsTheMelodyComments = await response.json();
            setWhatsTheMelodyComments(whatsTheMelodyComments);
        }
    };

    const [,setWTMComments] = useWTMComments();

    const getComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/comments`);
        const WTMComments = await response.json();
        if (!WTMComments.error) {
            setWTMComments(WTMComments);
        }
    }

    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) {
            return 'active';
        }
        return '';
    }

    const handleLikeClick = async () => {
        await fetch(`${HOST_ADDRESS}/whats-the-melody/${whatsTheMelody.id}/comments/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                commentID: id,
            }),
        });
        getWhatsTheMelodyComments();
    }

    return ( 
        <li className="WTMC__item">
            <div className="WTMC__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${img}`} alt="User Avatar" className="img" />
            </div>
            <div className="WTMC__commentContent">
                <div className="WTMC__commentInfo">
                    <Link to={`/users/${userID}`} className="WTMC__nick">{username}</Link>
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