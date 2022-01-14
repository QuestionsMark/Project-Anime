class Audio {
    constructor(audio, mp3) {
        this.audio = audio;
        this.mp3 = mp3;
        this.isRunning = !audio.paused;
        this.volume = 20;
        this.prevVolume = 20;
        this.duration = audio.duration;
        this.currentTime = audio.currentTime;
    }

    _getTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.round(time % 60);
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    initAudio() {
        this.audio.volume = this.volume / 100;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    getDurationText() {
        return this._getTime(this.duration);
    }

    getCurrentTimeText() {
        return this._getTime(this.currentTime);
    }

    setCurrentTime(time) {
        this.currentTime = time;
    }

    setVolume(volume) {
        this.audio.volume = volume / 100;
        this.prevVolume = this.volume;
        this.volume = volume;
    }

    getVolume() {
        return this.volume;
    }

    setProgress(value) {
        const time = value * this.duration / 100;
        this.audio.currentTime = time;
    }

    getProgress() {
        return this.currentTime * 100 / this.duration;
    }

    complete() {
        this.isRunning = !this.audio.paused;
        this.currentTime = 0;
    }
}

export default Audio;