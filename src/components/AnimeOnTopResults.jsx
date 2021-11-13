import React from 'react';
import { useData } from '../contexts/DataProvider';

import SingleVoteResult from './SingleVoteResult';

const AnimeOnTopResults = () => {

    const { animeOnTop } = useData();

    const resultsList = () => {
        if (animeOnTop) {
            const allVotes = animeOnTop.votes.reduce((prev, v) => prev + v.votes.length, 0);
            const votes = [...animeOnTop.votes];
            votes.forEach(v => v.percent = `${(v.votes.length * 100 / allVotes).toFixed(1)}%`);
            return votes
                .sort((a, b) => {
                    if (a.votes.length > b.votes.length) return -1;
                    if (a.votes.length < b.votes.length) return 1;
                    return 0;
                })
                .map((v, i) => <SingleVoteResult key={i} votesAmount={v.votes.length} percent={v.percent} title={v.title}/>);
        } else {
            return null;
        }
    }

    return ( 
        <div className="AOT__results">
            <h2 className="AOT__resultTitle">Najlepsze anime tygodnia według użytkowników!</h2>
            <div className="AOT__resultsContainer">
                {resultsList()}
            </div>
        </div>
     );
}
 
export default AnimeOnTopResults;