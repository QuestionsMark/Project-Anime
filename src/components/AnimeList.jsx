import React from 'react';

import SingleAnime from './SingleAnime';

const AnimeList = ({anime, isUserLogged, user, callAPI}) => {

    const animeList = anime.map(a => {
        let rate; 
        if (a.rate.length > 0) {
            let rateValue = 0;
            a.rate.forEach(r => rateValue += r.rate);
            const average = (rateValue / a.rate.length).toFixed(2);
            rate = average;
        } else {
            rate = 0;
        }
        return <SingleAnime
            key={a._id}
            title={a.title}
            link={a.link}
            img={a.images.mini.img}
            types={a.types}
            rate={rate}
            isUserLogged={isUserLogged}
            user={user}
            callAPI={callAPI}
        />
    })

    return ( 
        <div className="animeList">
            <ul className="animeList__list">
                {animeList}
            </ul>
        </div>
     );
}
 
export default AnimeList;