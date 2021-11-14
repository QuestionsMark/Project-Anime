import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useData } from '../contexts/DataProvider';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import SAOClickerRanking from './SAOClickerRanking';

const SAOClicker = () => {

    const { saoClicker } = useData();

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="SAOCRanking main__content">
                <h2 className="SAOCRanking__title largeTitle">Sword Art Online Clicker ranking</h2>
                <Switch>
                    <Route path="/sword-art-online-clicker/ranking">
                        {saoClicker.length > 0 ? <SAOClickerRanking /> : null}
                    </Route>
                </Switch>
            </div>
            <RightSide />
        </main>
     );
}
 
export default SAOClicker;