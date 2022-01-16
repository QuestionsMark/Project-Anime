import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

import { HOST_ADDRESS } from '../config';

import { useUser } from '../contexts/UserProvider';

const DailyAnime = ({dailyAnime, handleRollDailyAnime}) => {

    const { id, rate, img, description, types, title } = dailyAnime;

    const { authorization } = useUser();

    const DATypes = () => {
        return types.map(t => <li className="DA__item" key={t.id}><Link to={`/types/${t.name}`} className="DA__link"><p className="DA__type">{t.name}</p></Link></li>);
    };

    return ( 
        <div className="DA">
            {authorization === '3' ? <div className="AOT__adminPanel">
                <CachedRoundedIcon className="AOT__finish-icon" onClick={handleRollDailyAnime}/>
            </div> : null}
            <h3 className="DA__title">Polecane Anime na Dziś!</h3>
            <div className="DA__info">
                <div className="DA__left">
                    <div className="DA__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${img})` }}/>
                    <p className="DA__rate"><StarRateRoundedIcon className="DA__rateIcon"/><span className="DA__rateValue">{rate}</span></p>
                </div>
                <div className="DA__right">
                    <Link to={`/anime/${id}`} className="DA__animeTitle">{title}</Link>
                    <ul className="DA__list">
                        {DATypes()}
                    </ul>
                </div>
            </div>
            <p className="DA__description">{description.slice(0, 200)}...</p>
            <Link to={`/anime/${id}`} className="DA__link"><Button className="button DA__more">Czytaj dalej</Button></Link>
        </div>
     );
}
 
export default DailyAnime;