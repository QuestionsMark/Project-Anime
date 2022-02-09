import React from 'react';
import Popup from 'reactjs-popup';

import { GradeRounded } from '@material-ui/icons';

import { HOST_ADDRESS } from '../../config';

const UserAchievement = ({achievement}) => {

    const { name, description, icon, level } = achievement;

    const stars = () => {
        const stars = [];
        for (let i = 0; i < level; i++) {
            stars.push(<GradeRounded key={i} className="userList__achievement-level-icon"/>);
        };
        return stars;
    };

    return ( 
        <Popup on="hover" className="normal-popup" trigger={<div className="userList__achievement" style={{ backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }}/>} mouseEnterDelay={200} position="top center">
            <div className="userList__achievementInfo">
                <p className="userList__achievement-title">{name}</p>
                <p className="userList__achievement-level">{stars()}</p>
                <p className="userList__achievement-description">{description}</p>
            </div>
        </Popup>
     );
}
 
export default UserAchievement;