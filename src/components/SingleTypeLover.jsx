import React from 'react'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const SingleTypeLover = ({lover}) => {
    const {username, id, avatar, likes} = lover;

    return ( 
            <li className="typePage__item">
                <Popup className="normal-popup" trigger={<Link to={`/users/${id}`} className="typePage__link" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})` }} />} on="hover" position="top center">
                    <p className="typePage__username">{username}</p>
                    <div className="typePage__likes">
                        <FavoriteBorderRoundedIcon className="typePage__likeIcon"/>
                        <p className="typePage__likesValue">{likes.length}</p>
                    </div>
                </Popup>
            </li>
     );
}
 
export default SingleTypeLover;