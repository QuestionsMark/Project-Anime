import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import { HOST_ADDRESS } from '../config';

const SingleAnime = ({anime, rate}) => {

    const { id, title, types } = anime;

    const [status,,,, user, setUser] = useUser();
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
    }

    const handleSetFavoriteAnime = async () => {
        if (status) {
            const response = await fetch(`${HOST_ADDRESS}/profile/change/favorite-anime`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: user.id,
                    anime: title
                }),
            });
            if (response.ok) {
                getUser();
            }
        } else {
            // popup z logowaniem
            console.log('Zaloguj się!');
        }
    };
    const handleSetWatched = async () => {
        if (status) {
            const response = await fetch(`${HOST_ADDRESS}/profile/change/watched`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: user.id,
                    anime: title
                }),
            });
            if (response.ok) {
                getUser();
            }
        } else {
            console.log('Zaloguj się!');
        }
    };
    const handleSetStopped = async () => {
        if (status) {
            const response = await fetch(`${HOST_ADDRESS}/profile/change/stopped`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: user.id,
                    anime: title
                }),
            });
            if (response.ok) {
                getUser();
            }
        } else {
            console.log('Zaloguj się!');
        }
    };
    const handleSetProcessOfWatching = async () => {
        if (status) {
            const response = await fetch(`${HOST_ADDRESS}/profile/change/process-of-watching`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: user.id,
                    anime: title
                }),
            });
            if (response.ok) {
                getUser();
            }
        } else {
            console.log('Zaloguj się!');
        }
    };
    const handleSetPlanned = async () => {
        if (status) {
            const response = await fetch(`${HOST_ADDRESS}/profile/change/planned`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: user.id,
                    anime: title
                }),
            });
            if (response.ok) {
                getUser();
            }
        } else {
            console.log('Zaloguj się!');
        }
    };

    const animeTypes = () => {
        return types.map(t => <Link to={`/types/${t.link}`} key={t.id} className="animeList__type">{t.name}</Link>);
    };

    return ( 
        <li className="animeList__item">
            <div className="animeList__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${anime.images.mini.id}`} alt="anime" className="img" />
            </div>
            <div className="animeList__animeContent">
                <Link to={`/pages/${id}`} className="animeList__title">{title}</Link>
                <div className="animeList__types">
                    {animeTypes()}
                </div>
            </div>
            <div className="animeList__rate">
                <StarRateRoundedIcon className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
            <div className="animeList__buttons">
                <Button className={`button animeList__button ${checkActive('favorite')}`} onClick={handleSetFavoriteAnime}><FavoriteRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Ulubione</span></Button>
                <Button className={`button animeList__button ${checkActive('watched')}`} onClick={handleSetWatched}><DoneRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Obejrzane</span></Button>
                <Button className={`button animeList__button ${checkActive('stopped')}`} onClick={handleSetStopped}><AccessAlarmRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button animeList__button ${checkActive('processOfWatching')}`} onClick={handleSetProcessOfWatching}><VisibilityIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button animeList__button ${checkActive('planned')}`} onClick={handleSetPlanned}><CreateRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Planowane</span></Button>
            </div>
        </li>
     );
}
 
export default SingleAnime;