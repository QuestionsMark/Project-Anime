import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { HOST_ADDRESS } from '../config';

import guestAvatar from '../media/img/guest.png';

const SingleOnlineUser = ({user}) => {

    const { id, username, avatar } = user;

    const styles = {
        backgroundImage: avatar ? `url(${HOST_ADDRESS}/images/${avatar})` : `url(${guestAvatar})`,
    }

    const trigger = () => {
        return id ? <Link to={`/users/${id}`} className="online-users__item" style={styles} /> : <div className="online-users__item" style={styles} />
    };

    return ( 
        <Popup className="normal-popup normal-popup--small" position="bottom center" trigger={trigger} on="hover">
            {username}
        </Popup>
     );
}
 
export default SingleOnlineUser;