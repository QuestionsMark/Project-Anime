import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import WTMQuestionnaire from './WTMQuestionnaire';
import WTMResults from './WTMResults';

import { HOST_ADDRESS } from '../config';

const WhatsTheMelody = ({isUserLogged, match}) => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const checkAuthorization = (rank) => {
        if (rank === '3') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }
    const [whatsTheMelody, setWhatsTheMelody] = useState({
        mp3: '',
        answears: [],
        votes: [
            {
                title: '',
                value: [1,2],
            }
        ]
    })
    const [didUserVote, setDidUserVote] = useState(true);
    const checkDidUserVote = (wtmData) => {
        const users = [];
        wtmData.votes.forEach(v => users.push(...v.value))
        const index = users.findIndex(u => u === localStorage.getItem('UID'));
        if (index !== -1) {
            setDidUserVote(true);
        } else {
            setDidUserVote(false);
        }
    }

    const handleFinish = () => {
        fetch(`${HOST_ADDRESS}/wtm/finish`, {
            headers: {
                'authorization': localStorage.getItem('token')
            },
            method: 'PUT'
        })
            .then(() => callAPI())
    }

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/wtm/actual/questionnaire`)
            .then(res => res.json())
            .then(res => {
                setWhatsTheMelody(res)
                if (isUserLogged) {
                    checkDidUserVote(res)
                }
            })
        if (isUserLogged) {
            fetch(`${HOST_ADDRESS}/users/${localStorage.getItem('l')}`)
                .then(res => res.json())
                .then(res => {
                    checkAuthorization(res.rank);
                });
        }
    }

    useEffect(() => {
        callAPI();
    },[isUserLogged, match])

    return ( 
        <div className="WTM">
            {isAuthorized ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleFinish}>Zakończ</p>
            </div> : null}
            {didUserVote ? <WTMResults id={whatsTheMelody.id} results={whatsTheMelody.votes} isUserLogged={isUserLogged}/> : <WTMQuestionnaire id={whatsTheMelody.id} mp3={whatsTheMelody.mp3} answears={whatsTheMelody.answears} refresh={callAPI}/>}
        </div>
     );
}
 
export default withRouter(WhatsTheMelody);

// MuiButtonBase-root MuiButton-root MuiButton-text WTM__send Mui-disabled Mui-disabled
// MuiButtonBase-root MuiButton-root MuiButton-text WTM__send