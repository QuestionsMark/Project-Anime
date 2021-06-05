import React, { useState } from 'react';
import WTMQuestionnaire from './WTMQuestionnaire';
import WTMResults from './WTMResults';

const WhatsTheMelody = () => {

    const [didUserVote, setDidUserVote] = useState(true);

    return ( 
        <div className="WTM">
            {didUserVote ? <WTMResults /> : <WTMQuestionnaire />}
        </div>
     );
}
 
export default WhatsTheMelody;

// MuiButtonBase-root MuiButton-root MuiButton-text WTM__send Mui-disabled Mui-disabled
// MuiButtonBase-root MuiButton-root MuiButton-text WTM__send