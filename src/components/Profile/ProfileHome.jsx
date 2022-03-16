import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Button } from '@material-ui/core';
import {
    DoneRounded,
    AccessAlarmRounded,
    VisibilityRounded,
    CreateRounded
} from '@material-ui/icons';

import SingleWatchedAnime from './SingleWatchedAnime';
import SingleStatisticAnime from './SingleStatisticAnime';
import SingleFavoriteAnime from './SingleFavoriteAnime';

import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';
import { textHelper } from '../../utils/textHelper';

const ProfileHome = ({profileData, match, getProfileData}) => {

    const watchedList = useRef();
    const stoppedList = useRef();
    const processOfWatchingList = useRef();
    const plannedList = useRef();

    const { username, avatar, createAccountDate, rank, likes, achievements, points, introduction, userAnimeData, favoriteAnime, favoriteType, timeSpent } = profileData;

    const { status } = useUser();

    const [isUserProfileLover, setIsUserProfileLover] = useState(false);

    const handleSlide = (option) => {
        switch (option) {
            case 'watched':
                watchedList.current.classList.toggle('slider');
                break;
            case 'stopped':
                stoppedList.current.classList.toggle('slider');
                break;
            case 'processOfWatching':
                processOfWatchingList.current.classList.toggle('slider');
                break;
            case 'planned':
                plannedList.current.classList.toggle('slider');
                break;
            default:
                return;
        };
        
    };

    const isUserLover = useCallback(() => {
        let isUserLover = false;
        const index = likes.findIndex(l => l === JSON.parse(localStorage.getItem('animark-user-id')));
        if (index !== -1 || match.params.id === JSON.parse(localStorage.getItem('animark-user-id'))) {
            isUserLover = true;
        }
        return isUserLover;
    }, [likes, match]);

    const showRank = () => {
        if (rank === "3") return "Administrator";
        if (rank === "2") return "Moderator";
        return "Użytkownik";
    };

    const getPoints = () => {
        return Object.entries(points).reduce((prev, entry) => prev + entry[1] , 0);
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

    const watchedAnimeList = () => {
        return userAnimeData.watched
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map((a, i) => <SingleWatchedAnime key={a.id} index={i + 1 + '.'} id={a.id} title={a.title} rate={a.rate}/>);
    };

    const statisticAnimeList = (type) => {
        return userAnimeData[type]
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map((a, i) => <SingleStatisticAnime key={a.id} index={i + 1 + '.'} title={a.title} link={a.id}/>);
    };

    const favoriteAnimeList = () => {
        return favoriteAnime.map(a => <SingleFavoriteAnime key={a.id} anime={a}/>);
    };

    useEffect(() => {
        setIsUserProfileLover(isUserLover());
    },[isUserLover, profileData]);

    return ( 
        <div className="profile__content">
            <div className="profile__homeContent">
                <div className="profile__leftSide">
                    <div className="profile__avatar" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})` }}/>
                    <p className="profile__username">{username}</p>
                    <div className="profile__info">
                        <p className="profile__infoBlock">Polubienia: {likes.length}</p>
                        <p className="profile__infoBlock">Osiągnięcia: {achievements.length}</p>
                        <p className="profile__infoBlock">Ulubiony Gatunek: {favoriteType}</p>
                        <p className="profile__infoBlock">Dołączono: {createAccountDate} dni temu</p>
                        <p className="profile__infoBlock">Ranga: {showRank()}</p>
                        <p className="profile__infoBlock">Punkty: {getPoints()}</p>
                    </div>
                    {status && match.params.id !== JSON.parse(localStorage.getItem('animark-user-id')) ? <div className="profile__likeProfile">
                        <Button className="button profile__likeProfileButton" onClick={handleLikeProfile}>{isUserProfileLover ? 'Usuń polubienie' : 'Polub profil'}</Button>
                    </div> : null}
                </div>
                <div className="profile__rightSide">
                    <div className="profile__intro">
                        <h3 className="profile__introTitle mediumTitle">{introduction.title}</h3>
                        <div className="profile__introText">{textHelper(introduction.description)}</div>
                    </div>
                    <div className="profile__statistics">
                        <h3 className="profile__statisticsTitle mediumTitle">Statystyki Anime</h3>
                        <div className="profile__statisticsContainer">
                            <div className="profile__statistic">
                                <h3 className="profile__subtitle">Łączny czas oglądania: {timeSpent}</h3>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={() => handleSlide('watched')}><DoneRounded className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Obejrzane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.watched.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList" ref={watchedList}>
                                    {watchedAnimeList().length > 0 ? watchedAnimeList() : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={() => handleSlide('stopped')}><AccessAlarmRounded className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Wstrzymane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.stopped.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList" ref={stoppedList}>
                                    {statisticAnimeList("stopped").length > 0 ? statisticAnimeList("stopped") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={() => handleSlide('processOfWatching')}><VisibilityRounded className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">W trakcie oglądania:</p>
                                    <p className="profile__statisticValue">{userAnimeData.processOfWatching.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList" ref={processOfWatchingList}>
                                    {statisticAnimeList("processOfWatching").length > 0 ? statisticAnimeList("processOfWatching") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                            <div className="profile__statistic">
                                <div className="profile__statisticInfo">
                                    <Button className="button profile__button" onClick={() => handleSlide('planned')}><CreateRounded className="profile__statisticsIcon"/></Button>
                                    <p className="profile__statisticTitle">Planowane:</p>
                                    <p className="profile__statisticValue">{userAnimeData.planned.length}</p>
                                </div>
                                <ul className="profile__statisticAnimeList" ref={plannedList}>
                                    {statisticAnimeList("planned").length > 0 ? statisticAnimeList("planned") : <p className="profile__emptyList">Lista jest pusta</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="profile__favorite-anime">
                        <h3 className="profile__favorite-anime-title mediumTitle">Ulubione Anime</h3>
                        {favoriteAnime.length > 0 ? <div className="profile__favorite-anime-Flex">
                            <ul className="profile__favorite-anime-list">
                                {favoriteAnimeList()}
                            </ul>
                        </div> : <div className="profile__favorite-anime-Flex">
                            <p className="profile__noFavorite">Brak ulubionego anime</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileHome;