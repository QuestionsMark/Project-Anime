import React, { useEffect, useRef, useState } from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';

import Audio from '../utils/Audio';
import LoadingMini from '../components/LoadingMini';

import { HOST_ADDRESS } from '../config';

const AudioComponent = ({id, isUrl = false}) => {

    const componentRef = useRef();
    const inpProgressDOM = useRef();
    const inpVolumeDOM = useRef();

    const [src, setSrc] = useState('');
    const [audio, setAudio] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(20);

    const handleToggleVolume = () => {
        if (!audio) return;
        if (volume === 0) {
            audio.setVolume(audio.prevVolume < 2 ? 20 : audio.prevVolume);
            setVolume(audio.getVolume());
        } else {
            audio.setVolume(0);
            setVolume(audio.getVolume());
        }
    };
    const handleVolumeChange = (e) => {
        if (!audio) return;
        audio.setVolume(e.target.value * 1);
        setVolume(audio.getVolume());
    };
    const handleWheelVolumeChange = (e) => {
        if (!audio) return;
        const { deltaY } = e;
        if (deltaY < 0) {
            if (volume === 0) return;
            if (volume <= 5) {
                audio.setVolume(0);
                setVolume(audio.getVolume());
                return;
            }
        }
        if (deltaY > 0) {
            if (volume === 100) return;
            if (volume >= 95) {
                audio.setVolume(100);
                setVolume(audio.getVolume());
                return;
            }
        }
        audio.setVolume(audio.volume + (deltaY / 100 * 5));
        setVolume(audio.getVolume());
    };

    const handlePlay = () => {
        if (!audio) return;
        if (isRunning) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsRunning(prev => !prev);
    };

    const handleProgressChange = (e) => {
        if (!audio) return;
        audio.setProgress(e.target.value);
        setProgress(audio.getProgress());
    };

    const handleMouseEnter = () => {
        inpProgressDOM.current.classList.add('hide');
        inpVolumeDOM.current.classList.add('visible');
    };
    const handleMouseLeave = () => {
        inpProgressDOM.current.classList.remove('hide');
        inpVolumeDOM.current.classList.remove('visible');
    };

    const handleTimeUpdate = (e) => {
        if (!audio) return;
        audio.setCurrentTime(e.target.currentTime);
        setCurrentTime(audio.getCurrentTimeText());
        setProgress(audio.getProgress());
    };

    const handleComplete = () => {
        if (!audio) return;
        audio.complete();
        setAudioState();
    };

    const setSource = async () => {
        if(isUrl) return setSrc(id);
        const response = await fetch(`${HOST_ADDRESS}/soundtracks/${id}`);
        if (!componentRef.current) return;
        if (response.ok) {
            const buffer = await response.arrayBuffer();
            setSrc(URL.createObjectURL(new Blob([buffer])));
        }
    };

    const onLoadHandler = (e) => {
        setAudio(new Audio(e.target));
    };

    const setAudioState = () => {
        setIsRunning(audio.isRunning);
        setVolume(audio.getVolume());
        setDuration(audio.getDurationText());
        setCurrentTime(audio.getCurrentTimeText());
        setProgress(audio.getProgress());
    };

    const togglePlayPauseComponent = () => {
        return isRunning ? <PauseRoundedIcon className="audio__Icon" onClick={handlePlay}/> : <PlayArrowRoundedIcon className="audio__Icon" onClick={handlePlay}/>;
    };

    const toggleVolumeComponent = () => {
        if (volume === 0) return <VolumeOffRoundedIcon className="audio__Icon" onClick={handleToggleVolume}/>;
        if (volume <= 50) return <VolumeDownRoundedIcon className="audio__Icon" onClick={handleToggleVolume}/>;
        if (volume > 50) return <VolumeUpRoundedIcon className="audio__Icon" onClick={handleToggleVolume}/>;
    };

    useEffect(() => {
        setSrc('');
        setSource();
    }, [id]);

    useEffect(() => {
        if (!audio) return;
        audio.initAudio();
        setAudioState();
    }, [audio]);

    return ( 
        <div className="audio" ref={componentRef}>
            <audio src={src} className='audio__audio' onTimeUpdate={handleTimeUpdate} onLoadedData={onLoadHandler} onEnded={handleComplete}/>
            {src ? <div className="audio__interface">
                <div className="audio__run">
                    {togglePlayPauseComponent()}
                </div>
                <div className="audio__time">
                    {currentTime} / {duration}
                </div>
                <div className="audio__progress">
                    <input type="range" min={0} max={100} ref={inpProgressDOM} className="audio__inp-progress" value={progress} onChange={handleProgressChange} />
                </div>
                <div className="audio__volume" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onWheel={handleWheelVolumeChange}>
                    <input type="range" min={0} max={100} ref={inpVolumeDOM} className="audio__inp-volume" value={volume} onChange={handleVolumeChange} />
                    <div className="audio__volume-state">
                        {toggleVolumeComponent()}
                    </div>
                </div>
            </div> : <LoadingMini />}
        </div>
     );
}
 
export default AudioComponent;