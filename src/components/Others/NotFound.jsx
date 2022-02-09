import React from 'react';

import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';

const NotFound = () => {

    return ( 
        <div className="notFound main__content">
            <div className="notFound__alert">
                <SentimentVeryDissatisfiedRoundedIcon className="notFound__icon"/>
                <p className="notFound__text">Nie odnaleziono strony o takim adresie URL. Sprawdź czy Twój adres jest poprawny!</p>
            </div>
        </div>
     );
}
 
export default NotFound;