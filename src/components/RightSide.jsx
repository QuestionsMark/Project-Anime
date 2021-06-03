import React from 'react';

import DailyAnime from './DailyAnime';
import WhatsTheMelody from './WhatsTheMelody';
import WhatsTheMelodyComments from './WhatsTheMelodyComments';

const RightSide = () => {
    return ( 
        <div className="main__rightSide">
            <DailyAnime />
            <WhatsTheMelody />
            <WhatsTheMelodyComments />
        </div>
     );
}
 
export default RightSide;
