import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SAOClickerRanking from '../SAOClickerRanking';

const SAOClicker = () => {

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
 
export default SAOClicker;