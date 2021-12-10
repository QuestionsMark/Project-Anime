import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useUser } from '../contexts/UserProvider';

import { Button } from '@material-ui/core';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import { HOST_ADDRESS } from '../config';

const UserRate = ({animeData, getAnime}) => {

    const { user, setUser } = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [userRate, setUserRate] = useState(0);
    const handleUserRateChange = async e => {
        const rate = e.target.getAttribute('data-id') * 1;
        await fetch(`${HOST_ADDRESS}/anime/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
                rate,
            }),
        });
        getUser();
        getAnime();
    };

    const handleMouseEnter = (e) => {
        const index = e.target.getAttribute('data-id');
        const stars = [...e.target.parentElement.children];
        stars.forEach((s, i) => {
            if (i + 1 <= index) {
                s.style.color = "#ffb700";
            } else {
                s.style = '';
            }
        })
    };
    const handleMouseLeave = (e) => {
        const index = userRate;
        const stars = [...e.target.parentElement.children];
        stars.forEach((s, i) => {
            if (i + 1 <= index) {
                s.style.color = "#ffb700";
            } else {
                s.style = '';
            }
        })
    };

    const checkActive = (type) => {
        if (JSON.stringify(user) !== "{}") {
            if (type === "favorite") {
                if (user.favoriteAnime.findIndex(a => a.id === animeData.id) !== -1) return "active";
            } else if (type === "watched") {
                const index = user.userAnimeData.watched.findIndex(w => w.id === animeData.id);
                if (index !== -1) return "active";
            } else if (type === "stopped") {
                const index = user.userAnimeData.stopped.findIndex(w => w.id === animeData.id);
                if (index !== -1) return "active";
            } else if (type === "processOfWatching") {
                const index = user.userAnimeData.processOfWatching.findIndex(w => w.id === animeData.id);
                if (index !== -1) return "active";
            } else if (type === "planned") {
                const index = user.userAnimeData.planned.findIndex(w => w.id === animeData.id);
                if (index !== -1) return "active";
            }
        }
        return '';
    };
    
    const starList = () => {
        const stars = [];
        for (let i = 1; i <= userRate; i++) {
            stars.push(<i key={i} className="fas fa-star page__userStar" data-id={i} style={{color: '#ffb700'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(e) => {handleUserRateChange(e)}}/>);
        }
        const emptyStarsAmount = userRate * 1 + 1;
        for (let i = emptyStarsAmount; i <= 10; i++) {
            stars.push(<i key={i} className="far fa-star page__userStar" data-id={i} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(e) => {handleUserRateChange(e)}}/>);
        }
        return stars;
    };

    const handleChangeFavoriteAnime = async () => {
        await fetch(`${HOST_ADDRESS}/profile/favorite-anime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
            }),
        });
        getUser();
        getAnime();
    };

    const handleChangeWatched = async () => {
        await fetch(`${HOST_ADDRESS}/profile/watched`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
            }),
        });
        getUser();
    };

    const handleChangeStopped = async () => {
        await fetch(`${HOST_ADDRESS}/profile/stopped`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
            }),
        });
        getUser();
    };

    const handleChangeProcessOfWatching = async () => {
        await fetch(`${HOST_ADDRESS}/profile/process-of-watching`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
            }),
        });
        getUser();
    };

    const handleChangePlanned = async () => {
        await fetch(`${HOST_ADDRESS}/profile/planned`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                animeID: animeData.id,
            }),
        });
        getUser();
    };

    const setRate = () => {
        const rateIndex = animeData.rate.findIndex(r => r.user === user.id);
        if (rateIndex !== -1) {
            setUserRate(animeData.rate[rateIndex].rate);
        } else {
            setUserRate(0);
        }
    };

    useEffect(() => {
        setRate();
    },[animeData]);

    return ( 
        <div className="page__userPanel">
            <h3 className="page__userTitle">Twoja ocena:</h3>
            <div className="page__userRate">
                {starList()}
            </div>
            <div className="page__buttons">
            <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('favorite')}`} onClick={handleChangeFavoriteAnime}><FavoriteRoundedIcon className="animeList__buttonIcon"/></Button>}>
                    Ulubione
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('watched')}`} onClick={handleChangeWatched}><DoneRoundedIcon className="animeList__buttonIcon"/></Button>}>
                    Obejrzane
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('stopped')}`} onClick={handleChangeStopped}><AccessAlarmRoundedIcon className="animeList__buttonIcon"/></Button>}>
                    Wstrzymane
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('processOfWatching')}`} onClick={handleChangeProcessOfWatching}><VisibilityIcon className="animeList__buttonIcon"/></Button>}>
                    W trakcie oglądania
                </Popup>
                <Popup className="normal-popup" on="hover" position="top center" trigger={<Button className={`button animeList__button ${checkActive('planned')}`} onClick={handleChangePlanned}><CreateRoundedIcon className="animeList__buttonIcon"/></Button>}>
                    Planowane
                </Popup>
            </div>
        </div>
     );
}
 
export default withRouter(UserRate);