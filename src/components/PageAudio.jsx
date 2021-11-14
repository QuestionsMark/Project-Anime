import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { HOST_ADDRESS } from '../config';

const PageAudio = ({soundtrack, animeData, getAnime}) => {

    const audio = useRef();
    const playIcon = useRef();
    const pauseIcon = useRef();
    const inpProgression = useRef();
    const inpVolume = useRef();
    const muteIcon = useRef();
    const unmuteIcon = useRef();

    const {id, composer, title, likes} = soundtrack;

    const [, setOpen,, setResponse] = useResponsePopup();
    const [,,authorization,,user] = useUser();

    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [volume, setVolume] = useState(50);
    const [progression, setProgression] = useState(0);

    const handleTimeUpdate = () => {
        const duration = audio.current.duration;
        const currentTime = audio.current.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime.toFixed() - Math.floor(currentTime / 60) * 60;
        const durationTime = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
        setCurrentTime(durationTime);
        const progression = currentTime * 100 / duration;
        setProgression(progression);
    };
    const handleProgressionChange = e => {
        const value = e.target.value;
        const duration = audio.current.duration;
        const newDuration = value * duration / 100;
        audio.current.currentTime = newDuration;
    };

    const handleMute = () => {
        audio.current.volume = 0;
        setVolume(0);
        muteIcon.current.classList.toggle('active');
        unmuteIcon.current.classList.toggle('active');
    };
    const handleUnmute = () => {
        audio.current.volume = 0.5;
        setVolume(50);
        muteIcon.current.classList.toggle('active');
        unmuteIcon.current.classList.toggle('active');
    };

    const handlePlay = () => {
        audio.current.play();
        playIcon.current.classList.toggle('active');
        pauseIcon.current.classList.toggle('active');
    };
    const handlePause = () => {
        audio.current.pause();
        playIcon.current.classList.toggle('active');
        pauseIcon.current.classList.toggle('active');
    };

    const handleVolumeChange = e => {
        audio.current.volume = e.target.value / 100;
        setVolume(e.target.value);
    }

    const handleSoundHoverOn = () => {
        inpProgression.current.style.width = '50px';
        inpVolume.current.style.width = '75px';
        inpVolume.current.style.marginRight = '5px';
        inpVolume.current.style.overflow = 'visible';
    };
    const handleSoundHoverOff = () => {
        inpProgression.current.style = '';
        inpVolume.current.style = '';
    };








    const isActive = () => {
        if (likes.findIndex(l => l === user.id) !== -1) {
            return 'active';
        }
        return '';
    };

    const handleLikeClick = async () => {
        if (JSON.stringify(user) !== "{}") {
            await fetch(`${HOST_ADDRESS}/soundtracks/like/${id}/${animeData.id}/${user.id}`, {
                method: 'PUT',
            });
            getAnime();
        } else {
            // Przenieś do logowania
        }
    };

    const handleRemove = async () => {
        const response = await fetch(`${HOST_ADDRESS}/soundtracks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });
        if (response.ok) {
            const response2 = await fetch(`${HOST_ADDRESS}/anime/soundtrack`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animeID: animeData.id,
                    id,
                }),
            });
            if (response2.ok) {
                setResponse({status: response2.ok, message: 'Soundtrack został usunięty.'});
            } else {
                const error = await response2.json();
                setResponse({status: response2.ok, message: error.message});
            }
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        } 
        setOpen(true);
    };

    const setAudio = () => {
        audio.current.volume = 0.5;
        const time = audio.current.duration;
        const minutes = Math.floor(time / 60);
        const seconds = time.toFixed() - Math.floor(time / 60) * 60;
        const duration = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
        setDuration(duration);
    };

    return ( 
        <div className="page__soundtrack">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <audio src={`${HOST_ADDRESS}/soundtracks/${id}`} ref={audio} className="audioInterface__pageAudio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate}></audio>
            <div className="audioInterface audioInterface--borderSize">
                <div className="audioInterface__playPause">
                    <PlayArrowRoundedIcon className="audioInterface__icon play active" ref={playIcon} onClick={handlePlay} />
                    <PauseRoundedIcon className="audioInterface__icon pause" ref={pauseIcon} onClick={handlePause} />
                </div>
                <div className="audioInterface__time">
                    <p className="audioInterface__time"><span className="audioInterface__actualDuration">{currentTime}</span> / <span className="audioInterface__duration">{duration}</span></p>
                </div>
                <input ref={inpProgression} type="range" min="0" max="100" value={progression} onChange={handleProgressionChange} className="audioInterface__pageProgression audioInterface__createProgression" />
                <div className="audioInterface__sound" onMouseEnter={handleSoundHoverOn} onMouseLeave={handleSoundHoverOff}>
                    <input ref={inpVolume} type="range" min="0" max="100" value={volume} className="audioInterface__pageVolume audioInterface__createVolume" onChange={handleVolumeChange}/>
                    <VolumeUpRoundedIcon className="audioInterface__icon volumeOn last active" ref={unmuteIcon} onClick={handleMute} />
                    <VolumeOffRoundedIcon className="audioInterface__icon VolumOff last" ref={muteIcon} onClick={handleUnmute} />
                </div>
            </div>
            <p className="audioInterface__soundtrackInfo">{composer}&nbsp;&nbsp;-&nbsp;&nbsp;"{title}"</p>
            <div className="audioInterface__likes">
                <p className="audioInterface__likesValue">{likes.length}</p>
                <FavoriteBorderRoundedIcon className={`audioInterface__likeIcon ${JSON.stringify(user) !== "{}" ? isActive() : ''}`} onClick={(e) => {handleLikeClick(e)}}/>
            </div>
        </div>
     );
}
 
export default withRouter(PageAudio);