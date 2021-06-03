import React, { useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

import whatsTheMelody from '../media/mp3/sak.mp3';

const WTMQuestionnaire = () => {

    const [melody, setMelody] = useState(whatsTheMelody);
    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState('00 : 00');
    const [volume, setVolume] = useState(50);
    const [progression, setProgression] = useState(0);
    const [WTMAnswear, setWTMAnswear] = useState('');

    const handleProgressionChange = (e) => {
        const audio = document.querySelector('.WTM__audio');
        const duration = audio.duration;
        const value = e.target.value;
        const newCurrentTime = duration * value / 100; 
        audio.currentTime = newCurrentTime;
        setProgression(value)
    }

    const handleWTMAnswearChange = (e) => {
        setWTMAnswear(e.target.value)
    }

    const handleSendAnswear = (e) => {
        const answear = WTMAnswear;
        let target = e.target;
        if (target.localName === "span") {
            target = target.parentElement;
        }
        if (answear !== '') {
            target.disabled = true;
            console.log(`fetchujemy z ${answear}`);
            target.classList.add('Mui-disabled');
        } else {
            console.log('jesteś zjebem');
        }
    }

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

    const handlePlayPauseClick = (e) => {
        const audio = document.querySelector('.WTM__audio');
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
        const audio = document.querySelector('.WTM__audio');
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
        const audio = document.querySelector('.WTM__audio');
        audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    }

    const handleSoundHoverOn = () => {
        const inpProgression = document.querySelector('.audioInterface__progression');
        const inpVolume = document.querySelector('.audioInterface__volume');
        inpProgression.style.width = '2.5vw';
        inpVolume.style.width = '4.45vw';
        inpVolume.style.marginRight = '0.3vw';
        inpVolume.style.overflow = 'visible';
    }

    const handleSoundHoverOff = () => {
        const inpProgression = document.querySelector('.audioInterface__progression');
        const inpVolume = document.querySelector('.audioInterface__volume');
        inpProgression.style = '';
        inpVolume.style = '';
        inpVolume.style = '';
    }

    const setAudio = () => {
        const audio = document.querySelector('.WTM__audio');
        const time = audio.duration;
        const minutes = Math.floor(time / 60);
        const seconds = time.toFixed() - Math.floor(time / 60) * 60;
        const duration = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`
        setDuration(duration);
    }

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <audio src={melody} className="WTM__audio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate}></audio>
            <div className="audioInterface">
                <div className="audioInterface__playPause">
                    <PlayArrowRoundedIcon className="audioInterface__icon play active" onClick={handlePlayPauseClick} />
                    <PauseRoundedIcon className="audioInterface__icon pause" onClick={handlePlayPauseClick} />
                </div>
                <div className="audioInterface__time">
                    <p className="audioInterface__time"><span className="audioInterface__actualDuration">{currentTime}</span> / <span className="audioInterface__duration">{duration}</span></p>
                </div>
                <input type="range" min="0" max="100" value={progression} onChange={handleProgressionChange} className="audioInterface__progression" />
                <div className="audioInterface__sound" onMouseEnter={handleSoundHoverOn} onMouseLeave={handleSoundHoverOff}>
                    <input type="range" min="0" max="100" value={volume} className="audioInterface__volume" onChange={handleVolumeChange}/>
                    <VolumeUpRoundedIcon className="audioInterface__icon volumeOn active" onClick={handleSoundClick} />
                    <VolumeOffRoundedIcon className="audioInterface__icon VolumOff" onClick={handleSoundClick} />
                </div>
            </div>
            <div className="WTM__answears">
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={WTMAnswear} onChange={handleWTMAnswearChange}>
                        <FormControlLabel className="WTM__label" value="Kimi no Na Wa" control={<Radio />} label="Kimi no Na Wa" />
                        <FormControlLabel className="WTM__label" value="Koe no Katachi" control={<Radio />} label="Koe no Katachi" />
                        <FormControlLabel className="WTM__label" value="Sakurasou no Pet na Kanojo" control={<Radio />} label="Sakurasou no Pet na Kanojo" />
                        <FormControlLabel className="WTM__label" value="Violet Evergarden" control={<Radio />} label="Violet Evergarden" />
                    </RadioGroup>
                </FormControl>
            </div>
            <Button className="button WTM__send" onClick={handleSendAnswear}>Sprawdź</Button>
        </>
     );
}
 
export default WTMQuestionnaire;