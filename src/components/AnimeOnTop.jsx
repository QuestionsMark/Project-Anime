import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import MovieCreationRoundedIcon from '@material-ui/icons/MovieCreationRounded';

import AOTImg from '../media/img/sak6-spec.jpg';
import AOTMp3 from '../media/mp3/sak.mp3';
import AnimeOnTopQuestionnaire from './AnimeOnTopQuestionnaire';
import AnimeOnTopResults from './AnimeOnTopResults';

let audio;
let volumeXD;
let prevScroll;

const AnimeOnTop = () => {

    const [animeOnTop, setAnimeOnTop] = useState({
        title: 'Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai',
        img: AOTImg,
        // ścieżka do obrazka w public
        rate: 9.45,
        types: ["Dramat", "Komedia", "Psychologiczne", "Romans", "Okruchy Życia"],
        soundtrack: AOTMp3,
        //ścieżka do soundtracka
        movie: 'https://anime-odcinki.pl'
    })
    const [didUserVote, setDidUserVote] = useState(false);

    const handleMusic = () => {
        const audio = document.querySelector('.AOT__audio');
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.pause();
        }
    }

    const setScroll = (volume, prevscroll) => {
        document.querySelector('.AOT__hehe').scrollTop = 100000;
        audio.volume = volume
        prevScroll = prevscroll
    }

    const handleVolumeChange = (e) => {
        if(!audio.paused) {
            if (prevScroll > e.target.scrollTop) {
                if(audio.volume < 0.98) {
                    audio.volume = audio.volume + 0.01;
                }
                prevScroll = e.target.scrollTop;
            } else if (prevScroll < e.target.scrollTop) {
                if(audio.volume > 0.02) {
                    audio.volume = audio.volume - 0.01;
                }
                prevScroll = e.target.scrollTop;
            }
        }
    }

    const types = [...animeOnTop.types].map(type => <Link to="/type" key={type} className="AOT__type">{type}</Link>);

    useEffect(() => {
        audio = document.querySelector('.AOT__audio');
        volumeXD = 0.5;
        setScroll(0.5, 100000);
    },[])

    return ( 
        <section className="AOT main__section scrollNav" data-id="1">
            <h2 className="AOT__title">Anime na Topie!</h2>
            <div className="AOT__animeContent">
                <div className="AOT__left">
                    <div className="AOT__imgWrapper">
                        <img src={animeOnTop.img} alt="Anime" className="img" />
                    </div>
                    <div className="AOT__rate">
                        <StarRateRoundedIcon className="AOT__rateIcon"/>
                        <p className="AOT__rateValue">{animeOnTop.rate}</p>
                    </div>
                </div>
                <div className="AOT__center">
                    <Link to="/page/coś" className="AOT__animeTitle">{animeOnTop.title}</Link>
                    {/* link zrobić! */}
                    <div className="AOT__types">
                        {types}
                    </div>
                    <p className="AOT__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem porro provident ex accusantium magnam deserunt, praesentium delectus quae molestiae, officia ut tenetur recusandae soluta corrupti tempore? Commodi consequatur totam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam iure alias facilis nihil praesentium id! Voluptatibus quasi mollitia quod! Delectus eius eveniet dignissimos sunt? Expedita provident quos repellendus! Beatae, sapiente!</p>
                </div>
                <div className="AOT__right">
                    <div className="AOT__music" onClick={handleMusic}>
                        <audio src={animeOnTop.soundtrack} className="AOT__audio"></audio>
                        <MusicNoteRoundedIcon className="AOT__mediaIcon"/>
                        <span className="AOT__instruction">Kliknij, aby posłuchać. Scrolluj trzymając kursor na ikonie, aby zmienić głośność.</span>
                        <div className="AOT__hehe" onScroll={handleVolumeChange}>
                            <div className="AOT__range">
                                
                            </div>
                        </div>
                    </div>
                    <div className="AOT__movie">
                        <a href={animeOnTop.movie} target="_blank" rel="noreferrer" className="AOT__link">
                            <MovieCreationRoundedIcon className="AOT__mediaIcon"/>
                        </a>
                    </div>
                </div>
            </div>
            {didUserVote ? <AnimeOnTopResults /> : <AnimeOnTopQuestionnaire />}
        </section>
     );
}
 
export default AnimeOnTop;