import React from 'react';

import SingleProfileAchievement from './SingleProfileAchievement';

const ProfileAchievementsList = ({achievements}) => {

    const achievementsList = achievements.map((a, i) => <SingleProfileAchievement key={a.id} index={i + 1 + '.'} achievement={a}/>);

    return ( 
        <div className="animeList">
            <ul className="animeList__list">
                {achievementsList}
            </ul>
        </div>
     );
}
 
export default ProfileAchievementsList;