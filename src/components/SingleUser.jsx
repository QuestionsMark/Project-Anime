import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import Achievement from './Achievement';

import { HOST_ADDRESS } from '../config';

const SingleUser = ({place, username, link, background, img, likes, favoriteAnimeTitle, favoriteAnimeImg, favoriteType, achievements}) => {

    const achievementList = achievements.map(a => <Achievement key={a.id} name={a.name} description={a.description} img={a.img}/>);

    return ( 
        <li className="userList__item">
            <div className="userList__background" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${background})`, backgroundPosition: "center", backgroundSize: "cover"}}></div>
            <div className="userList__curtain"></div>
            <div className="userList__place">
                {place <= 3 ? <Icon className="fas fa-trophy userList__placeIcon" /> : <p className="userList__placeValue">{place}</p>}
            </div>
            <div className="userList__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${img}`} alt="avatar" className="img" />
            </div>
            <Link to={`/profile/${link}`} className="userList__link">{username}</Link>
            <div className="userList__likes">
                <FavoriteBorderRoundedIcon className="userList__likeIcon" />
                <p className="userList__likesValue">{likes.length}</p>
            </div>
            <div className="userList__favoriteAnime">
                <div className="userList__imgWrapper userList__imgWrapper--favAnime">
                    {favoriteAnimeImg ? <img src={`${HOST_ADDRESS}/images/${favoriteAnimeImg}`} alt="anime" className="img" /> : null}
                </div>
                <span className="userList__favoriteAnimeTitle">{favoriteAnimeTitle}</span>
            </div>
            <p className="userList__favoriteType">{favoriteType}</p>
            <div className="userList__achievements">
                {achievementList}
            </div>
        </li>
     );
}
 
export default SingleUser;