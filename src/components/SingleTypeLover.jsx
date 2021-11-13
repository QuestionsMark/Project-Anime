import React from 'react'
import { Link } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const SingleTypeLover = ({lover}) => {
    const {username, id, avatar, likes} = lover;

    return ( 
        <Link to={`/profile/${id}`} className="typePage__link">
            <li className="typePage__item">
                <div className="typePage__imgWrapper">
                    <img src={`${HOST_ADDRESS}/images/${avatar}`} alt="asdas" className="img" />
                </div>
                <p className="typePage__username">{username}</p>
                <div className="typePage__likes">
                    <FavoriteBorderRoundedIcon className="typePage__likeIcon"/>
                    <p className="typePage__likesValue">{likes.length}</p>
                </div>
            </li>
        </Link>
     );
}
 
export default SingleTypeLover;