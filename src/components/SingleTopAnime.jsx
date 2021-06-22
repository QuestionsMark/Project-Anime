import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Icon } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const SingleTopAnime = ({title, link, place, img, types, rate, user, callAPI}) => {

    const [userData, setUserData] = useState({
        favoriteAnime: {
            link: '',
        },
        userAnimeData: {
            watched: [
                {
                    link: '',
                }
            ],
            stopped: [
                {
                    link: '',
                }
            ],
            processOfWatching: [
                {
                    link: '',
                }
            ],
            planned: [
                {
                    link: '',
                }
            ],
        }
    });

    const checkActive = (type) => {
        if (type === "favorite") {
            if (userData.favoriteAnime.link === link) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "watched") {
            const watched = userData.userAnimeData.watched;
            const index = watched.findIndex(w => w.link === link);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "stopped") {
            const stopped = userData.userAnimeData.stopped;
            const index = stopped.findIndex(w => w.link === link);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "processOfWatching") {
            const processOfWatching = userData.userAnimeData.processOfWatching;
            const index = processOfWatching.findIndex(w => w.link === link);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "planned") {
            const planned = userData.userAnimeData.planned;
            const index = planned.findIndex(w => w.link === link);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        }
    }

    const handleAnimeStatusChange = (type, title, e) => {
        let target = e.target;
        if (target.localName === 'path') {
            target = target.parentElement;
        }
        if (type === 'favAnime') {
            fetch('http://localhost:9000/profile/change/favorite-anime', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: title
                })
            })
                .then(res => res.json())
                .then(() => {
                    callAPI();
                });
        } else if (type === 'watched') {
            fetch('http://localhost:9000/profile/change/watched', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: title
                })
            })
                .then(res => res.json())
                .then(() => {
                    callAPI();
                });
        }
        else if (type === 'stopped') {
            fetch('http://localhost:9000/profile/change/stopped', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: title
                })
            })
                .then(res => res.json())
                .then(() => {
                    callAPI();
                });
        }
        else if (type === 'processOfWatching') {
            fetch('http://localhost:9000/profile/change/process-of-watching', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: title
                })
            })
                .then(res => res.json())
                .then(() => {
                    callAPI();
                });
        }
        else if (type === 'planned') {
            fetch('http://localhost:9000/profile/change/planned', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: title
                })
            })
                .then(res => res.json())
                .then(() => {
                    callAPI();
                });
        }
    }
    

    const animeTypes = types.map(t => <Link to={`/types/${t.link}`} key={t.id} className="animeList__type">{t.name}</Link>);

    useEffect(() => {
        setUserData(user)
    },[user])

    return ( 
        <li className="animeList__item">
            <p className="animeList__top">{place <= 3 ? <Icon className="fas fa-trophy" /> : place}</p>
            <div className="animeList__imgWrapper">
                <img src={img ? `http://localhost:9000/images/${img}` : ''} alt="anime" className="img" />
            </div>
            <div className="animeList__animeContent">
                <Link to={`/pages/${link}`} className="animeList__title">{title}</Link>
                <div className="animeList__types">
                    {animeTypes}
                </div>
            </div>
            <div className="animeList__rate">
                <StarRateRoundedIcon className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
            <div className="animeList__buttons">
                <Button className={`button animeList__button ${checkActive("favorite")}`} onClick={(e) => {handleAnimeStatusChange('favAnime', title, e)}}><FavoriteRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Ulubione</span></Button>
                <Button className={`button animeList__button ${checkActive("watched")}`} onClick={(e) => {handleAnimeStatusChange('watched', title, e)}}><DoneRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Obejrzane</span></Button>
                <Button className={`button animeList__button ${checkActive("stopped")}`} onClick={(e) => {handleAnimeStatusChange('stopped', title, e)}}><AccessAlarmRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button animeList__button ${checkActive("processOfWatching")}`} onClick={(e) => {handleAnimeStatusChange('processOfWatching', title, e)}}><VisibilityIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button animeList__button ${checkActive("planned")}`} onClick={(e) => {handleAnimeStatusChange('planned', title, e)}}><CreateRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Planowane</span></Button>
            </div>
        </li>
     );
}
 
export default SingleTopAnime;