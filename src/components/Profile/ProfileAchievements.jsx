import React from 'react';

import Search from '../Search';
import ProfileAchievementsList from './ProfileAchievementsList';

const ProfileAchievements = ({achievements, handleSearch}) => {
    return ( 
        <div className="profileAchievements profile__content">
            <Search handleSearch={handleSearch}/>
            <ProfileAchievementsList achievements={achievements}/>
        </div>
     );
}
 
export default ProfileAchievements;