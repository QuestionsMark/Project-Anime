import React from 'react';
import { Link } from 'react-router-dom';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

const SingleWatchedAnimeItem = ({index, title, link, rate}) => {
    return ( 
        <li className="profile__statisticAnimeItem">
            <p className="profile__statisticAnimeIndex">{index}</p>
            <Link to={link} className="profile__statisticAnimeLink">{title}</Link>
            <div className="profile__statisticAnimeRate">
                <StarRateRoundedIcon className="profile__statisticAnimeIcon"/>
                <p className="profile__statisticAnimeRateValue">{rate}</p>
            </div>
        </li>
     );
}
 
export default SingleWatchedAnimeItem;