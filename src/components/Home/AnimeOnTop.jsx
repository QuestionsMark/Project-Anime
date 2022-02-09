import React, { useCallback, useEffect, useRef, useState } from 'react';

import Loading from '../Loading';
import AnimeOnTopAnimeInfo from './AnimeOnTopAnimeInfo';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';

import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

const AnimeOnTop = () => {

    const componentRef = useRef();

    const { status, user } = useUser();
    
    const [animeOnTop, setAnimeOnTop] = useState(null);
    const getAnimeOnTop = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
        if (response.ok) {
            const animeOnTop = await response.json();
            if (!componentRef.current) return;
            setAnimeOnTop(animeOnTop);
        }
    };
    const [animeTitlesList, setAnimeTitlesList] = useState([]);
    const getAnimeTitlesList = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/title`);
        if (response.ok) {
            const anime = await response.json();
            if (!componentRef.current) return;
            setAnimeTitlesList(anime);
        }
    };

    const [didUserVote, setDidUserVote] = useState(true);
    const [animeData, setAnimeData] = useState(null);
    const getAnimeData = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${animeOnTop.winner.id}`);
        if (response.ok) {
            const animeData = await response.json();
            if (!componentRef.current) return;
            setAnimeData(animeData);
        }
    }, [animeOnTop]);

    const checkDidUserVote = useCallback(() => {
        const allVotes = [];
        for (const { votes } of animeOnTop.votes) {
            for (const vote of votes) {
                allVotes.push(vote);
            }
        }
        const voteIndex = allVotes.findIndex(v => v === user.id);
        if (!componentRef.current) return;
        if (voteIndex !== - 1) return setDidUserVote(true);
        setDidUserVote(false);
    }, [animeOnTop, user]);

    useEffect(() => {
        getAnimeTitlesList();
        getAnimeOnTop();
    }, []);

    useEffect(() => {
        if (animeOnTop?.winner) {
            getAnimeData();
        }
    }, [animeOnTop, getAnimeData]);

    useEffect(() => {
        if (status && JSON.stringify(user) !== "{}" && animeOnTop) {
            checkDidUserVote();
        }
    }, [animeOnTop, checkDidUserVote, status, user]);

    return ( 
        <section className="AOT main__section scrollNav" ref={componentRef} data-id="1">
            {animeOnTop ?
                <>
                    <h2 className="AOT__title">Anime na Topie!</h2>
                    {animeOnTop && animeData ? <AnimeOnTopAnimeInfo animeData={animeData} setAnimeData={setAnimeData} getAnimeOnTop={getAnimeOnTop}/> : null }
                    {animeOnTop && (didUserVote || !status) ? <AnimeOnTopResults animeOnTop={animeOnTop}/> : null}
                    {animeOnTop && status && !didUserVote ? <AnimeOnTopQuestionnaire id={animeOnTop.id} animeTitlesList={animeTitlesList} getAnimeOnTop={getAnimeOnTop}/> : null}
                </>
                :
                <Loading />
            }
        </section>
     );
}
 
export default AnimeOnTop;