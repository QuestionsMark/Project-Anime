import React from 'react';

import SingleProfileTopAnime from './SingleProfileTopAnime';

const ProfileTopAnimeList = ({anime}) => {

    const animeList = () => {
        const sorted = anime.sort((a, b) => {
            if (a.rate < b.rate) return 1;
            if (a.rate > b.rate) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            return 0;
        })
        return sorted.map((a, i) => <SingleProfileTopAnime key={a.id} place={i + 1} anime={a}/>);
    }

    return ( 
        <div className="animeList">
            <ul className="animeList__list">
                {animeList()}
            </ul>
        </div>
     );
}
 
export default ProfileTopAnimeList;