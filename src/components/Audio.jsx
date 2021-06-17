import React, { useEffect, useState } from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

const Audio = ({mp3}) => {

    const [melody, setMelody] = useState(mp3);
    const [duration, setDuration] = useState(0);
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
        const audio = e.target.parentElement.previousSibling;
        const duration = audio.duration;
        const value = e.target.value;
        const newCurrentTime = duration * value / 100; 
        audio.currentTime = newCurrentTime;
        setProgression(value)
    }

    const handlePlayPauseClick = (e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement;
        }
        const audio = target.parentElement.parentElement.previousSibling;
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
        let target = e.target;
        if (e.target.localName === 'path') {
            target = target.parentElement;
        }
        const audio = target.parentElement.parentElement.previousSibling;
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
        const audio = e.target.parentElement.parentElement.previousSibling;
        audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    }

    const handleSoundHoverOn = (e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement.parentElement;
        } else if (target.localName === "input") {
            target = target.parentElement;
        } else if (target.localName === "svg") {
            target = target.parentElement;
        }
        const inpProgression = target.previousSibling;
        const inpVolume = target.children[0];
        inpProgression.style.width = '50px';
        inpVolume.style.width = '75px';
        inpVolume.style.marginRight = '5px';
        inpVolume.style.overflow = 'visible';
    }

    const handleSoundHoverOff = () => {
        const inpProgression = document.querySelectorAll('.audioInterface__createProgression');
        const inpVolume = document.querySelectorAll('.audioInterface__createVolume');
        inpProgression.forEach(i => i.style = '');
        inpVolume.forEach(i => i.style = '');
    }

    const setAudio = (e) => {
        const audio = e.target;
        audio.volume = 0.5;
        const time = audio.duration;
        const minutes = Math.floor(time / 60);
        const seconds = time.toFixed() - Math.floor(time / 60) * 60;
        const duration = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`
        setDuration(duration);
    }

    useEffect(() => {
        setMelody(mp3);
    },[mp3])

    return ( 
        <>
            <audio src={melody} className="audioInterface__pageAudio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate}></audio>
            <div className="audioInterface audioInterface--borderSize">
                <div className="audioInterface__playPause">
                    <PlayArrowRoundedIcon className="audioInterface__icon play active" onClick={handlePlayPauseClick} />
                    <PauseRoundedIcon className="audioInterface__icon pause" onClick={handlePlayPauseClick} />
                </div>
                <div className="audioInterface__time">
                    <p className="audioInterface__time"><span className="audioInterface__actualDuration">{currentTime}</span> / <span className="audioInterface__duration">{duration}</span></p>
                </div>
                <input type="range" min="0" max="100" value={progression} onChange={handleProgressionChange} className="audioInterface__pageProgression audioInterface__createProgression" />
                <div className="audioInterface__sound" onMouseEnter={handleSoundHoverOn} onMouseLeave={handleSoundHoverOff}>
                    <input type="range" min="0" max="100" value={volume} className="audioInterface__pageVolume audioInterface__createVolume" onChange={handleVolumeChange}/>
                    <VolumeUpRoundedIcon className="audioInterface__icon volumeOn last active" onClick={handleSoundClick} />
                    <VolumeOffRoundedIcon className="audioInterface__icon VolumOff last" onClick={handleSoundClick} />
                </div>
            </div>
        </>
     );
}
 
export default Audio;