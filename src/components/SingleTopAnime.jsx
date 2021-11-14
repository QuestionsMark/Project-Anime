import React from 'react';
import { Link } from 'react-router-dom';

import { useLoginPopup } from '../contexts/LoginPopup';
import { useUser } from '../contexts/UserProvider';

import { Button, Icon } from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import { HOST_ADDRESS } from '../config';

const SingleTopAnime = ({ place, anime, rate }) => {

    const { id, title, types } = anime;

    const { setOpenLoginScreen } = useLoginPopup();
    const [status,,,,user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        const data = await response.json();
        setUser(data);
    };

    const checkActive = (type) => {
        if (JSON.stringify(user) !== "{}") {
            if (type === "favorite") {
                if (user.favoriteAnime.id === id) return "active";
            } else if (type === "watched") {
                const index = user.userAnimeData.watched.findIndex(w => w.id === id);
                if (index !== -1) return "active";
            } else if (type === "stopped") {
                const index = user.userAnimeData.stopped.findIndex(w => w.id === id);
                if (index !== -1) return "active";
            } else if (type === "processOfWatching") {
                const index = user.userAnimeData.processOfWatching.findIndex(w => w.id === id);
                if (index !== -1) return "active";
            } else if (type === "planned") {
                const index = user.userAnimeData.planned.findIndex(w => w.id === id);
                if (index !== -1) return "active";
            }
        }
        return '';
    };

    const handleChangeFavoriteAnime = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/profile/favorite-anime`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                }),
            });
            getUser();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleChangeWatched = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/profile/watched`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                }),
            });
            getUser();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleChangeStopped = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/profile/stopped`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                }),
            });
            getUser();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleChangeProcessOfWatching = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/profile/process-of-watching`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                }),
            });
            getUser();
        } else {
            setOpenLoginScreen(true);
        }
    };

    const handleChangePlanned = async () => {
        if (status) {
            await fetch(`${HOST_ADDRESS}/profile/planned`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    animeID: id,
                }),
            });
            getUser();
        } else {
            setOpenLoginScreen(true);
        }
    };
    
    const animeTypes = () => {
        return types.map(t => <Link to={`/types/${t.name}`} key={t.id} className="animeList__type">{t.name}</Link>);
    };

    return ( 
        <li className="animeList__item">
            <p className="animeList__top">{place <= 3 ? <Icon className="fas fa-trophy" /> : place}</p>
            <div className="animeList__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${anime.images.mini.id}`} alt="anime" className="img" />
            </div>
            <div className="animeList__animeContent">
                <Link to={`/anime/${id}`} className="animeList__title">{title}</Link>
                <div className="animeList__types">
                    {animeTypes()}
                </div>
            </div>
            <div className="animeList__rate">
                <StarRateRoundedIcon className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
            <div className="animeList__buttons">
                <Button className={`button animeList__button ${checkActive('favorite')}`} onClick={handleChangeFavoriteAnime}><FavoriteRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Ulubione</span></Button>
                <Button className={`button animeList__button ${checkActive('watched')}`} onClick={handleChangeWatched}><DoneRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Obejrzane</span></Button>
                <Button className={`button animeList__button ${checkActive('stopped')}`} onClick={handleChangeStopped}><AccessAlarmRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button animeList__button ${checkActive('processOfWatching')}`} onClick={handleChangeProcessOfWatching}><VisibilityIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button animeList__button ${checkActive('planned')}`} onClick={handleChangePlanned}><CreateRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Planowane</span></Button>
            </div>
        </li>
     );
}
 
export default SingleTopAnime;