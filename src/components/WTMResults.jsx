import React, { useEffect, useState } from 'react';

import SingleVoteResult from './SingleVoteResult';

import { HOST_ADDRESS } from '../config';

const WTMResults = ({id, results, isUserLogged}) => {

    const [correctAnswear, setCorrectAnswear] = useState('');

    const isVoteCorrect = () => {
        if (results[0].title) {
            let userAnswear;
            results.forEach(r => {
                const index = r.value.findIndex(v => v === localStorage.getItem('UID'));
                if (index !== -1) {
                    userAnswear = r.title;
                }
            }); 
            if (userAnswear === correctAnswear) {
                return true;
            } else {
                return false;
            }
        }
    }

    const votesAmount = () => {
        const votesAmount = [];
        results.forEach(r => votesAmount.push(...r.value));
        return votesAmount.length;
    }

    const checkColor = (v) => {
        if (v.title === correctAnswear) {
            return '#2e9100';
        }
        return '';
    }

    const resultsList = () => {
        if (results[0].title) {
            let allVotes = 0;
            results.forEach(r => allVotes += r.value.length);
            const votes = [...results];
            const sorted = votes.sort((a, b) => {
                if (a.value.length > b.value.length) {
                    return -1;
                } else if (a.value.length < b.value.length) {
                    return 1;
                }
                return 0;
            })
            sorted.forEach(v => {
                if (allVotes !== 0) {
                    v.percent = `${(v.value.length * 100 / allVotes).toFixed(1)}%`;
                } else {
                    v.percent = `0.0%`;
                }
            })
            return sorted.map((v, i) => <SingleVoteResult key={i} percent={v.percent} title={v.title} color={checkColor(v)}/>)
        } else {
            return null;
        }
    }

    const getCorrect = () => {
        fetch(`${HOST_ADDRESS}/wtm/correct/${id}`)
            .then(res => res.json())
            .then(res => {
                setCorrectAnswear(res.correct);
            })
    }

    useEffect(() => {
        if (isUserLogged && id) {
            getCorrect();
        }
    },[id])

    useEffect(() => {
        if (isUserLogged && id) {
            getCorrect();
        }
    },[isUserLogged])

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            {isUserLogged ? <div className="WTM__userVote">
                {isVoteCorrect() ? <span className="WTM__userVoteResponse" style={{color: 'green'}}>Dobrze!</span> : <span className="WTM__userVoteResponse" style={{color: 'red'}}>Ty parzydlaku!</span>}
            </div> : null}
            <div className="WTM__results">
                {resultsList()}
            </div>
            <p className="WTM__votes"><strong>{votesAmount()}</strong> oddanych głosów</p>
        </>
     );
}
 
export default WTMResults;