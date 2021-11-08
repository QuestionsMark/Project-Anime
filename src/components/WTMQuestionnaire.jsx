import React, { useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

import { HOST_ADDRESS } from '../config';

const WTMQuestionnaire = ({id, mp3, answears, getWTM}) => {

    const [isLoaded, setIsLoaded] = useState(false);
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
        let target = e.target;
        if (target.localName === "span") {
            target = target.parentElement;
        }
        if (WTMAnswear !== '') {
            target.disabled = true;
            target.classList.add('Mui-disabled');
            const WTMID = id;
            fetch(`${HOST_ADDRESS}/wtm/vote`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    WTMID,
                    user: localStorage.getItem('UID'),
                    vote: WTMAnswear
                })
            })
                .then(res => res.json())
                .then(res => {
                    getWTM()
                });
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
        inpProgression.style.width = '50px';
        inpVolume.style.width = '75px';
        inpVolume.style.marginRight = '5px';
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
        audio.volume = 0.5;
        const time = audio.duration;
        const minutes = Math.floor(time / 60);
        const seconds = time.toFixed() - Math.floor(time / 60) * 60;
        const duration = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`
        setDuration(duration);
        setProgression(0);
        setIsLoaded(true)
    }

    const answearList = answears.map((a, i) => <FormControlLabel key={i} className="WTM__label" value={a} control={<Radio />} label={a} />);

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <audio src={`${HOST_ADDRESS}/soundtracks/${mp3}`} className="WTM__audio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate} ></audio>
            {isLoaded ? <div className="audioInterface">
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
                    <VolumeUpRoundedIcon className="audioInterface__icon volumeOn last active" onClick={handleSoundClick} />
                    <VolumeOffRoundedIcon className="audioInterface__icon VolumOff last" onClick={handleSoundClick} />
                </div>
            </div> : <p className="WTM__loading">Loading...</p>}
            <div className="WTM__answears">
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={WTMAnswear} onChange={handleWTMAnswearChange}>
                        {answearList}
                        {/* <FormControlLabel className="WTM__label" value="Kimi no Na Wa" control={<Radio />} label="Kimi no Na Wa" />
                        <FormControlLabel className="WTM__label" value="Koe no Katachi" control={<Radio />} label="Koe no Katachi" />
                        <FormControlLabel className="WTM__label" value="Sakurasou no Pet na Kanojo" control={<Radio />} label="Sakurasou no Pet na Kanojo" />
                        <FormControlLabel className="WTM__label" value="Violet Evergarden" control={<Radio />} label="Violet Evergarden" /> */}
                    </RadioGroup>
                </FormControl>
            </div>
            <Button className="button WTM__send" onClick={handleSendAnswear}>Sprawdź</Button>
        </>
     );
}
 
export default WTMQuestionnaire;