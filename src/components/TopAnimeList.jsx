import React from 'react';

import SingleTopAnime from './SingleTopAnime';

const TopAnimeList = ({anime}) => {

    const animeList = anime.map(a => {
        let rate; 
        if (a.rate.length > 0) {
            let rateValue = 0;
            a.rate.forEach(r => rateValue += r.value);
            const average = (rateValue / a.rate.length).toFixed(2);
            rate = average;
        } else {
            rate = 0;
        }
        return <SingleTopAnime 
            key={a._id}
            title={a.title}
            link={a.link}
            img={a.images.mini.img}
            types={a.types}
            rate={rate}
            // favorite={a.favorite}
            // watched={a.watched}
            // stopped={a.stopped}
            // processOfWatching={a.processOfWatching}
            // planned={a.planned}
        />
    });

    return ( 
        <div className="animeList scrollNav" data-id="3">
            <ul className="animeList__list">
                {animeList}
            </ul>
        </div>
     );
}
 
export default TopAnimeList;