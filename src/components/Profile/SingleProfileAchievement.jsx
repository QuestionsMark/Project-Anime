import React from 'react';
import { Link } from 'react-router-dom';

import { HOST_ADDRESS } from '../../config';

const SingleProfileAchievement = ({index, achievement}) => {

    const { name, description, icon } = achievement;

    return ( 
        <li className="profileAchievements__item">
            <p className="profileAchievements__index">{index}</p>
            <div className="profileAchievements__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }}/>
            <div className="profileAchievements__info">
                <Link to="/achievements/cos" className="profileAchievements__link">{name}</Link>
                <p className="profileAchievements__description">{description}</p>
            </div>
        </li>
     );
}
 
export default SingleProfileAchievement;