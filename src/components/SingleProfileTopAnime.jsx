import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import { Icon } from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';

import { HOST_ADDRESS } from '../config';

const SingleProfileTopAnime = ({place, anime}) => {

    const { id, title, image, types, rate, kind } = anime;

    const { user } = useUser();

    const animeTypes = types.map(t => <Link key={t.id} to={`/types/${t.name}`} className={`animeList__type ${JSON.stringify(user) !== "{}" ? `${user.favoriteType === t.name ? 'animeList__type--fav' : ''}` : ''}`}>{t.name}</Link>)

    return ( 
        <li className="animeList__item profileTop__item">
            <p className="animeList__top">{place <= 3 ? <Icon className="fas fa-trophy" /> : place}</p>
            <div className="animeList__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${image})` }}/>
            <div className="animeList__animeContent">
                <Link to={`/anime/${id}`} className="animeList__title">{title} {kind === 'series' ? <Icon className="fas fa-film animeList__kind-icon animeList__kind-icon--awesome" /> : <MovieCreationOutlinedIcon className="animeList__kind-icon animeList__kind-icon--material" /> }</Link>
                <div className="animeList__types">
                    {animeTypes}
                </div>
            </div>
            <div className="animeList__rate animeList__rate--profile">
                <StarRateRoundedIcon className="animeList__rateIcon"/>
                <p className="animeList__rateValue">{rate}</p>
            </div>
        </li>
     );
}
 
export default SingleProfileTopAnime;