import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import setMain from '../../utils/setMain';

import SAOClickerRanking from '../SAOClickerRanking';

const SAOClicker = ({main, history, match}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

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