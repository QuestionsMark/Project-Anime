import React, { useCallback, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import setMain from '../../utils/setMain';

import SAOClickerRanking from '../SAOClickerRanking';

const SAOClicker = ({main, history, match}) => {

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

    return ( 
        <div className="SAOCRanking main__content">
            <Switch>
                <Route path="/sword-art-online-clicker/ranking">
                    <SAOClickerRanking />
                </Route>
            </Switch>
        </div>
     );
}
 
export default withRouter(SAOClicker);