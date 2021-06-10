import React from 'react';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';

const NotFound = () => {
    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="notFound main__content">
                <div className="notFound__alert">
                    <SentimentVeryDissatisfiedRoundedIcon className="notFound__icon"/>
                    <p className="notFound__text">Nie odnaleziono strony o takim adresie URL. Sprawdź czy Twój adres jest poprawny!</p>
                </div>
            </div>
            <RightSide />
        </main>
     );
}
 
export default NotFound;