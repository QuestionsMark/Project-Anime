import React, { useState } from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

const Audio = ({mp3}) => {

    const [melody, setMelody] = useState(mp3);
    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState('00 : 00');
    const [volume, setVolume] = useState(50);
    const [progression, setProgression] = useState(0);

    const handleTimeUpdate = (e) => {
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime.toFixed() - Math.floor(currentTime / 60) * 60;
        const durationTime = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`;

        const progression = currentTime * 100 / duration;

        setCurrentTime(durationTime);
        setProgression(progression);
    }

    const handleProgressionChange = (e) => {
        const audio = document.querySelector('.audioInterface__pageAudio');
        const duration = audio.duration;
        const value = e.target.value;
        const newCurrentTime = duration * value / 100; 
        audio.currentTime = newCurrentTime;
        setProgression(value)
    }

    const handlePlayPauseClick = (e) => {
        const audio = document.querySelector('.audioInterface__pageAudio');
        let target = e.target;
        if (e.target.localName === 'path') {
            target = e.target.parentElement;
        }
        let target2
        if(target.classList.contains('play')) {
            target2 = target.nextSibling;
            audio.play();
        } else {
            target2 = target.previousSibling;
            audio.pause();
        }
        target.classList.toggle('active');
        target2.classList.toggle('active');
    }

    const handleSoundClick = (e) => {
        const audio = document.querySelector('.audioInterface__pageAudio');
        let target = e.target;
        if (e.target.localName === 'path') {
            target = e.target.parentElement;
        }
        let target2
        if(target.classList.contains('volumeOn')) {
            target2 = target.nextSibling;
            audio.volume = 0;
            setVolume(0);
        } else {
            target2 = target.previousSibling;
            audio.volume = 0.5;
            setVolume(50);
        }
        target.classList.toggle('active');
        target2.classList.toggle('active');
    }

    const handleVolumeChange = (e) => {
        const audio = document.querySelector('.audioInterface__pageAudio');
        audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    }

    const handleSoundHoverOn = () => {
        const inpProgression = document.querySelector('.audioInterface__pageProgression');
        const inpVolume = document.querySelector('.audioInterface__pageVolume');
        inpProgression.style.width = '50px';
        inpVolume.style.width = '75px';
        inpVolume.style.marginRight = '5px';
        inpVolume.style.overflow = 'visible';
    }

    const handleSoundHoverOff = () => {
        const inpProgression = document.querySelector('.audioInterface__pageProgression');
        const inpVolume = document.querySelector('.audioInterface__pageVolume');
        inpProgression.style = '';
        inpVolume.style = '';
        inpVolume.style = '';
    }

    const setAudio = () => {
        const audio = document.querySelector('.audioInterface__pageAudio');
        const time = audio.duration;
        const minutes = Math.floor(time / 60);
        const seconds = time.toFixed() - Math.floor(time / 60) * 60;
        const duration = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`
        setDuration(duration);
    }

    return ( 
        <div className="audioInterface audioInterface--borderSize">
            <audio src={melody} className="audioInterface__pageAudio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate}></audio>
            <div className="audioInterface__playPause">
                <PlayArrowRoundedIcon className="audioInterface__icon play active" onClick={handlePlayPauseClick} />
                <PauseRoundedIcon className="audioInterface__icon pause" onClick={handlePlayPauseClick} />
            </div>
            <div className="audioInterface__time">
                <p className="audioInterface__time"><span className="audioInterface__actualDuration">{currentTime}</span> / <span className="audioInterface__duration">{duration}</span></p>
            </div>
            <input type="range" min="0" max="100" value={progression} onChange={handleProgressionChange} className="audioInterface__pageProgression" />
            <div className="audioInterface__sound" onMouseEnter={handleSoundHoverOn} onMouseLeave={handleSoundHoverOff}>
                <input type="range" min="0" max="100" value={volume} className="audioInterface__pageVolume" onChange={handleVolumeChange}/>
                <VolumeUpRoundedIcon className="audioInterface__icon volumeOn last active" onClick={handleSoundClick} />
                <VolumeOffRoundedIcon className="audioInterface__icon VolumOff last" onClick={handleSoundClick} />
            </div>
        </div>
     );
}
 
export default Audio;