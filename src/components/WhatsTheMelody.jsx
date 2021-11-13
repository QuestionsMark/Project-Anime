import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import WTMQuestionnaire from './WTMQuestionnaire';
import WTMResults from './WTMResults';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';

const WhatsTheMelody = ({match}) => {

    const [status,, authorization,, user] = useUser();
    const { whatsTheMelody, setWhatsTheMelody } = useData();
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

    const handleFinish = async () => {
        const response = await fetch(`${HOST_ADDRESS}/whats-the-melody`, {
            method: 'POST'
        });
        if (response.ok) {
            getWhatsTheMelody()
        }
    }

    useEffect(() => {
        if (status && whatsTheMelody) {
            checkDidUserVote();
        }
    },[whatsTheMelody, match, status]);

    return ( 
        <div className="WTM">
            {authorization === '3' ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleFinish}>Zakończ</p>
            </div> : null}
            {!status ? <WTMResults /> : null}
            {didUserVote && status && isChecked ? <WTMResults /> : null}
            {!didUserVote && status ? <WTMQuestionnaire /> : null}
        </div>
     );
}
 
export default withRouter(WhatsTheMelody);