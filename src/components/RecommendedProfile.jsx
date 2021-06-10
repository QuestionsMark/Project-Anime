import React from 'react';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { Link } from 'react-router-dom';

const RecommendedProfile = ({username, avatar, profileLikes, profileTheme, link}) => {
    return ( 
        <Link to={link} className="RP__profile" style={{backgroundImage: `url('${profileTheme}')`, backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
            <div className="RP__curtain"></div>
            <div className="RP__imgWrapper">
                <img src={avatar} alt="avatar" className="img"/>
            </div>
            <div className="RP__likes">
                <FavoriteBorderRoundedIcon className="RP__likeIcon"/>
                <p className="RP__likesValue">{profileLikes}</p>
            </div>
            <p className="RP__link">{username}</p>
        </Link>
     );
}
 
export default RecommendedProfile;