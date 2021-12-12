import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import SingleAchievementsGroup from '../SingleAchievementsGroup';

import setMain from '../../utils/setMain';

import { HOST_ADDRESS } from '../../config';
import Loading from '../Loading';

const Achievements = ({main, match, history}) => {

    const [achievements, setAchievements] = useState([]);
    const getAchievements = async () => {
        const response = await fetch(`${HOST_ADDRESS}/achievements`);
        if (response.ok) {
            const achievements = await response.json();
            setAchievements(achievements);
        }
    };

    const achievementsSections = () => {
        const groups = [];
        for (const achievement of achievements) {
            const name = achievement.name;
            const index = groups.findIndex(g => g.name === name);
            const isThere = index !== -1;
            if (isThere) {
                groups[index].achievements.push(achievement);
            } else {
                groups.push({name, achievements: [achievement]});
            }
        }
        return groups
            .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            .map(g => <SingleAchievementsGroup key={g.name} group={g}/>);
    };

    useEffect(() => {
        getAchievements();
    }, []);

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <>
        {achievements.length > 0 ? <div className="achievements main__content">
            <h2 className="achievements__title largeTitle">Osiągnięcia</h2>
            <div className="achievements__container">
                {achievementsSections()}
            </div>
        </div> : <div className="achievements main__content"><Loading /></div>}
        </>
     );
}
 
export default withRouter(Achievements);