import React, { useEffect, useState } from 'react';
import { HOST_ADDRESS } from '../config';

import { useUser } from '../contexts/UserProvider';

import DailyAnime from './DailyAnime';
import WhatsTheMelody from './WhatsTheMelody';
import WhatsTheMelodyComments from './WhatsTheMelodyComments';

const RightSide = () => {

    const [status,,,, user] = useUser();

    const [dailyAnime, setDailyAnime] = useState(null);
    const getDailyAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/daily-anime`);
        if (response.ok) {
            const dailyAnime = await response.json();
            setDailyAnime(dailyAnime);
        }
    };

    const [whatsTheMelody, setWhatsTheMelody] = useState(null);
    const getWhatsTheMelody = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/actual`);
        if (response.ok) {
            const whatsTheMelody = await response.json();
            setWhatsTheMelody(whatsTheMelody);
        }
    };

    const [didUserVote, setDidUserVote] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const checkDidUserVote = () => {
        const users = [];
        whatsTheMelody.votes.forEach(v => users.push(...v.votes));
        const index = users.findIndex(u => u === user.id);
        if (index !== -1) {
            setDidUserVote(true);
            setIsChecked(true);
        } else {
            setDidUserVote(false);
            setIsChecked(true);
        }
    };

    const [whatsTheMelodyComments, setWhatsTheMelodyComments] = useState([]);
    const getWTMComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/${whatsTheMelody.id}/comments`);
        if (response.ok) {
            const comments = await response.json();
            setWhatsTheMelodyComments(comments);
        }
    };

    const handleRollDailyAnime = async () => {
        await fetch(`${HOST_ADDRESS}/daily-anime`, {
            method: 'POST',
        });
        getDailyAnime();
    };

    const handleFinishWhatsTheMelody = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody`, {
            method: 'POST'
        });
        if (response.ok) {
            getWhatsTheMelody()
        }
    };

    useEffect(() => {
        getDailyAnime();
        getWhatsTheMelody();
    }, []);

    useEffect(() => {
        if (status && JSON.stringify(user) !== "{}" && whatsTheMelody) {
            getWTMComments();
            checkDidUserVote();
        }
    }, [status, user, whatsTheMelody]);

    return ( 
        <div className="main__rightSide">
            {dailyAnime ? <DailyAnime dailyAnime={dailyAnime} handleRollDailyAnime={handleRollDailyAnime}/> : null}
            {whatsTheMelody && status ? <WhatsTheMelody whatsTheMelody={whatsTheMelody} getWhatsTheMelody={getWhatsTheMelody} handleFinishWhatsTheMelody={handleFinishWhatsTheMelody} didUserVote={didUserVote} isChecked={isChecked}/> : null}
            {status && whatsTheMelody && didUserVote ? <WhatsTheMelodyComments id={whatsTheMelody.id} whatsTheMelodyComments={whatsTheMelodyComments} getWTMComments={getWTMComments}/> : null}
        </div>
     );
}
 
export default RightSide;
