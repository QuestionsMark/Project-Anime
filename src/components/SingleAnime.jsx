import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const SingleAnime = ({title, link, img, types, rate, favorite, watched, stopped, processOfWatching, planned}) => {

    const checkActive = (type) => {
        if (type === "favorite") {
            if (favorite.indexOf('1') !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "watched") {
            if (watched.indexOf('1') !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "stopped") {
            if (stopped.indexOf('1') !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "processOfWatching") {
            if (processOfWatching.indexOf('1') !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "planned") {
            if (planned.indexOf('1') !== -1) {
                return "active";
            } else {
                return '';
            }
        }
    }

    const animeTypes = types.map(t => <Link to={t.link} key={t.id} className="animeList__type">{t.name}</Link>)

    return ( 
        <li className="animeList__item">
            <div className="animeList__imgWrapper">
                <img src={img} alt="anime" className="img" />
            </div>
            <div className="animeList__animeContent">
                <Link to={link} className="animeList__title">{title}</Link>
                <div className="animeList__types">
                    {animeTypes}
                </div>
            </div>
            <div className="animeList__rate">
                <StarRateRoundedIcon className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
            <div className="animeList__buttons">
                <Button className={`button animeList__button ${checkActive("favorite")}`}><FavoriteRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Ulubione</span></Button>
                <Button className={`button animeList__button ${checkActive("watched")}`}><DoneRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Obejrzane</span></Button>
                <Button className={`button animeList__button ${checkActive("stopped")}`}><TimerRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button animeList__button ${checkActive("processOfWatching")}`}><VisibilityIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button animeList__button ${checkActive("planned")}`}><CreateRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Planowane</span></Button>
            </div>
        </li>
     );
}
 
export default SingleAnime;