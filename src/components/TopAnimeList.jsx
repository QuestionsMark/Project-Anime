import React from 'react';

import SingleTopAnime from './SingleTopAnime';

const TopAnimeList = ({anime}) => {

    const animeList = () => {
        return anime.map((a, i) => {
            let rate; 
            if (a.rate.length > 0) {
                let rateValue = 0;
                a.rate.forEach(r => rateValue += r.rate);
                const average = (rateValue / a.rate.length).toFixed(2);
                rate = average;
            } else {
                rate = 0;
            }
            return <SingleTopAnime key={a.id} place={i + 1} anime={a} rate={rate} />
        });
    }

    return ( 
        <div className="animeList scrollNav" data-id="3">
            <ul className="animeList__list">
                {animeList()}
            </ul>
        </div>
     );
}
 
export default TopAnimeList;