import { Button } from '@material-ui/core';
import React from 'react';

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import { useState } from 'react';

const UserRate = ({favorite = ["1"], watched = [], stopped = [], processOfWatching = [], planned = []}) => {

    const [userRate, setUserRate] = useState(6);

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
    }
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
    }

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
    
    const starList = (rateValue = userRate) => {
        const stars = [];
        for (let i = 1; i <= rateValue; i++) {
            stars.push(<i key={i} className="fas fa-star page__userStar" data-id={i} style={{color: '#ffb700'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setUserRate(i)}}/>);
        }
        const emptyStarsAmount = rateValue * 1 + 1;
        for (let i = emptyStarsAmount; i <= 10; i++) {
            stars.push(<i key={i} className="far fa-star page__userStar" data-id={i} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setUserRate(i)}}/>);
        }
        return stars;
    }

    return ( 
        <div className="page__userPanel">
            <h3 className="page__userTitle">Twoja ocena:</h3>
            <div className="page__userRate">
                {starList()}
            </div>
            <div className="page__userOptions">
                <Button className={`button page__button ${checkActive("favorite")}`}><FavoriteRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Ulubione</span></Button>
                <Button className={`button page__button ${checkActive("watched")}`}><DoneRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Obejrzane</span></Button>
                <Button className={`button page__button ${checkActive("stopped")}`}><AccessAlarmRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button page__button ${checkActive("processOfWatching")}`}><VisibilityIcon className="page__statisticsIcon"/><span className="page__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button page__button ${checkActive("planned")}`}><CreateRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Planowane</span></Button>
            </div>
        </div>
     );
}
 
export default UserRate;