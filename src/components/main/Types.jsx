import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import { useData } from '../../contexts/DataProvider';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import TypePage from './TypePage';

const Types = () => {

    const { types } = useData();

    const typesList = () => {
        return types.map((t, i) => (
            <li className="types__item" key={t.id}>
                <p className="types__index">{i + 1 + '.'}</p>
                <Link to={`/types/${t.name}`} className="types__link">{t.name}</Link>
            </li>
        ));
    };

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="types main__content">
                <Switch>
                    <Route path="/types" exact>
                        <div className="types__container">
                            <h2 className="largeTitle types__title scrollNav" data-id="4">Lista Gatunków</h2>
                            <ul className="types__list">
                                {typesList()}
                            </ul>
                        </div>
                    </Route>
                    <Route path="/types/:type">
                        <TypePage types={types}/>
                    </Route>
                </Switch>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Types;