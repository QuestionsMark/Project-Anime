import React, { useState, useEffect } from 'react';
import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';
import { useWTMComments } from '../contexts/WTMCommentsProvider';

import DailyAnime from './DailyAnime';
import WhatsTheMelody from './WhatsTheMelody';
import WhatsTheMelodyComments from './WhatsTheMelodyComments';

const RightSide = ({isUserLogged}) => {

    const [status] = useUser();
    const [, setWTMComments] = useWTMComments();

    // const [isAuthorized, setIsAuthorized] = useState(false);

    const [dailyAnime, setDailyAnime] = useState(null);

    const [whatsTheMelody, setWhatsTheMelody] = useState(null);

    const getDailyAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/da`);
        const dailyAnime = await response.json();
        setDailyAnime(dailyAnime);
    }

    const getWTM = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/actual/questionnaire`);
        const whatsTheMelody = await response.json();
        if (!whatsTheMelody.error) {
            setWhatsTheMelody(whatsTheMelody);
        }
    }

    const getComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/comments`);
        const WTMComments = await response.json();
        if (!WTMComments.error) {
            setWTMComments(WTMComments);
        }
    }

    useEffect(() => {
        getDailyAnime();
        getWTM();
        getComments();
    },[isUserLogged])

    return ( 
        <div className="main__rightSide">
            {dailyAnime ? <DailyAnime dailyAnime={dailyAnime} getDailyAnime={getDailyAnime}/> : null}
            {whatsTheMelody ? <WhatsTheMelody whatsTheMelody={whatsTheMelody} getWTM={getWTM} isUserLogged={isUserLogged}/> : null}
            {whatsTheMelody && status ? <WhatsTheMelodyComments /> : null}
        </div>
     );
}
 
export default RightSide;
