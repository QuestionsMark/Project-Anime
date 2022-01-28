import React, { useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

import Audio from '../components/Audio';

import { useUser } from '../contexts/UserProvider';
import { useLoginPopup } from '../contexts/LoginPopup';

import { HOST_ADDRESS } from '../config';
import { useSocket } from '../contexts/SocketProvider';

const WTMQuestionnaire = ({whatsTheMelody, handleRollWhatsTheMelody}) => {

    const socket = useSocket();

    const { user, status, authorization } = useUser();
    const { setOpenLoginScreen } = useLoginPopup();

    const [vote, setVote] = useState('');

    const handleChangeVote = (e) => {
        setVote(e.target.value)
    };

    const handleVote = async () => {
        if (vote) {
            setVote('');
            if (JSON.stringify(user) !== '{}' && status) {
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
                socket.emit('whats-the-melody-new-vote');
            } else {
                setOpenLoginScreen(true);
            }
        }
    };

    const answearList = () => {
        return whatsTheMelody.votes.map((a, i) => <FormControlLabel key={i} className="WTM__label" value={a.title} control={<Radio />} label={a.title} />);
    };

    return ( 
        <div className="WTM">
            {authorization === '3' ? <div className="AOT__adminPanel">
                <CachedRoundedIcon className="AOT__finish-icon" onClick={handleRollWhatsTheMelody}/>
            </div> : null}
            <h3 className="WTM__title">Gdzieś to słyszałam/em...</h3>
            <div className="WTM__audio">
                <Audio id={whatsTheMelody.mp3}/>
            </div>
            <div className="WTM__answears">
                <FormControl component="fieldset">
                    <RadioGroup value={vote} onChange={handleChangeVote}>
                        {answearList()}
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="WTM__button">
                <Button className={`button WTM__send ${vote ? '' : 'Mui-disabled'}`} onClick={handleVote}>Sprawdź</Button>
            </div>
        </div>
     );
}
 
export default WTMQuestionnaire;