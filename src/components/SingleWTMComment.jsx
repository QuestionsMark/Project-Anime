import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const SingleWTMComment = ({nick, img, message, likes, link, date}) => {

    const isUserLikes = () => {
        if (likes.indexOf('1') !== -1) {
            return "active";
        } else {
            return "";
        }
    }

    return ( 
        <li className="WTMC__item">
            <div className="WTMC__imgWrapper">
                <img src={img} alt="User Avatar" className="img" />
            </div>
            <div className="WTMC__commentContent">
                <div className="WTMC__commentInfo">
                    <Link to={link} className="WTMC__nick">{nick}</Link>
                    <p className="WTMC__date">{date}</p>
                </div>
                <p className="WTMC__text">{message}</p>
                <div className="WTMC__like">
                    <p className="WTMC__likeAmount">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`WTMC__likeIcon ${isUserLikes()}`}/>
                </div>
            </div>
        </li>
     );
}
 
export default SingleWTMComment;