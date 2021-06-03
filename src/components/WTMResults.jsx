import React, { useState } from 'react';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const WTMResults = () => {

    const [userVote, setUserVote] = useState('1');
    const [results, setResults] = useState({
        correct: '1',
        votes: {
            a1: 23,
            a2: 120,
            a3: 156,
            a4: 78
        }
    });
    // null

    const isVoteCorrect = (vote) => {
        if (vote === results.correct) {
            return true;
        } else {
            return false;
        }
    }

    const percentage = (a) => {
        const answearAmount = results.votes[a];
        const { a1, a2, a3 ,a4 } = results.votes;
        const votesAmount = a1 + a2 + a3 + a4;
        const percent = (answearAmount * 100 / votesAmount).toFixed(1);
        return percent;
    }

    const votesAmount = () => {
        const { a1, a2, a3, a4 } = results.votes;
        const votesAmount = a1 + a2 + a3 + a4;
        return votesAmount;
    }

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <div className="WTM__userVote">{isVoteCorrect(userVote) ? <span className="WTM__userVoteResponse" style={{color: 'green'}}>Oj tak byczku!</span> : <span className="WTM__userVoteResponse" style={{color: 'red'}}>Oj nie byczku!</span>}{isVoteCorrect(userVote) ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon style={{color: 'red'}}/>}</div>
            <div className="WTM__results">
                <div className="WTM__result" data-key="1">
                    <span className="WTM__resultPercentCurtain" style={{width: `${percentage('a1')}%`}} ></span>
                    <div className="WTM__correct">{isVoteCorrect('1') ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon style={{color: 'red'}}/>}</div>
                    <p className="WTM__percent">{percentage('a1')}%</p>
                    <p className="WTM__resultTitle">Charlotte</p>
                </div>
                <div className="WTM__result" data-key="2">
                    <span className="WTM__resultPercentCurtain" style={{width: `${percentage('a2')}%`}} ></span>
                    <div className="WTM__correct">{isVoteCorrect('2') ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon style={{color: 'red'}}/>}</div>
                    <p className="WTM__percent">{percentage('a2')}%</p>
                    <p className="WTM__resultTitle">Violet Evergarden</p>
                </div>
                <div className="WTM__result" data-key="3">
                    <span className="WTM__resultPercentCurtain" style={{width: `${percentage('a3')}%`}} ></span>
                    <div className="WTM__correct">{isVoteCorrect('3') ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon style={{color: 'red'}}/>}</div>
                    <p className="WTM__percent">{percentage('a3')}%</p>
                    <p className="WTM__resultTitle">seishun buta yarou wa bunny girl senpai no yume wo minai senpai no yume wo minai</p>
                </div>
                <div className="WTM__result" data-key="4">
                    <span className="WTM__resultPercentCurtain" style={{width: `${percentage('a4')}%`}} ></span>
                    <div className="WTM__correct">{isVoteCorrect('4') ? <CheckRoundedIcon style={{color: 'green'}}/> : <ClearRoundedIcon style={{color: 'red'}}/>}</div>
                    <p className="WTM__percent">{percentage('a4')}%</p>
                    <p className="WTM__resultTitle">Kimi no Na Wa</p>
                </div>
            </div>
            <p className="WTM__votes"><strong>{votesAmount()}</strong> oddanych głosów</p>
        </>
     );
}
 
export default WTMResults;