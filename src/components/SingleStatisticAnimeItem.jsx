import React from 'react';
import { Link } from 'react-router-dom';

const SingleStatisticAnimeItem = ({index, title, link}) => {
    return ( 
        <li className="profile__statisticAnimeItem">
            <p className="profile__statisticAnimeIndex">{index}</p>
            <Link to={link} className="profile__statisticAnimeLink">{title}</Link>
        </li>
     );
}
 
export default SingleStatisticAnimeItem;