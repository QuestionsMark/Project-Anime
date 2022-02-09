import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import {
    StarRateRounded,
    MusicNoteRounded,
    MovieCreationRounded,
    CachedRounded
} from '@material-ui/icons';

import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';
import { textHelper } from '../../utils/textHelper';

const AnimeOnTopAnimeInfo = ({animeData, setAnimeData, getAnimeOnTop}) => {

    const { id, rate, title, types, watchLink, images, soundtracks } = animeData;
    const img = images.mini.id;
    const description = animeData.description.description;
    const soundtrack = soundtracks[0].id;

    const audio = useRef();

    const { authorization } = useUser();

    const [volume, setVolume] = useState(0.1);

    const handleMusic = () => {
        if (audio.current.paused) {
            audio.current.currentTime = 0;
            audio.current.play();
        } else {
            audio.current.pause();
        }
    };
    const handleVolumeChange = e => {
        const { deltaY } = e;
        if (deltaY < 0) {
            if (volume === 0) return;
            if (volume <= 0.02) return setVolume(0);
        }
        if (deltaY > 0) {
            if (volume === 1) return;
            if (volume >= 0.98) return setVolume(1);
        }
        setVolume(prev => prev + (deltaY / 10000 * 2));
    };
    
    const handleFinishAOT = async () => {
        await fetch(`${HOST_ADDRESS}/anime-on-top`, {
            method: 'POST'
        });
        setAnimeData(null);
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
        audio.current.volume = volume;
    }, [volume]);

    return ( 
        <>
            {authorization === '3' ? <div className="AOT__adminPanel">
                <CachedRounded className="AOT__finish-icon" onClick={handleFinishAOT}/>
            </div> : null}
            <div className="AOT__animeContent">
                <div className="AOT__left">
                    <div className="AOT__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${img})` }}>
                        {/* <img src={`${HOST_ADDRESS}/images/${img}`} alt="Anime" className="img" /> */}
                    </div>
                    <div className="AOT__rate">
                        <StarRateRounded className="AOT__rateIcon"/>
                        <p className="AOT__rateValue">{showRate()}</p>
                    </div>
                </div>
                <div className="AOT__center">
                    <Link to={`/anime/${id}`} className="AOT__animeTitle">{title}</Link>
                    <div className="AOT__types">
                        {typesList()}
                    </div>
                    <div className="AOT__description text--indent">{textHelper(description)}</div>
                </div>
                <div className="AOT__right">
                    <Popup className="normal-popup" on="hover" position="top center" trigger={<div className="AOT__music" onClick={handleMusic} onWheel={handleVolumeChange}>
                        <audio src={`${HOST_ADDRESS}/soundtracks/${soundtrack}`} ref={audio} className="AOT__audio"></audio>
                        <MusicNoteRounded className="AOT__mediaIcon"/>
                    </div>}>
                        <p className="AOT__music-instruction">Kliknij, aby posłuchać. Scrolluj trzymając kursor na ikonie, aby zmienić głośność.</p>
                        <p className="AOT__music-instruction">Obecna głośność: <span className="AOT__music-volume">{(volume * 100).toFixed(0)}%</span></p>
                    </Popup>
                    <div className="AOT__movie">
                        <a href={watchLink} target="_blank" rel="noreferrer" className="AOT__link">
                            <MovieCreationRounded className="AOT__mediaIcon"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AnimeOnTopAnimeInfo;