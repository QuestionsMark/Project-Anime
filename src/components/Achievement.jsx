import React from 'react';
import Popup from 'reactjs-popup';

import GradeRounded from '@material-ui/icons/GradeRounded';

import { HOST_ADDRESS } from '../config';

const Achievement = ({achievement}) => {

    const { name, description, icon, level } = achievement;

    const stars = () => {
        const stars = [];
        for (let i = 0; i < level; i++) {
            stars.push(<GradeRounded key={i} className="userList__achievement-level-icon"/>);
        };
        return stars;
    };

    return ( 
        <Popup on="hover" className="normal-popup" trigger={<div className="userList__achievement">
            <img src={`${HOST_ADDRESS}/icons/${icon}`} alt="achievement" className="img userList__achievementImg" />
        </div>} mouseEnterDelay={200} position="top center">
            <div className="userList__achievementInfo">
                <p className="userList__achievement-title">{name}</p>
                <p className="userList__achievement-level">{stars()}</p>
                <p className="userList__achievement-description">{description}</p>
            </div>
        </Popup>
     );
}
 
export default Achievement;