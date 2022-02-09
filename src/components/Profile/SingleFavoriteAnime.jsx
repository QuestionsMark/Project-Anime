import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { StarRateRounded } from '@material-ui/icons';

import { HOST_ADDRESS } from '../../config';

const SingleFavoriteAnime = ({anime}) => {

    const { id, image, title, rate } = anime;

    const favoriteAnimeComponent = () => {
        return <li className="profile__favorite-anime-item">
            <Link to={`/anime/${id}`} className="profile__favorite-anime-link" >
                <div className="profile__favorite-anime-image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${image})` }} />
                <div className="profile__favorite-anime-rate">
                    <StarRateRounded className="profile__favorite-anime-rate-icon"/>
                    <p className="profile__favorite-anime-rate-value">{rate}</p>
                </div>
            </Link>
        </li>;
    };

    return ( 
        <Popup className="normal-popup" trigger={favoriteAnimeComponent()} on="hover" position="top center">
            {title}
        </Popup>
     );
}
 
export default SingleFavoriteAnime;