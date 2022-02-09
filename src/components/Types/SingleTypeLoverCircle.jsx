import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { HOST_ADDRESS } from '../../config';

const SingleTypeLoverCircle = ({lover}) => {

    const { id, username, avatar } = lover;

    return ( 
        <Popup
        className="normal-popup"
        trigger={<Link to={`/users/${id}`}
		className="types__lover-circle"
		style={{backgroundImage: `url(${HOST_ADDRESS}/images/${avatar})`}}
		/>}
        on="hover"
        position="top center"
        >
            <p className="types__username">{username}</p>
        </Popup>
     );
}
 
export default SingleTypeLoverCircle;