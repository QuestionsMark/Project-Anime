import React from 'react';
import { HOST_ADDRESS } from '../config';

const SingleAchievement = ({achievement, current, setAchievement}) => {

    const { id, description, title, level, points, icon } = achievement;

    const handleDescriptionChange = () => {
        if (current.id === id) {
            setAchievement({});
            return;
        }
        setAchievement({ id, description, title, level, points, icon });
    };

    return ( 
        <li className={`achievements__group-item ${current.id === id ? 'active' : ''}`} onClick={handleDescriptionChange}>
            <div className="achievements__item-border">
                <div className="achievements__item-border-part left"/>
                <div className="achievements__item-border-part right"/>
            </div>
            <div className="achievements__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }}></div>
        </li>
     );
}
 
export default SingleAchievement;