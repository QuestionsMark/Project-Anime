import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

const DailyAnime = ({dailyAnime, getDailyAnime}) => {

    const [,, authorization] = useUser();

    const handleRoll = async () => {
        const response = await fetch(`${HOST_ADDRESS}/da/roll`, {
            headers: {
                'authorization': localStorage.getItem('token')
            },
            method: 'PUT',
        });
        await response.json();
        getDailyAnime();
    }

    const DATypes = dailyAnime ? dailyAnime.types.map(t => <li className="DA__item" key={t.id}><Link to={`/types/${t.link}`} className="DA__link"><p className="DA__type">{t.name}</p></Link></li>) : null;

    return ( 
        <div className="DA">
            {authorization === '2' || authorization === '3' ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleRoll}>Losuj</p>
            </div> : null}
            <h3 className="DA__title">Polecane Anime na Dziś!</h3>
            {dailyAnime ? <>
            <div className="DA__info">
                <div className="DA__left">
                    <div className="DA__imgWrapper">
                        <img src={`${HOST_ADDRESS}/images/${dailyAnime.img}`} alt="Daily anime" className="img" />
                    </div>
                    <p className="DA__rate"><StarRateRoundedIcon className="DA__rateIcon"/><span className="DA__rateValue">{dailyAnime.rate}</span></p>
                </div>
                <div className="DA__right">
                    <Link to={`/pages/${dailyAnime.link}`} className="DA__animeTitle">{dailyAnime.title}</Link>
                    <ul className="DA__list">
                        {DATypes}
                    </ul>
                </div>
            </div>
            <p className="DA__description">{dailyAnime.description.slice(0, 200)}...</p>
            <Link to={`/pages/${dailyAnime.link}`} className="DA__link"><Button className="button DA__more">Czytaj dalej</Button></Link>
            </> : null}
        </div>
     );
}
 
export default DailyAnime;