import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import dailyAnime from '../media/img/sak6-spec.jpg';

const DailyAnime = () => {
    return ( 
        <div className="DA">
            <h3 className="DA__title">Polecane Anime na Dziś!</h3>
            <div className="DA__info">
                <div className="DA__left">
                    <div className="DA__imgWrapper">
                        <img src={dailyAnime} alt="Daily anime" className="img" />
                    </div>
                    <p className="DA__rate"><StarRateRoundedIcon className="DA__rateIcon"/><span className="DA__rateValue">10,00</span></p>
                </div>
                <div className="DA__right">
                    <Link to="/page/seis" className="DA__animeTitle">Sakurasou no Pet na Kanojo</Link>
                    <ul className="DA__list">
                        {/* {DATypes} */}
                        <li className="DA__item">
                            <Link to="/type/komedia" className="DA__type">Komedia</Link>
                        </li>
                        <li className="DA__item">
                            <Link to="/" className="DA__type">Dramat</Link>
                        </li>
                        <li className="DA__item">
                            <Link to="/" className="DA__type">Okruchy Życia</Link>
                        </li>
                        <li className="DA__item">
                            <Link to="/" className="DA__type">Szkolne</Link>
                        </li>
                        <li className="DA__item">
                            <Link to="/" className="DA__type">Romans</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="DA__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, sit aspernatur natus suscipit adipisci labore accusamus optio voluptatum, libero quasi incidunt quae! Reiciendis nam nobis officiis illum blanditiis totam esse...</p>
            <Link to="/page/coś" className="DA__link"><Button className="button DA__more">Czytaj dalej</Button></Link>
        </div>
     );
}
 
export default DailyAnime;