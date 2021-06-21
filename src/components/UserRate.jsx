import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const UserRate = ({animeData, userData, callAPI, match}) => {

    const [userRate, setUserRate] = useState(animeData.rate.find(r => r.user === localStorage.getItem('UID')) ? animeData.rate.find(r => r.user === localStorage.getItem('UID')).rate : 0);
    const handleUserRateChange = (e) => {
        const rateValue = e.target.getAttribute('data-id') * 1;
        fetch('http://localhost:9000/pages/change/rate', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                anime: match.params.anime,
                rateValue
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.response);
                callAPI();
            })
    }

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
            if (userData.favoriteAnime.link === match.params.anime) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "watched") {
            const watched = userData.userAnimeData.watched;
            const index = watched.findIndex(w => w.link === match.params.anime);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "stopped") {
            const stopped = userData.userAnimeData.stopped;
            const index = stopped.findIndex(w => w.link === match.params.anime);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "processOfWatching") {
            const processOfWatching = userData.userAnimeData.processOfWatching;
            const index = processOfWatching.findIndex(w => w.link === match.params.anime);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        } else if (type === "planned") {
            const planned = userData.userAnimeData.planned;
            const index = planned.findIndex(w => w.link === match.params.anime);
            if (index !== -1) {
                return "active";
            } else {
                return '';
            }
        }
    }
    
    const starList = (rateValue = userRate) => {
        const stars = [];
        for (let i = 1; i <= rateValue; i++) {
            stars.push(<i key={i} className="fas fa-star page__userStar" data-id={i} style={{color: '#ffb700'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(e) => {handleUserRateChange(e)}}/>);
        }
        const emptyStarsAmount = rateValue * 1 + 1;
        for (let i = emptyStarsAmount; i <= 10; i++) {
            stars.push(<i key={i} className="far fa-star page__userStar" data-id={i} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(e) => {handleUserRateChange(e)}}/>);
        }
        return stars;
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
                .then(res => {
                    console.log(res);
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
                .then(res => {
                    console.log(res);
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
                .then(res => {
                    console.log(res);
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
                .then(res => {
                    console.log(res);
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
                .then(res => {
                    console.log(res);
                    callAPI();
                });
        }
    }

    useEffect(() => {
        setUserRate(animeData.rate.find(r => r.user === localStorage.getItem('UID')) ? animeData.rate.find(r => r.user === localStorage.getItem('UID')).rate : 0);
    },[animeData])

    return ( 
        <div className="page__userPanel">
            <h3 className="page__userTitle">Twoja ocena:</h3>
            <div className="page__userRate">
                {starList()}
            </div>
            <div className="page__userOptions">
                <Button className={`button page__button ${checkActive("favorite")}`} onClick={(e) => {handleAnimeStatusChange('favAnime', animeData.title, e)}}><FavoriteRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Ulubione</span></Button>
                <Button className={`button page__button ${checkActive("watched")}`} onClick={(e) => {handleAnimeStatusChange('watched', animeData.title, e)}}><DoneRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Obejrzane</span></Button>
                <Button className={`button page__button ${checkActive("stopped")}`} onClick={(e) => {handleAnimeStatusChange('stopped', animeData.title, e)}}><AccessAlarmRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Wstrzymane</span></Button>
                <Button className={`button page__button ${checkActive("processOfWatching")}`} onClick={(e) => {handleAnimeStatusChange('processOfWatching', animeData.title, e)}}><VisibilityIcon className="page__statisticsIcon"/><span className="page__buttonDescription">W trakcie oglądania</span></Button>
                <Button className={`button page__button ${checkActive("planned")}`} onClick={(e) => {handleAnimeStatusChange('planned', animeData.title, e)}}><CreateRoundedIcon className="page__statisticsIcon"/><span className="page__buttonDescription">Planowane</span></Button>
            </div>
        </div>
     );
}
 
export default withRouter(UserRate);