import React from 'react';
import { Link } from 'react-router-dom';

import Achievement from './Achievement';

import { Icon } from '@material-ui/core';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const SingleUser = ({place, username, link, backgroundTheme, img, likes, favoriteAnimeTitle, favoriteAnimeImg, favoriteType, achievements}) => {

    const achievementList = achievements.map(a => <Achievement key={a.id} name={a.name} description={a.description} img={a.img}/>);

    return ( 
        <li className="userList__item">
            <div className="userList__background" style={{backgroundImage: `url(${backgroundTheme})`, backgroundPosition: "center", backgroundSize: "cover"}}></div>
            <div className="userList__curtain"></div>
            <div className="userList__place">
                {place <= 3 ? <Icon className="fas fa-trophy userList__placeIcon" /> : <p className="userList__placeValue">{place}</p>}
            </div>
            <div className="userList__imgWrapper">
                <img src={img} alt="avatar" className="img" />
            </div>
            <Link to={link} className="userList__link">{username}</Link>
            <div className="userList__likes">
                <FavoriteBorderRoundedIcon className="userList__likeIcon" />
                <p className="userList__likesValue">{likes}</p>
            </div>
            <div className="userList__favoriteAnime">
                <div className="userList__imgWrapper userList__imgWrapper--favAnime">
                    <img src={favoriteAnimeImg} alt="anime" className="img" />
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