import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';

import Loading from '../Loading';
import SingleAchievementsGroup from '../SingleAchievementsGroup';

import setMain from '../../utils/setMain';
import { HOST_ADDRESS } from '../../config';
import { DefaultArray } from '../../utils/CustomClasses';

const Achievements = ({main, match, history}) => {

    const componentRef = useRef();

    const [achievements, setAchievements] = useState(new DefaultArray());
    const getAchievements = async () => {
        const response = await fetch(`${HOST_ADDRESS}/achievements`);
        if (response.ok) {
            const achievements = await response.json();
            if (!componentRef.current) return;
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

    const achievementsComponent = achievements instanceof DefaultArray ?
        <Loading />
        :
        <div className="achievements__container">
            {achievementsSections()}
        </div>;

    useEffect(() => {
        getAchievements();
    }, []);

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

    return ( 
        <div className="achievements main__content" ref={componentRef}>
            <h2 className="achievements__title largeTitle">Osiągnięcia</h2>
            {achievementsComponent}
        </div>
     );
}
 
export default withRouter(Achievements);