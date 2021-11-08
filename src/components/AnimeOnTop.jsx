import React, { useEffect, useState } from 'react';

import AnimeOnTopAnimeInfo from './AnimeOnTopAnimeInfo';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

const AnimeOnTop = () => {

    const [status] = useUser();

    const [animeOnTop, setAnimeOnTop] = useState(null);
    const [anime, setAnime] = useState(null);
    const [didUserVote, setDidUserVote] = useState(true);

    const checkDidUserVote = () => {
        const users = [];
        animeOnTop.votes.forEach(v => {
            users.push(...v.value);
        })
        const index = users.findIndex(u => u === JSON.parse(localStorage.getItem('animark-user-id')));
        if (index !== - 1) {
            setDidUserVote(true);
        } else {
            setDidUserVote(false);
        }
    }
    const getAnimeOnTop = async () => {
        const response = await fetch(`${HOST_ADDRESS}/aot/actual`);
        const animeOnTop = await response.json();
        if (!animeOnTop.error) {
            setAnimeOnTop(animeOnTop);
            if (animeOnTop.winner !== '') {
                const link = animeOnTop.winner.toLowerCase().replace(/ /g, '-').replace(/\!/g, '').replace(/\,/, '').replace(/\./g, '').replace(/\?/g, '');
                const animeResponse = await fetch(`${HOST_ADDRESS}/anime/${link}`);
                const anime = await animeResponse.json();
                setAnime(anime);
            }
        }
    }

    useEffect(() => {
        getAnimeOnTop();
    },[])

    useEffect(() => {
        if (animeOnTop) {
            checkDidUserVote();
        }
    }, [animeOnTop])

    return ( 
        <section className="AOT main__section scrollNav" data-id="1">
            <h2 className="AOT__title">Anime na Topie!</h2>
            {anime ? <AnimeOnTopAnimeInfo anime={anime} refresh={getAnimeOnTop} setAnime={setAnime} /> : null }
            {animeOnTop && (didUserVote || !status) ? <AnimeOnTopResults animeOnTop={animeOnTop}/> : null}
            {animeOnTop && status && !didUserVote ? <AnimeOnTopQuestionnaire id={animeOnTop._id} refresh={getAnimeOnTop}/> : null}
        </section>
     );
}
 
export default AnimeOnTop;