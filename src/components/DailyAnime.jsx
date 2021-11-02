import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { HOST_ADDRESS } from '../config';

const DailyAnime = ({isUserLogged}) => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [dailyAnime, setDailyAnime] = useState({
        title: '',
        types: [
            {
                id: '',
                name: '',
                link: ''
            }
        ],
        img: '',
        rate: 0,
        description: '',
        link: '',
    })
    const { title, link, types, img, rate, description } = dailyAnime;

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/da`)
            .then(res => res.json())
            .then(res => setDailyAnime(res));
        if (isUserLogged) {
            fetch(`${HOST_ADDRESS}/users/${localStorage.getItem('l')}`)
                .then(res => res.json())
                .then(res => {
                    checkAuthorization(res.rank);
                });
        }
    }

    const checkAuthorization = (rank) => {
        if (rank === '3') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }

    const handleRoll = () => {
        fetch(`${HOST_ADDRESS}/da/roll`, {
            headers: {
                'authorization': localStorage.getItem('token')
            },
            method: 'PUT',
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                callAPI();
            });
    }

    const DATypes = types.map(t => <li className="DA__item" key={t.id}><Link to={`/types/${t.link}`} className="DA__link"><p className="DA__type">{t.name}</p></Link></li>)

    useEffect(() => {
        callAPI();
    },[isUserLogged])

    return ( 
        <div className="DA">
            {isAuthorized ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleRoll}>Losuj</p>
            </div> : null}
            <h3 className="DA__title">Polecane Anime na Dziś!</h3>
            <div className="DA__info">
                <div className="DA__left">
                    <div className="DA__imgWrapper">
                        <img src={`${HOST_ADDRESS}/images/${img}`} alt="Daily anime" className="img" />
                    </div>
                    <p className="DA__rate"><StarRateRoundedIcon className="DA__rateIcon"/><span className="DA__rateValue">{rate}</span></p>
                </div>
                <div className="DA__right">
                    <Link to={`/pages/${link}`} className="DA__animeTitle">{title}</Link>
                    <ul className="DA__list">
                        {DATypes}
                    </ul>
                </div>
            </div>
            <p className="DA__description">{description.slice(0, 200)}...</p>
            <Link to={`/pages/${link}`} className="DA__link"><Button className="button DA__more">Czytaj dalej</Button></Link>
        </div>
     );
}
 
export default DailyAnime;