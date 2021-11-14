import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import SingleWatchedAnimeItem from './SingleWatchedAnimeItem';
import SingleStatisticAnimeItem from './SingleStatisticAnimeItem';

import { HOST_ADDRESS } from '../config';

const ProfileHome = ({profileData, match, getProfileData}) => {

    const { username, avatar, createAccountDate, rank, likes, achievements, WTMPoints, introduction, userAnimeData, favoriteAnime, favoriteType } = profileData;

    const [status] = useUser();

    const [isUserProfileLover, setIsUserProfileLover] = useState(false);

    const handleSlide = (e) => {
        let target = e.target;
        if (target.localName === "span") {
            target = target.parentElement;
        } else if (target.localName === "svg") {
            target = target.parentElement.parentElement;
        } else if (target.localName === "path") {
            target = target.parentElement.parentElement.parentElement;
        }
        target.parentElement.nextSibling.classList.toggle('slider');
    };

    const watchedAnimeList = () => {
        return userAnimeData.watched
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map((a, i) => <SingleWatchedAnimeItem key={a.id} index={i + 1 + '.'} id={a.id} title={a.title} rate={a.rate}/>);
    }

    const statisticAnimeList = (type) => {
        return userAnimeData[type]
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map((a, i) => <SingleStatisticAnimeItem key={a.id} index={i + 1 + '.'} title={a.title} link={a.id}/>);
    };

    const isUserLover = () => {
        let isUserLover = false;
        const index = likes.findIndex(l => l === JSON.parse(localStorage.getItem('animark-user-id')));
        if (index !== -1 || match.params.id === JSON.parse(localStorage.getItem('animark-user-id'))) {
            isUserLover = true;
        }
        return isUserLover;
    };

    const showRank = () => {
        if (rank === "3") return "Administrator";
        if (rank === "2") return "Moderator";
        return "Użytkownik";
    };

    const handleLikeProfile = async () => {
        await fetch(`${HOST_ADDRESS}/profile/like`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                user: JSON.parse(localStorage.getItem('animark-user-id')),
                profile: match.params.id
            }),
        });
        getProfileData();
    };

    useEffect(() => {
        setIsUserProfileLover(isUserLover())
    },[profileData]);

    return ( 
        <div className="profile__content">
            <div className="profile__homeContent">
                <div className="profile__leftSide">
                    <div className="profile__imgWrapper">
                        <img src={`${HOST_ADDRESS}/images/${avatar}`} alt="" className="img" />
                    </div>
                    <p className="profile__username">{username}</p>
                    <div className="profile__info">
                        <p className="profile__infoBlock">Polubienia: {likes.length}</p>
                        <p className="profile__infoBlock">Osiągnięcia: {achievements.length}</p>
                        <p className="profile__infoBlock">Ulubiony Gatunek: {favoriteType}</p>
                        <p className="profile__infoBlock">Dołączono: {createAccountDate}</p>
                        <p className="profile__infoBlock">Ranga: {showRank()}</p>
                        <p className="profile__infoBlock">Punkty: {WTMPoints}</p>
                    </div>
                    {status && match.params.id !== JSON.parse(localStorage.getItem('animark-user-id')) ? <div className="profile__likeProfile">
                        <Button className="button profile__likeProfileButton" onClick={handleLikeProfile}>{isUserProfileLover ? 'Usuń polubienie' : 'Polub profil'}</Button>
                    </div> : null}
                </div>
                <div className="profile__rightSide">
                    <div className="profile__intro">
                        <h3 className="profile__introTitle mediumTitle">{introduction.title}</h3>
                        <p className="profile__introText">{introduction.description}</p>
                    </div>
                    <div className="profile__statistics">
                        <h3 className="profile__statisticsTitle mediumTitle">Statystyki Anime:</h3>
                        <div className="profile__statisticsContainer">
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={handleSlide}><DoneRoundedIcon className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Obejrzane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.watched.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList">
                                    {watchedAnimeList().length > 0 ? watchedAnimeList() : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={handleSlide}><AccessAlarmRoundedIcon className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Wstrzymane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.stopped.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList">
                                    {statisticAnimeList("stopped").length > 0 ? statisticAnimeList("stopped") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={handleSlide}><VisibilityRoundedIcon className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">W trakcie oglądania:</p>
                                    <p className="profile__statisticValue">{userAnimeData.processOfWatching.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList">
                                    {statisticAnimeList("processOfWatching").length > 0 ? statisticAnimeList("processOfWatching") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={handleSlide}><CreateRoundedIcon className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Planowane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.planned.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList">
                                    {statisticAnimeList("planned").length > 0 ? statisticAnimeList("planned") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="profile__favoriteAnime">
                        <h3 className="prifile__FATitle mediumTitle">Ulubione Anime</h3>
                        {favoriteAnime.id ? <div className="profile__FAFlex">
                            <div className="profile__FAImgWrapper">
                                <img src={`${HOST_ADDRESS}/images/${favoriteAnime.image.id}`} alt="favAnime" className="img" />
                            </div>
                            <Link to={`/anime/${favoriteAnime.id}`} className="profile__FALink">{favoriteAnime.title}</Link>
                            <div className="profile__FARate">
                                <StarRateRoundedIcon className="profile__FARateIcon"/>
                                <p className="profile__FARateValue">{favoriteAnime.rate}</p>
                            </div>
                        </div> : <div className="profile__FAFlex">
                            <p className="profile__noFavorite">Brak ulubionego anime</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileHome;