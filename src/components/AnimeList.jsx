import React from 'react';

import SingleAnime from './SingleAnime';

const AnimeList = ({anime}) => {

    const animeList = anime.map(a => <SingleAnime
        key={a.id}
        title={a.title}
        link={a.link}
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
        <div className="animeList">
            <ul className="animeList__list">
                {animeList}
            </ul>
        </div>
     );
}
 
export default AnimeList;