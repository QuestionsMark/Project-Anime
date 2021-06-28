import React from 'react'
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const SingleTypeLover = ({name, link, img, likes}) => {
    return ( 
        <Link to={`/profile/${link}`} className="typePage__link">
            <li className="typePage__item">
                <div className="typePage__imgWrapper">
                    <img src={`https://question-mark-project-anime.herokuapp.com/images/${img}`} alt="asdas" className="img" />
                </div>
                <p className="typePage__username">{name}</p>
                <div className="typePage__likes">
                    <FavoriteBorderRoundedIcon className="typePage__likeIcon"/>
                    <p className="typePage__likesValue">{likes}</p>
                </div>
            </li>
        </Link>
     );
}
 
export default SingleTypeLover;