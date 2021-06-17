import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Icon } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const SingleTopAnime = ({title, link, place, img, types, rate, favorite, watched, stopped, processOfWatching, planned}) => {

    const checkActive = (type) => {
        if (type === "favorite") {
            return '';
            // if (favorite.indexOf('1') !== -1) {
            //     return "active";
            // } else {
            //     return '';
            // }
        } else if (type === "watched") {
            return '';
            // if (watched.indexOf('1') !== -1) {
            //     return "active";
            // } else {
            //     return '';
            // }
        } else if (type === "stopped") {
            return '';
            // if (stopped.indexOf('1') !== -1) {
            //     return "active";
            // } else {
            //     return '';
            // }
        } else if (type === "processOfWatching") {
            return '';
            // if (processOfWatching.indexOf('1') !== -1) {
            //     return "active";
            // } else {
            //     return '';
            // }
        } else if (type === "planned") {
            return '';
            // if (planned.indexOf('1') !== -1) {
            //     return "active";
            // } else {
            //     return '';
            // }
        }
    }

    const animeTypes = types.map(t => <Link to={`/types/${t.link}`} key={t.id} className="animeList__type">{t.name}</Link>)

    return ( 
        <li className="animeList__item">
            <p className="animeList__top">{place <= 3 ? <Icon className="fas fa-trophy" /> : place}</p>
            <div className="animeList__imgWrapper">
                <img src={`http://localhost:9000/images/${img}`} alt="anime" className="img" />
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
                <Button className={`button animeList__button ${checkActive("favorite")}`}><FavoriteRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Ulubione</span></Button>
                <Button className={`button animeList__button ${checkActive("watched")}`}><DoneRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Obejrzane</span></Button>
                <Button className={`button animeList__button ${checkActive("stopped")}`}><AccessAlarmRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button animeList__button ${checkActive("processOfWatching")}`}><VisibilityIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button animeList__button ${checkActive("planned")}`}><CreateRoundedIcon className="animeList__buttonIcon"/><span className="animeList__buttonDescription">Planowane</span></Button>
            </div>
        </li>
     );
}
 
export default SingleTopAnime;