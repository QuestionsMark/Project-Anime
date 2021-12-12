import React, { useEffect, useState } from 'react';

import { useUser } from '../contexts/UserProvider';

import AnimeOnTopAnimeInfo from './AnimeOnTopAnimeInfo';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';
import { HOST_ADDRESS } from '../config';
import Loading from './Loading';

const AnimeOnTop = () => {

    const { status, user } = useUser();
    
    const [animeOnTop, setAnimeOnTop] = useState(null);
    const getAnimeOnTop = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
        if (response.ok) {
            const animeOnTop = await response.json();
            setAnimeOnTop(animeOnTop);
        }
    };
    const [animeTitlesList, setAnimeTitlesList] = useState([]);
    const getAnimeTitlesList = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/title`);
        if (response.ok) {
            const anime = await response.json();
            setAnimeTitlesList(anime);
        }
    };

    const [didUserVote, setDidUserVote] = useState(true);
    const [animeData, setAnimeData] = useState(null);
    const getAnimeData = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${animeOnTop.winner.id}`);
        if (response.ok) {
            const animeData = await response.json();
            setAnimeData(animeData);
        }
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
        getAnimeTitlesList();
        getAnimeOnTop();
    }, []);

    useEffect(() => {
        if (animeOnTop?.winner) {
            getAnimeData();
        }
    }, [animeOnTop]);

    useEffect(() => {
        if (status && JSON.stringify(user) !== "{}" && animeOnTop) {
            checkDidUserVote();
        }
    }, [animeOnTop, status, user]);

    return ( 
        <>
        {animeOnTop ? <section className="AOT main__section scrollNav" data-id="1">
            <h2 className="AOT__title">Anime na Topie!</h2>
            {animeOnTop && animeData ? <AnimeOnTopAnimeInfo animeData={animeData} setAnimeData={setAnimeData} getAnimeOnTop={getAnimeOnTop}/> : null }
            {animeOnTop && (didUserVote || !status) ? <AnimeOnTopResults animeOnTop={animeOnTop}/> : null}
            {animeOnTop && status && !didUserVote ? <AnimeOnTopQuestionnaire id={animeOnTop.id} animeTitlesList={animeTitlesList} getAnimeOnTop={getAnimeOnTop}/> : null}
        </section> : <section className="AOT main__section scrollNav" data-id="1"><Loading /></section>}
        </>
     );
}
 
export default AnimeOnTop;