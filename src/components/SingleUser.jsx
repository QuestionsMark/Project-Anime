import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@material-ui/core';
import FavoriteRounded from '@material-ui/icons/FavoriteRounded';
import GradeRounded from '@material-ui/icons/GradeRounded';

import Achievement from './Achievement';

import { HOST_ADDRESS } from '../config';

const SingleUser = ({place, user}) => {

    const {username, id, background, avatar, likes, favoriteType, favoriteAnime, achievements, introduction, WTMPoints} = user;

    const achievementsList = () => achievements.map(a => <Achievement key={a.id} achievement={a}/>);

    const favoriteAnimeList = () => {
        return favoriteAnime
            .slice(0, 7)
            .map(a => (
                <Link to={`/anime/${a.id}`} className="userList__favorite-anime-item" key={a.id} style={{backgroundImage: `url(${HOST_ADDRESS}/images/${a.image})`}}/>
            ));
    };
    
    return ( 
        <li className="userList__item" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${background})`}}>
            {/* <div className="userList__background" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${background})`, backgroundPosition: "center", backgroundSize: "cover"}}></div>
            <div className="userList__curtain"></div>
            <div className="userList__place">
                {place <= 3 ? <Icon className="fas fa-trophy userList__placeIcon" /> : <p className="userList__placeValue">{place}</p>}
            </div>
            <div className="userList__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${avatar}`} alt="avatar" className="img" />
            </div>
            <Link to={`/users/${id}`} className="userList__link">{username}</Link>
            <div className="userList__likes">
                <FavoriteBorderRoundedIcon className="userList__likeIcon" />
                <p className="userList__likesValue">{likes.length}</p>
            </div>
            <div className="userList__favoriteAnime">
                <div className="userList__imgWrapper userList__imgWrapper--favAnime">
                    {user.favoriteAnime.image.id ? <img src={`${HOST_ADDRESS}/images/${user.favoriteAnime.image.id}`} alt="anime" className="img" /> : null}
                </div>
                <span className="userList__favoriteAnimeTitle">{user.favoriteAnime.title}</span>
            </div>
            <p className="userList__favoriteType">{favoriteType}</p>
            <div className="userList__achievements">
                {achievementList()}
            </div> */}
            <div className="userList__curtain"/>
            <header className="userList__header">
                <div className="userList__avatar" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})`}}/>
                <div className="userList__introduction">
                    <Link to={`/users/${id}`} className="userList__username">{username}</Link>
                    <p className="userList__description">{introduction.description}</p>
                </div>
                <div className="userList__specifications">
                    <div className="userList__specification">
                        <Icon className="fas fa-trophy userList__specification-icon"/>
                        <p className="userList__value">{place}</p>
                    </div>
                    <div className="userList__specification">
                        <FavoriteRounded className="userList__specification-icon"/>
                        <p className="userList__value">{likes.length}</p>
                    </div>
                    <div className="userList__specification">
                        <GradeRounded className="userList__specification-icon"/>
                        <p className="userList__value">{WTMPoints}</p>
                    </div>
                    <div className="userList__specification userList__specification--type">
                        {favoriteType ? favoriteType : 'Brak'}
                    </div>
                </div>
            </header>
            <section className="userList__lists">
                <div className="userList__statistic-list">
                    <h2 className="userList__subtitle">Osiągnięcia: </h2>
                    <ul className="userList__acievements-list">
                        {achievements.length > 0  ? achievementsList() : 'Brak osiągnięć.'}
                    </ul>
                </div>
                <div className="userList__statistic-list">
                    <h2 className="userList__subtitle">Ulubione Anime: </h2>
                    <ul className="userList__favorite-anime-list">
                        {favoriteAnimeList()}
                    </ul>
                </div>
            </section>
        </li>
     );
}
 
export default SingleUser;