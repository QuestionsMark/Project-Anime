import React, { useEffect, useState } from 'react';

import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';

import AnimeOnTopAnimeInfo from './AnimeOnTopAnimeInfo';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';
import { useAnime } from '../contexts/AnimeProvider';

const AnimeOnTop = () => {

    const [status,,,,user] = useUser();
    const [anime] = useAnime();
    const { animeOnTop } = useData();

    const [didUserVote, setDidUserVote] = useState(true);
    const [animeData, setAnimeData] = useState(null);
    const getAnime = async () => {
        const animeData = anime.find(a => a.title === animeOnTop.winner);
        setAnimeData(animeData);
    };

    const checkDidUserVote = () => {
        const allVotes = [];
        for (const { votes } of animeOnTop.votes) {
            for (const vote of votes) {
                allVotes.push(vote);
            }
        }
        const voteIndex = allVotes.findIndex(v => v === user.id);
        if (voteIndex !== - 1) return setDidUserVote(true);
        setDidUserVote(false);
    };

    useEffect(() => {
        if (animeOnTop?.winner) {
            getAnime();
        }
    }, [animeOnTop]);

    useEffect(() => {
        if (status && animeOnTop) {
            checkDidUserVote();
        }
    }, [animeOnTop, status]);

    return ( 
        <section className="AOT main__section scrollNav" data-id="1">
            <h2 className="AOT__title">Anime na Topie!</h2>
            {animeOnTop && animeData ? <AnimeOnTopAnimeInfo animeData={animeData}/> : null }
            {animeOnTop && (didUserVote || !status) ? <AnimeOnTopResults /> : null}
            {animeOnTop && status && !didUserVote ? <AnimeOnTopQuestionnaire id={animeOnTop.id}/> : null}
        </section>
     );
}
 
export default AnimeOnTop;