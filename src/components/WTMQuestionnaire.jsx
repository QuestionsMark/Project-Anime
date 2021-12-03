import React, { useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

const WTMQuestionnaire = ({whatsTheMelody, getWhatsTheMelody}) => {

    const [,,,, user] = useUser();

    const [isLoaded, setIsLoaded] = useState(false);
    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState('00 : 00');
    const [volume, setVolume] = useState(50);
    const [progression, setProgression] = useState(0);
    const [vote, setVote] = useState('');

    const handleProgressionChange = (e) => {
        const audio = document.querySelector('.WTM__audio');
        const duration = audio.duration;
        const value = e.target.value;
        const newCurrentTime = duration * value / 100; 
        audio.currentTime = newCurrentTime;
        setProgression(value)
    };

    const handleChangeVote = (e) => {
        setVote(e.target.value)
    };

    const handleVote = async () => {
        if (vote) {
            setVote('');
            await fetch(`${HOST_ADDRESS}/whats-the-melody/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: whatsTheMelody.id,
                    userID: user.id,
                    vote,
                }),
            });
            getWhatsTheMelody();
        }
    };

    const handleTimeUpdate = (e) => {
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime.toFixed() - Math.floor(currentTime / 60) * 60;
        const durationTime = `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`;

        const progression = currentTime * 100 / duration;

        setCurrentTime(durationTime);
        setProgression(progression);
    };

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
    };

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
    };

    const handleVolumeChange = (e) => {
        const audio = document.querySelector('.WTM__audio');
        audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    };

    const handleSoundHoverOn = () => {
        const inpProgression = document.querySelector('.audioInterface__progression');
        const inpVolume = document.querySelector('.audioInterface__volume');
        inpProgression.style.width = '50px';
        inpVolume.style.width = '75px';
        inpVolume.style.marginRight = '5px';
        inpVolume.style.overflow = 'visible';
    };

    const handleSoundHoverOff = () => {
        const inpProgression = document.querySelector('.audioInterface__progression');
        const inpVolume = document.querySelector('.audioInterface__volume');
        inpProgression.style = '';
        inpVolume.style = '';
        inpVolume.style = '';
    };

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
    };

    const answearList = () => {
        return whatsTheMelody.votes.map((a, i) => <FormControlLabel key={i} className="WTM__label" value={a.title} control={<Radio />} label={a.title} />);
    };

    return ( 
        <>
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <audio src={`${HOST_ADDRESS}/soundtracks/${whatsTheMelody.mp3}`} className="WTM__audio none" onLoadedData={setAudio} onTimeUpdate={handleTimeUpdate} ></audio>
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
                    <RadioGroup value={vote} onChange={handleChangeVote}>
                        {answearList()}
                    </RadioGroup>
                </FormControl>
            </div>
            <Button className={`button WTM__send ${vote ? '' : 'Mui-disabled'}`} onClick={handleVote}>Sprawdź</Button>
        </>
     );
}
 
export default WTMQuestionnaire;