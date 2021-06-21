import React from 'react';

import DailyAnime from './DailyAnime';
import WhatsTheMelody from './WhatsTheMelody';
import WhatsTheMelodyComments from './WhatsTheMelodyComments';

const RightSide = ({isUserLogged}) => {
    return ( 
        <div className="main__rightSide">
            <DailyAnime  isUserLogged={isUserLogged}/>
            <WhatsTheMelody isUserLogged={isUserLogged}/>
            <WhatsTheMelodyComments isUserLogged={isUserLogged}/>
        </div>
     );
}
 
export default RightSide;
