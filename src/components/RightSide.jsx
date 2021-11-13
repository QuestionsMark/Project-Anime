import React, { useEffect, useState } from 'react';

import { useData } from '../contexts/DataProvider';
import { useUser } from '../contexts/UserProvider';

import DailyAnime from './DailyAnime';
import WhatsTheMelody from './WhatsTheMelody';
import WhatsTheMelodyComments from './WhatsTheMelodyComments';

const RightSide = () => {

    const { dailyAnime, whatsTheMelody } = useData();
    const [status,,,, user] = useUser();

    const [didUserVote, setDidUserVote] = useState(false);
    const checkDidUserVote = () => {
        const users = [];
        whatsTheMelody.votes.forEach(v => users.push(...v.votes));
        const index = users.findIndex(u => u === user.id);
        if (index !== -1) {
            setDidUserVote(true);
        } else {
            setDidUserVote(false);
        }
    };

    useEffect(() => {
        if (status && whatsTheMelody) {
            checkDidUserVote();
        }
    }, [status, whatsTheMelody]);

    return ( 
        <div className="main__rightSide">
            {dailyAnime ? <DailyAnime /> : null}
            {whatsTheMelody ? <WhatsTheMelody /> : null}
            {whatsTheMelody && didUserVote ? <WhatsTheMelodyComments /> : null}
        </div>
     );
}
 
export default RightSide;
