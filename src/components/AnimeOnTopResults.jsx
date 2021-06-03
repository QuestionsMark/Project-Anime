import React, { useState } from 'react';

const AnimeOnTopResults = () => {

    const [results, setResults] = useState([
        {
            id: 1,
            title: 'Charlotte',
            votesAmount: 10
        },
        {
            id: 2,
            title: 'Violet',
            votesAmount: 154
        },
        {
            id: 3,
            title: 'Evergarden',
            votesAmount: 54
        },
        {
            id: 4,
            title: 'Bleach',
            votesAmount: 908
        },
        {
            id: 5,
            title: 'SAO',
            votesAmount: 123
        },
        {
            id: 6,
            title: 'Naruto',
            votesAmount: 23
        },
    ]);

    const showResult = (type, r) => {
        const sortedResult = results.sort((a, b) => {
            if (a.votesAmount > b.votesAmount) {
                return -1;
            } else if (a.votesAmount < b.votesAmount) {
                return 1;
            } else {
                return 0;
            }
        });
        let result = 0;
        if (type === "percent") {
            let allVotes = 0;
            results.forEach(r => {allVotes = allVotes + r.votesAmount})
            const votes = sortedResult[r].votesAmount;
            result = (votes * 100 / allVotes).toFixed(1);
        } else if (type === "title") {
            result = sortedResult[r].title
        }
        return result;
    }

    return ( 
        <div className="AOT__results">
            <h2 className="AOT__resultTitle">Najlepsze anime tygodnia według użytkowników!</h2>
            <div className="AOT__result" data-key="1">
                <span className="WTM__resultPercentCurtain" style={{width: `${showResult("percent", 0)}%`}}></span>
                <p className="WTM__percent">{showResult("percent", 0)}%</p>
                <p className="WTM__resultTitle">{showResult("title", 0)}</p>
            </div>
            <div className="AOT__result" data-key="2">
                <span className="WTM__resultPercentCurtain" style={{width: `${showResult("percent", 1)}%`}}></span>
                <p className="WTM__percent">{showResult("percent", 1)}%</p>
                <p className="WTM__resultTitle">{showResult("title", 1)}</p>
            </div>
            <div className="AOT__result" data-key="3">
                <span className="WTM__resultPercentCurtain" style={{width: `${showResult("percent", 2)}%`}}></span>
                <p className="WTM__percent">{showResult("percent", 2)}%</p>
                <p className="WTM__resultTitle">{showResult("title", 2)}</p>
            </div>
            <div className="AOT__result" data-key="4">
                <span className="WTM__resultPercentCurtain" style={{width: `${showResult("percent", 3)}%`}}></span>
                <p className="WTM__percent">{showResult("percent", 3)}%</p>
                <p className="WTM__resultTitle">{showResult("title", 3)}</p>
            </div>
        </div>
     );
}
 
export default AnimeOnTopResults;