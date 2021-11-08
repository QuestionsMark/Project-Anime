import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import WTMQuestionnaire from './WTMQuestionnaire';
import WTMResults from './WTMResults';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

const WhatsTheMelody = ({whatsTheMelody, getWTM, isUserLogged, match}) => {

    const [status,, authorization] = useUser();

    const [didUserVote, setDidUserVote] = useState(true);

    const checkDidUserVote = (wtmData) => {
        const users = [];
        wtmData.votes.forEach(v => users.push(...v.value))
        const index = users.findIndex(u => u === JSON.parse(localStorage.getItem('UID')));
        if (index !== -1) {
            setDidUserVote(true);
        } else {
            setDidUserVote(false);
        }
    }

    const handleFinish = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/finish`, {
            method: 'PUT'
        });
        const newWTM = await response.json();
        if (!newWTM.error) {
            getWTM()
        }
    }

    useEffect(() => {
        checkDidUserVote(whatsTheMelody);
    },[whatsTheMelody, match])

    return ( 
        <div className="WTM">
            {authorization === '2' || authorization === '3' ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleFinish}>Zakończ</p>
            </div> : null}
            {didUserVote || !status ? <WTMResults id={whatsTheMelody.id} results={whatsTheMelody.votes} isUserLogged={isUserLogged}/> : <WTMQuestionnaire id={whatsTheMelody.id} mp3={whatsTheMelody.mp3} answears={whatsTheMelody.answears} getWTM={getWTM}/>}
        </div>
     );
}
 
export default withRouter(WhatsTheMelody);