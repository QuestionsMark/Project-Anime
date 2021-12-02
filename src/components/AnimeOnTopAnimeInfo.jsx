import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import MovieCreationRoundedIcon from '@material-ui/icons/MovieCreationRounded';

import { HOST_ADDRESS } from '../config';

let prevScroll;

const AnimeOnTopAnimeInfo = ({animeData}) => {

    const { id, rate, title, types, watchLink, images, soundtracks } = animeData;
    const img = images.mini.id;
    const description = animeData.description.description;
    const soundtrack = soundtracks[0].id;

    const audio = useRef();

    const [,, authorization] = useUser();
    const { setAnimeOnTop } = useData();
    const getAnimeOnTop = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
        if (response.ok) {
            const animeOnTop = await response.json();
            setAnimeOnTop(animeOnTop);
        }
    };

    const handleMusic = () => {
        if (audio.current.paused) {
            audio.current.currentTime = 0;
            audio.current.play();
        } else {
            audio.current.pause();
        }
    };
    const handleVolumeChange = (e) => {
        if(!audio.current.paused) {
            if (prevScroll > e.target.scrollTop) {
                if(audio.current.volume < 0.98) {
                    audio.current.volume = audio.current.volume + 0.01;
                }
                prevScroll = e.target.scrollTop;
            } else if (prevScroll < e.target.scrollTop) {
                if(audio.current.volume > 0.02) {
                    audio.current.volume = audio.current.volume - 0.01;
                }
                prevScroll = e.target.scrollTop;
            }
        }
    };
    const setScroll = (volume, prevscroll) => {
        audio.current.scrollTop = 100000;
        audio.current.volume = volume
        prevScroll = prevscroll
    };
    
    const handleFinishAOT = async () => {
        await fetch(`${HOST_ADDRESS}/anime-on-top`, {
            method: 'POST'
        });
        getAnimeOnTop();
    };

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
    };

    const typesList = () => {
        return [...types].map(type => <Link to={`/types/${type.name}`} key={type.id} className="AOT__type">{type.name}</Link>);
    };

    useEffect(() => {
        setScroll(0.5, 100000);
    },[]);

    return ( 
        <>
            {authorization === '3' ? <div className="AOT__adminPanel">
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
                    <Link to={`/anime/${id}`} className="AOT__animeTitle">{title}</Link>
                    <div className="AOT__types">
                        {typesList()}
                    </div>
                    <p className="AOT__description">{description}</p>
                </div>
                <div className="AOT__right">
                    <Popup className="normal-popup" on="hover" position="top center" trigger={<div className="AOT__music" onClick={handleMusic}>
                        <audio src={`${HOST_ADDRESS}/soundtracks/${soundtrack}`} ref={audio} className="AOT__audio"></audio>
                        <MusicNoteRoundedIcon className="AOT__mediaIcon"/>
                        <div className="AOT__hehe" onScroll={handleVolumeChange}>
                            <div className="AOT__range" />
                        </div>
                    </div>}>
                        Kliknij, aby posłuchać. Scrolluj trzymając kursor na ikonie, aby zmienić głośność.
                    </Popup>
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