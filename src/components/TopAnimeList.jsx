import React from 'react';

import SingleTopAnime from './SingleTopAnime';

const TopAnimeList = ({anime}) => {

    const animeList = anime.map((a, index) => <SingleTopAnime 
        key={a.id}
        title={a.title}
        link={a.link}
        place={index + 1}
        img={a.img}
        types={a.types}
        rate={a.rate}
        favorite={a.favorite}
        watched={a.watched}
        stopped={a.stopped}
        processOfWatching={a.processOfWatching}
        planned={a.planned}
        />)

    return ( 
        <div className="animeList scrollNav" data-id="3">
            <ul className="animeList__list">
                {animeList}
            </ul>
        </div>
     );
}
 
export default TopAnimeList;