import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HOST_ADDRESS } from '../config';

import SAOClickerRanking from './SAOClickerRanking';

const SAOClicker = () => {

    const [saoClicker, setSaoClicker] = useState([]);
    const getSaoClicker = async () => {
        const response = await fetch(`${HOST_ADDRESS}/sword-art-online-clicker`);
        if (response.ok) {
            const results = await response.json();
            setSaoClicker(results);
        }
    };

    useEffect(() => {
        getSaoClicker();
    }, []);

    return ( 
        <div className="SAOCRanking main__content">
            <h2 className="SAOCRanking__title largeTitle">Sword Art Online Clicker ranking</h2>
            <Switch>
                <Route path="/sword-art-online-clicker/ranking">
                    {saoClicker.length > 0 ? <SAOClickerRanking saoClicker={saoClicker}/> : null}
                </Route>
            </Switch>
        </div>
     );
}
 
export default SAOClicker;