import React from 'react';
import { HOST_ADDRESS } from '../config';

const SingleAchievement = ({achievement, current, setAchievement}) => {

    const { id, description, title, level, points, icon } = achievement;

    const styles = () => {
        switch (level) {
            // case 1:
            //     return { color: '#f0f0f0', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }
            // case 2:
            //     return { color: '#00ff00', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }
            // case 3:
            //     return { color: '#0000ff', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }
            // case 4:
            //     return { color: '#ff00ff', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }
            // case 5:
            //     return { color: '#ffb700', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` }
            default:
                return { color: '#a0a0a0', backgroundImage: `url(${HOST_ADDRESS}/icons/${icon})` };
        }
    };

    const getClassName = () => {
        switch (level) {
            case 1:
                return 'white';
            case 2:
                return 'green';
            case 3:
                return 'blue';
            case 4:
                return 'violet';
            case 5:
                return 'gold';
            default:
                return '';
        }
    };

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
            <div className={`achievements__image ${getClassName()}`} style={styles()}></div>
        </li>
     );
}
 
export default SingleAchievement;