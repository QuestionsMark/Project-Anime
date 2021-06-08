import React from 'react';
import { Link } from 'react-router-dom';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

const SingleProfileTopAnime = ({title, link, img, types, rate}) => {

    const animeTypes = types.map(t => <Link key={t.id} to={t.link} className="animeList__type">{t.name}</Link>)

    return ( 
        <li className="animeList__item profileTop__item">
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
        </li>
     );
}
 
export default SingleProfileTopAnime;