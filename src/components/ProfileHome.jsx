import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SingleWatchedAnimeItem from './SingleWatchedAnimeItem';
import SingleStatisticAnimeItem from './SingleStatisticAnimeItem';

import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';

const ProfileHome = ({data, match, callAPI}) => {

    const { username, avatar, createAccountDate, rank, likes, achievements, points, introduction, userAnimeData, favoriteAnime, favoriteType } = data;

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
    }

    const watchedAnimeList = () => {
        const sorted = userAnimeData.watched.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        return sorted.map((a, i) => <SingleWatchedAnimeItem key={a.id} index={i + 1 + '.'} title={a.title} link={a.link} rate={a.rate}/>);
    }

    const statisticAnimeList = (type) => {
        if (type === "stopped") {
            const sorted = userAnimeData.stopped.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            })
            return sorted.map((a, i) => <SingleStatisticAnimeItem key={a.id} index={i + 1 + '.'} title={a.title} link={a.link}/>);
        } else if (type === "processOfWatching") {
            const sorted = userAnimeData.processOfWatching.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            })
            return sorted.map((a, i) => <SingleStatisticAnimeItem key={a.id} index={i + 1 + '.'} title={a.title} link={a.link}/>);
        } else if (type === "planned") {
            const sorted = userAnimeData.planned.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            })
            return sorted.map((a, i) => <SingleStatisticAnimeItem key={a.id} index={i + 1 + '.'} title={a.title} link={a.link}/>);
        }
    }

    const isUserLover = () => {
        const link = match.params.userLink;
        let isUserLover = false;
        const index = likes.findIndex(l => l === localStorage.getItem('UID'));
        if (index !== -1 || link === localStorage.getItem('l')) {
            isUserLover = true;
        }
        return isUserLover;
    }

    const showRank = () => {
        let string;
        if (rank === "3") {
            string = "Administrator"
        } else if (rank === "2") {
            string = "Moderator"
        } else {
            string = "Użytkownik"
        }
        return string;
    }

    const handleLikeProfile = () => {
        fetch('http://localhost:9000/profile/change/like', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                profile: match.params.userLink
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                callAPI();
            })
    }

    useEffect(() => {
        setIsUserProfileLover(isUserLover())
    },[data])

    return ( 
        <div className="profile__content">
            <div className="profile__homeContent">
                <div className="profile__leftSide">
                    <div className="profile__imgWrapper">
                        <img src={`http://localhost:9000/images/${avatar}`} alt="" className="img" />
                    </div>
                    <p className="profile__username">{username}</p>
                    <div className="profile__info">
                        <p className="profile__infoBlock">Polubienia: {likes.length}</p>
                        <p className="profile__infoBlock">Osiągnięcia: {achievements.length}</p>
                        <p className="profile__infoBlock">Ulubiony Gatunek: {favoriteType}</p>
                        <p className="profile__infoBlock">Dołączono: {createAccountDate}</p>
                        <p className="profile__infoBlock">Ranga: {showRank()}</p>
                        <p className="profile__infoBlock">Punkty: {points}</p>
                    </div>
                    {match.params.userLink === localStorage.getItem('l') ? null : <div className="profile__likeProfile">
                        <Button className="button profile__likeProfileButton" onClick={handleLikeProfile}>{isUserLover() ? 'Usuń polubienie' : 'Polub profil'}</Button>
                    </div>}
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
                        {favoriteAnime.title ? <div className="profile__FAFlex">
                            <div className="profile__FAImgWrapper">
                                <img src={`http://localhost:9000/images/${favoriteAnime.img.img}`} alt="favAnime" className="img" />
                            </div>
                            <Link to={`/pages/${favoriteAnime.link}`} className="profile__FALink">{favoriteAnime.title}</Link>
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