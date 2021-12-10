import React from 'react';
import { Link } from 'react-router-dom';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { HOST_ADDRESS } from '../config';

const SingleFavoriteAnime = ({anime}) => {

    const { id, image, title, rate } = anime;

    return ( 
        <li className="profile__FA-item">
            <div className="profile__FAImage" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${image})` }}/>
            <Link to={`/anime/${id}`} className="profile__FALink">{title}</Link>
            <div className="profile__FARate">
                <StarRateRoundedIcon className="profile__FARateIcon"/>
                <p className="profile__FARateValue">{rate}</p>
            </div>
        </li>
     );
}
 
export default SingleFavoriteAnime;