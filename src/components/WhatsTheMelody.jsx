import React from 'react';
import { withRouter } from 'react-router-dom';

import WTMQuestionnaire from './WTMQuestionnaire';
import WTMResults from './WTMResults';

import { useUser } from '../contexts/UserProvider';

const WhatsTheMelody = ({whatsTheMelody, didUserVote, isChecked, handleFinishWhatsTheMelody, getWhatsTheMelody }) => {

    const [status,, authorization] = useUser();

    return ( 
        <div className="WTM">
            {authorization === '3' ? <div className="AOT__adminPanel">
                <p className="AOT__finish" onClick={handleFinishWhatsTheMelody}>Zakończ</p>
            </div> : null}
            {!status ? <WTMResults whatsTheMelody={whatsTheMelody}/> : null}
            {didUserVote && status && isChecked ? <WTMResults whatsTheMelody={whatsTheMelody}/> : null}
            {!didUserVote && status ? <WTMQuestionnaire whatsTheMelody={whatsTheMelody} getWhatsTheMelody={getWhatsTheMelody}/> : null}
        </div>
     );
}
 
export default withRouter(WhatsTheMelody);