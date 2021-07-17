import React from 'react';
import SingleProfileTopAnime from './SingleProfileTopAnime';

const ProfileTopAnimeList = ({anime}) => {

    const animeList = () => {
        const sorted = anime.sort((a, b) => {
            if (a.rate < b.rate) {
                return 1;
            } else if (a.rate > b.rate) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            return 0;
        })
        return sorted.map((a, i) => <SingleProfileTopAnime key={a.id} title={a.title} place={i + 1} img={a.img} link={a.link} types={a.types} rate={a.rate}/>);
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