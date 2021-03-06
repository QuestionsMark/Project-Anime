import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { Button, Icon } from '@material-ui/core';
import {
    StarRateRounded,
    FavoriteRounded,
    DoneRounded,
    AccessAlarmRounded,
    Visibility,
    CreateRounded,
    MovieCreationOutlined
} from '@material-ui/icons';

import { useLoginPopup } from '../../contexts/LoginPopup';
import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const SingleAnime = ({ place, anime, rate, refference }) => {

    const { id, title, types, kind, mini } = anime;

    const { setOpenLoginScreen } = useLoginPopup();
    const { status, user, setUser } = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        const data = await response.json();
        setUser(data);
    };

    const checkActive = (type) => {
        if (JSON.stringify(user) !== "{}") {
            if (type === "favorite") {
                if (user.favoriteAnime.findIndex(a => a.id === id) !== -1) return "active";
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
        return types.map(t => <Link to={`/types/${t.name}`} key={t.id} className={`animeList__type ${JSON.stringify(user) !== "{}" ? `${user.favoriteType === t.name ? 'animeList__type--fav' : ''}` : ''}`}>{t.name}</Link>);
    };

    return ( 
        <li className="animeList__item" ref={refference ? refference : null}>
            <p className="animeList__top">{place <= 3 ? <Icon className="fas fa-trophy" /> : place}</p>
            <div className="animeList__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${mini})` }}/>
            <div className="animeList__animeContent">
                <Link to={`/anime/${id}`} className="animeList__title">{title} {kind === 'series' ? <Icon className="fas fa-film animeList__kind-icon animeList__kind-icon--awesome" /> : <MovieCreationOutlined className="animeList__kind-icon animeList__kind-icon--material" /> }</Link>
                <div className="animeList__types">
                    {animeTypes()}
                </div>
            </div>
            <div className="animeList__rate">
                <StarRateRounded className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
            <div className="animeList__buttons">
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('favorite')}`} onClick={handleChangeFavoriteAnime}><FavoriteRounded className="animeList__buttonIcon"/></Button>}>
                    Ulubione
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('watched')}`} onClick={handleChangeWatched}><DoneRounded className="animeList__buttonIcon"/></Button>}>
                    Obejrzane
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('stopped')}`} onClick={handleChangeStopped}><AccessAlarmRounded className="animeList__buttonIcon"/></Button>}>
                    Wstrzymane
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('processOfWatching')}`} onClick={handleChangeProcessOfWatching}><Visibility className="animeList__buttonIcon"/></Button>}>
                    W trakcie ogl??dania
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('planned')}`} onClick={handleChangePlanned}><CreateRounded className="animeList__buttonIcon"/></Button>}>
                    Planowane
                </Popup>
            </div>
        </li>
     );
}
 
export default SingleAnime;