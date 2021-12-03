import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';

import setMain from '../../utils/setMain';

const NotFound = ({main, history, match}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="notFound main__content">
            <div className="notFound__alert">
                <SentimentVeryDissatisfiedRoundedIcon className="notFound__icon"/>
                <p className="notFound__text">Nie odnaleziono strony o takim adresie URL. Sprawdź czy Twój adres jest poprawny!</p>
            </div>
        </div>
     );
}
 
export default withRouter(NotFound);