import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import SAOClickerRanking from './SAOClickerRanking';

const SAOClicker = ({isUserLogged}) => {
    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <Switch>
                <Route path="/sao/ranking">
                    <SAOClickerRanking />
                </Route>
            </Switch>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default SAOClicker;