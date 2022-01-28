import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';

import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';

import setMain from '../../utils/setMain';

const NotFound = ({main, history, match}) => {

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

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