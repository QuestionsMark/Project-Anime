import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import TypePage from './TypePage';

const Types = ({isUserLogged}) => {

    const [types, setTypes] = useState([
        {
            _id: '',
            name: '',
            link: '',
            description: ''
        }
    ]);

    const typesList = types.map((t, i) => (
        <li className="types__item" key={t._id}>
            <p className="types__index">{i + 1 + '.'}</p>
            <Link to={`/types/${t.link}`} className="types__link">{t.name}</Link>
        </li>
    ));

    const callAPI = () => {
        fetch('http://localhost:9000/types')
        .then(res => res.json())
        .then(res => setTypes(res));
    }

    useEffect(() => {
        callAPI();
    },[])

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
                                {typesList}
                            </ul>
                        </div>
                    </Route>
                    <Route path="/types/:type">
                        <TypePage typesList={types} isUserLogged={isUserLogged}/>
                    </Route>
                </Switch>
            </div>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default Types;