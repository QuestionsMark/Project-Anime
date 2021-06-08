import React from 'react';

import ProfileAchievementsList from './ProfileAchievementsList';
import Search from './Search';

const UserAchievements = ({achievements, handleSearch}) => {
    return ( 
        <div className="profileTop profile__content">
            <Search handleSearch={handleSearch}/>
            <ProfileAchievementsList achievements={achievements}/>
        </div>
     );
}
 
export default UserAchievements;