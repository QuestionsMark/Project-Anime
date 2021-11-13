import React, { useEffect, useState } from 'react';

import SingleVoteResult from './SingleVoteResult';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';

const WTMResults = () => {
    
    const [status,,,,user] = useUser();
    const { whatsTheMelody } = useData();

    const isVoteCorrect = () => {
        if (whatsTheMelody.correctAnswear) {
            let userAnswear;
            whatsTheMelody.votes.forEach(v => {
                const index = v.votes.findIndex(v => v === user.id);
                if (index !== -1) {
                    userAnswear = v.title;
                }
            }); 
            if (userAnswear === whatsTheMelody.correctAnswear) return true;
            return false;
        }
    };

    const votesAmount = () => {
        const votesAmount = [];
        whatsTheMelody.votes.forEach(v => votesAmount.push(...v.votes));
        return votesAmount.length;
    };

    const getColor = (v) => {
        if (v.title === whatsTheMelody.correctAnswear) {
            return '#5ec45e';
        }
        return '';
    };

    const resultsList = () => {
        let allVotes = 0;
        whatsTheMelody.votes.forEach(v => allVotes += v.votes.length);
        const votes = [...whatsTheMelody.votes];
        votes.forEach(v => {
            if (allVotes !== 0) {
                v.percent = `${(v.votes.length * 100 / allVotes).toFixed(1)}%`;
            } else {
                v.percent = `0.0%`;
            }
        });
        return votes.map((v, i) => <SingleVoteResult key={i} percent={v.percent} title={v.title} color={status ? getColor(v) : ''}/>);
    };

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            {status ? <div className="WTM__userVote">
                {isVoteCorrect() ? <span className="WTM__userVoteResponse" style={{color: '#5ec45e'}}>Dobrze!</span> : <span className="WTM__userVoteResponse" style={{color: '#d14141'}}>Ty parzydlaku!</span>}
            </div> : null}
            <div className="WTM__results">
                {resultsList()}
            </div>
            <p className="WTM__votes"><strong>{votesAmount()}</strong> oddanych głosów</p>
        </>
     );
}
 
export default WTMResults;