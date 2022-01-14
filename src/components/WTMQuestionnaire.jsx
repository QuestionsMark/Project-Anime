import React, { useState } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';

import Audio from '../components/Audio';

import { useUser } from '../contexts/UserProvider';
import { useLoginPopup } from '../contexts/LoginPopup';

import { HOST_ADDRESS } from '../config';

const WTMQuestionnaire = ({whatsTheMelody, getWhatsTheMelody}) => {

    const { user, status } = useUser();
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
                getWhatsTheMelody();
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