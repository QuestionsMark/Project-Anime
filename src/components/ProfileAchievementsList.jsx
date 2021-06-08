import React from 'react';

import SingleProfileAchievement from './SingleProfileAchievement';

const ProfileAchievements = ({achievements}) => {

    const achievementsList = achievements.map((a, i) => <SingleProfileAchievement key={a.id} index={i + 1 + '.'} name={a.name} img={a.img} description={a.description}/>);

    return ( 
        <div className="animeList">
            <ul className="animeList__list">
                {achievementsList}
            </ul>
        </div>
     );
}
 
export default ProfileAchievements;