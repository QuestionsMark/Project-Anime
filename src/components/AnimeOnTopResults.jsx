import React from 'react';

import SingleVoteResult from './SingleVoteResult';

const AnimeOnTopResults = ({AOTData}) => {

    const resultsList = () => {
        if (AOTData) {
            let allVotes = 0;
            AOTData.votes.forEach(v => allVotes += v.value.length);
            const votes = [...AOTData.votes];
            const sorted = votes.sort((a, b) => {
                if (a.value.length > b.value.length) {
                    return -1;
                } else if (a.value.length < b.value.length) {
                    return 1;
                }
                return 0;
            })
            sorted.forEach(v => {
                v.percent = `${(v.value.length * 100 / allVotes).toFixed(1)}%`;
            })
            return sorted.map((v, i) => <SingleVoteResult key={i} votesAmount={v.value.length} percent={v.percent} title={v.title}/>)
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