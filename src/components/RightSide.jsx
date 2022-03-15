import React, { useCallback, useEffect, useRef, useState } from 'react';

import LoadingSmall from './LoadingSmall';
import DailyAnime from './DailyAnime';
import Comments from './WTM/Comments';
import Questionnaire from './WTM/Questionnaire';
import Results from './WTM/Results';

import { useSocket } from '../contexts/SocketProvider';
import { useUser } from '../contexts/UserProvider';
import { HOST_ADDRESS } from '../config';

import plum from '../media/mp3/plum.mp3';

const RightSide = () => {

    const audioRef = useRef();

    const socket = useSocket();

    const { status, user } = useUser();

    const [DA, setDA] = useState(null);
    const [WTM, setWTM] = useState(null);
    const [WTMC, setWTMC] = useState([]);
    const getDailyAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/daily-anime`);
        if (response.ok) {
            const dailyAnime = await response.json();
            setDA(dailyAnime);
        }
    };
    const getWhatsTheMelody = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/actual`);
        if (response.ok) {
            const whatsTheMelody = await response.json();
            setWTM(whatsTheMelody);
        }
    };
    const getWTMComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/actual/comments`);
        if (response.ok) {
            const comments = await response.json();
            setWTMC(comments);
        }
    };

    const [didUserVote, setDidUserVote] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const checkDidUserVote = useCallback(() => {
        const users = [];
        for (const vote of WTM.votes) {
            users.push(...vote.votes);
        }
        const index = users.findIndex(u => u === user.id);
        if (index !== -1) {
            setDidUserVote(true);
            setIsChecked(true);
        } else {
            setDidUserVote(false);
            setIsChecked(true);
        }
    }, [WTM, user]);

    const handleRollDailyAnime = async () => {
        await fetch(`${HOST_ADDRESS}/daily-anime`, {
            method: 'POST',
        });
        getDailyAnime();
    };
    const handleRollWhatsTheMelody = async () => {
        await fetch(`${HOST_ADDRESS}/whats-the-melody`, {
            method: 'POST',
        });
        socket.emit('whats-the-melody-roll');
    };

    const scrollDown = () => {
        const scrollValue = document.querySelector('.main__rightSide').scrollHeight;
        document.querySelector('.main__rightSide').scroll({
            behavior: 'smooth',
            top: scrollValue
        });
        const scrollValue2 = document.querySelector('.WTMC__list').scrollHeight;
        document.querySelector('.WTMC__list').scroll({
            behavior: 'smooth',
            top: scrollValue2
        });
    };

    const dailyAnimeComponent = () => {
        return DA ? <DailyAnime dailyAnime={DA} handleRollDailyAnime={handleRollDailyAnime}/> : <div className="DA"><LoadingSmall /></div>;
    };
    const whatsTheMelodyComponent = () => {
        if (WTM) {
            if (status) {
                if (isChecked) {
                    if (didUserVote) {
                        return <Results whatsTheMelody={WTM} handleRollWhatsTheMelody={handleRollWhatsTheMelody}/>;
                    }
                    return <Questionnaire whatsTheMelody={WTM} getWhatsTheMelody={getWhatsTheMelody} handleRollWhatsTheMelody={handleRollWhatsTheMelody}/>;
                }
                return <div className="DA"><LoadingSmall /></div>;
            }
            return <Questionnaire whatsTheMelody={WTM} getWhatsTheMelody={getWhatsTheMelody} handleRollWhatsTheMelody={handleRollWhatsTheMelody}/>;
        }
        return <div className="DA"><LoadingSmall /></div>;
    };
    const whatsTheMelodyCommentsComponent = () => {
        if (status) {
            if (WTM) {
                if (isChecked) {
                    if (didUserVote) {
                        return <Comments id={WTM.id} whatsTheMelodyComments={WTMC} getWTMComments={getWTMComments}/>;
                    }
                    return null;
                }
                return <div className="DA"><LoadingSmall /></div>;
            }
            return <div className="DA"><LoadingSmall /></div>;
        }
        return null;
    };

    useEffect(() => {
        getDailyAnime();
        getWhatsTheMelody();
    }, []);

    useEffect(() => {
        if (JSON.stringify(user) === '{}' || !status || !WTM) return;
        checkDidUserVote();
        getWTMComments();
    }, [user, status, WTM, checkDidUserVote]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody-comment-like', async () => {
            if (isChecked && didUserVote) {
                await getWTMComments();
            }
        });
        return () => socket.off('whats-the-melody-comment-like');
    }, [didUserVote, isChecked, socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody-roll', async () => {
            audioRef.current.autoplay = true;
            audioRef.current.src = plum;
            await getWhatsTheMelody();
        });
        return () => socket.off('whats-the-melody-roll');
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody-new-comment', async () => {
            audioRef.current.autoplay = true;
            audioRef.current.src = plum;
            await getWTMComments();
            scrollDown();
        });
        return () => socket.off('whats-the-melody-new-comment');
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('whats-the-melody-refresh', async () => {
            await getWhatsTheMelody();
        });
        return () => socket.off('whats-the-melody-refresh');
    }, [socket]);

    return ( 
        <div className="main__rightSide">
            <audio src={plum} ref={audioRef} className="main__rightSIde-notification-audio"></audio>
            {dailyAnimeComponent()}
            {whatsTheMelodyComponent()}
            {whatsTheMelodyCommentsComponent()}
        </div>
     );
}
 
export default RightSide;