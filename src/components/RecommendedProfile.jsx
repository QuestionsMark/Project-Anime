import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const RecommendedProfile = ({user}) => {

    const { id, username, avatar, likes, background } = user;

    return ( 
        <Link to={`/users/${id}`} className="RP__profile" style={{backgroundImage: `url('${HOST_ADDRESS}/images/${background}')`}}>
            <div className="RP__curtain"></div>
            <div className="RP__image" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})`}}/>
            <div className="RP__likes">
                <FavoriteBorderRoundedIcon className="RP__likeIcon"/>
                <p className="RP__likesValue">{likes.length}</p>
            </div>
            <p className="RP__link">{username}</p>
        </Link>
     );
}
 
export default RecommendedProfile;