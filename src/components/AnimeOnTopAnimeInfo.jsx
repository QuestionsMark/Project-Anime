import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import MovieCreationRoundedIcon from '@material-ui/icons/MovieCreationRounded';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

let audio;
let prevScroll;

const AnimeOnTopAnimeInfo = ({ anime, refresh, setAnime }) => {

    const { _id: id, rate, title, link, types, watchLink } = anime;
    const img = anime.images.mini.id;
    const description = anime.description.description;
    const soundtrack = anime.soundtracks[0].id;

    const [,, authorization] = useUser();

    const handleMusic = () => {
        const audio = document.querySelector('.AOT__audio');
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.pause();
        }
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

    const setScroll = (volume, prevscroll) => {
        document.querySelector('.AOT__hehe').scrollTop = 100000;
        audio.volume = volume
        prevScroll = prevscroll
    }
    
    const handleFinishAOT = async () => {
        await fetch(`${HOST_ADDRESS}/aot/finish`, {
            method: 'PUT'
        });
        setAnime();
        refresh();
    }

    const showRate = () => {
        let average = 0;
        if (rate.length > 0) {
            let rateValue = 0;
            rate.forEach(r => {
                rateValue += r.rate;
            })
            average = (rateValue / rate.length).toFixed(2) * 1;
        }
        
        return average;
    }

    const typesList = [...types].map(type => <Link to={`/types/${type.link}`} key={type.id} className="AOT__type">{type.name}</Link>);

    useEffect(() => {
        audio = document.querySelector('.AOT__audio');
        setScroll(0.5, 100000);
    },[])

    return ( 
        <>
            {authorization === '2' || authorization === '3' ? <div className="AOT__adminPanel">
                <p className="AOT__finish" data-id={id} onClick={handleFinishAOT}>Zakończ</p>
            </div> : null}
            <div className="AOT__animeContent">
                <div className="AOT__left">
                    <div className="AOT__imgWrapper">
                        <img src={`${HOST_ADDRESS}/images/${img}`} alt="Anime" className="img" />
                    </div>
                    <div className="AOT__rate">
                        <StarRateRoundedIcon className="AOT__rateIcon"/>
                        <p className="AOT__rateValue">{showRate()}</p>
                    </div>
                </div>
                <div className="AOT__center">
                    <Link to={`/pages/${link}`} className="AOT__animeTitle">{title}</Link>
                    <div className="AOT__types">
                        {typesList}
                    </div>
                    <p className="AOT__description">{description}</p>
                </div>
                <div className="AOT__right">
                    <div className="AOT__music" onClick={handleMusic}>
                        <audio src={`${HOST_ADDRESS}/soundtracks/${soundtrack}`} className="AOT__audio"></audio>
                        <MusicNoteRoundedIcon className="AOT__mediaIcon"/>
                        <span className="AOT__instruction">Kliknij, aby posłuchać. Scrolluj trzymając kursor na ikonie, aby zmienić głośność.</span>
                        <div className="AOT__hehe" onScroll={handleVolumeChange}>
                            <div className="AOT__range">
                                
                            </div>
                        </div>
                    </div>
                    <div className="AOT__movie">
                        <a href={watchLink} target="_blank" rel="noreferrer" className="AOT__link">
                            <MovieCreationRoundedIcon className="AOT__mediaIcon"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AnimeOnTopAnimeInfo;