import React from 'react';

import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

import Audio from '../components/Audio';
import SingleVoteResult from './SingleVoteResult';

import { useUser } from '../contexts/UserProvider';

const WTMResults = ({whatsTheMelody, handleRollWhatsTheMelody}) => {
    
    const { user, authorization } = useUser();

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
                const userVote = v.votes.findIndex(v => v === user.id) !== -1;
                v.isFail = v.title !== whatsTheMelody.correctAnswear && userVote ? true : false;
                v.percent = `${(v.votes.length * 100 / allVotes).toFixed(1)}%`;
            } else {
                v.isFail = false;
                v.percent = `0.0%`;
            }
        });
        return votes.map((v, i) => <SingleVoteResult key={i} isFail={v.isFail} percent={v.percent} title={v.title} color={getColor(v)}/>);
    };

    return ( 
        <div className="WTM">
            {authorization === '3' ? <div className="AOT__adminPanel">
                <CachedRoundedIcon className="AOT__finish-icon" onClick={handleRollWhatsTheMelody}/>
            </div> : null}
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <div className="WTM__audio">
                <Audio id={whatsTheMelody.mp3}/>
            </div>
            <div className="WTM__results">
                {resultsList()}
            </div>
            <p className="WTM__votes"><strong>{votesAmount()}</strong> oddanych głosów</p>
        </div>
     );
}
 
export default WTMResults;