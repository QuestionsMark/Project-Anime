import React, { useEffect, useState } from 'react';

import AnimeOnTopAnimeInfo from './AnimeOnTopAnimeInfo';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';

const AnimeOnTop = ({isUserLogged}) => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [AOTData, setAOTData] = useState('');
    const [animeOnTop, setAnimeOnTop] = useState({
        _id: '',
        title: '',
        images: {
            mini: {
                img: '',
            },
        },
        description: {
            description: '',
        },
        // ścieżka do obrazka w public
        link: '',
        rate: [],
        types: [
            {
                id: '',
                name: '',
            }
        ],
        soundtracks: [
            {
                id: '',
                mp3: '',
            }
        ],
        //ścieżka do soundtracka
        watchLink: ''
    })
    const [didUserVote, setDidUserVote] = useState(true);

    const checkAuthorization = (rank) => {
        if (rank === '3') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }

    const checkDidUserVote = (aotData) => {
        const users = [];
        aotData.votes.forEach(v => {
            users.push(...v.value);
        })
        // console.log(users)
        const index = users.findIndex(u => u === localStorage.getItem('UID'));
        // console.log(index)
        if (index !== - 1) {
            setDidUserVote(true);
        } else {
            setDidUserVote(false);
        }
    }

    const callAPI = () => {
        fetch('http://localhost:9000/aot/actual')
            .then(res => res.json())
            .then(res => {
                setAOTData(res);
                if (isUserLogged) {
                    checkDidUserVote(res)
                }
                if (res.winner !== '') {
                    const link = res.winner.toLowerCase().replace(/ /g, '-').replace(/\!/g, '').replace(/\,/, '').replace(/\./g, '').replace(/\?/g, '');
                    // console.log(link)
                    fetch(`http://localhost:9000/anime/${link}`)
                        .then(res => res.json())
                        .then(res => {
                            // console.log(res)
                            setAnimeOnTop(res)
                        });
                }
            })
        if (isUserLogged) {
            fetch(`http://localhost:9000/users/${localStorage.getItem('l')}`)
                .then(res => res.json())
                .then(res => {
                    checkAuthorization(res.rank);
                });
        }
    }

    useEffect(() => {
        callAPI();
    },[isUserLogged])

    return ( 
        <section className="AOT main__section scrollNav" data-id="1">
            {animeOnTop.title !== '' ? <AnimeOnTopAnimeInfo
            isAuthorized={isAuthorized}
            id={animeOnTop._id}
            img={animeOnTop.images.mini.img}
            rate={animeOnTop.rate}
            title={animeOnTop.title}
            link={animeOnTop.link}
            animeTypes={animeOnTop.types}
            description={animeOnTop.description.description}
            soundtrack={animeOnTop.soundtracks[0].mp3}
            watchLink={animeOnTop.watchLink}
            callAPI={callAPI}
            /> : null }
            
            {didUserVote ? <AnimeOnTopResults AOTData={AOTData}/> : <AnimeOnTopQuestionnaire id={AOTData._id} refresh={callAPI}/>}
        </section>
     );
}
 
export default AnimeOnTop;