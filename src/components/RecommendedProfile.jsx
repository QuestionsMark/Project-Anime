import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const RecommendedProfile = ({username, avatar, likes, background, link}) => {
    return ( 
        <Link to={`/profile/${link}`} className="RP__profile" style={{backgroundImage: `url('${HOST_ADDRESS}/images/${background}')`, backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
            <div className="RP__curtain"></div>
            <div className="RP__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${avatar}`} alt="avatar" className="img"/>
            </div>
            <div className="RP__likes">
                <FavoriteBorderRoundedIcon className="RP__likeIcon"/>
                <p className="RP__likesValue">{likes.length}</p>
            </div>
            <p className="RP__link">{username}</p>
        </Link>
     );
}
 
export default RecommendedProfile;