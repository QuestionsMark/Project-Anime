import React, { useState } from 'react';

import { GradeRounded } from '@material-ui/icons';

import SingleAchievement from './SingleAchievement';

const SingleAchievementsGroup = ({group}) => {
    const { name, achievements } = group;

    const [achievement, setAchievement] = useState({});

    const stars = () => {
        const stars = [];
        for (let i = 0; i < achievement.level; i++) {
            stars.push(<GradeRounded key={i} className="achievements__points-icon"/>);
        };
        return stars;
    };
    
    const achievementsList = () => {
        return achievements
            .sort((a, b) => {
                if (a.level > b.level) return 1;
                if (a.level < b.level) return -1;
                return 0;
            })
            .map(a => <SingleAchievement key={a.id} achievement={a} current={achievement} setAchievement={setAchievement}/>);
    };

    return ( 
        <article className="achievements__group">
            <h3 className="achievements__group-title">{name}</h3>
            <div className={`achievements__group-content ${JSON.stringify(achievement) !== "{}" ? 'visible' : ''}`}>
                <p className="achievements__description">{achievement.description}</p>
                <div className="achievements__dificulty">
                    {JSON.stringify(achievement) !== "{}" ? <>poziom zaangażowania: {stars()}</> : ''}
                </div>
                <div className="achievements__gained-title">{achievement.title ? 'tytuł: ' + achievement.title : ''}</div>
                <div className="achievements__points">
                {JSON.stringify(achievement) !== "{}" ? <>punkty: <GradeRounded className="achievements__points-icon"/></> : null}
                    {achievement.points}
                </div>
            </div>
            <ul className="achievements__group-list">
                {achievementsList()}
                <div className="achievements__group-last-item"/>
            </ul>
        </article>
     );
}
 
export default SingleAchievementsGroup;