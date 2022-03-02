import React from 'react';

const ResultsAmount = ({ amount }) => {
    return ( 
        <h3 className="animeList__results-amount">Znalezione Anime (<span style={{color: amount > 0 ? '#5ec45e' : '#d14141'}}>{amount}</span>)</h3>
     );
}
 
export default ResultsAmount;