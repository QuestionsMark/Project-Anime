import React, { useEffect, useState } from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';

import TypePage from '../TypePage';

import setMain from '../../utils/setMain';
import { HOST_ADDRESS } from '../../config';

const Types = ({main, history, match}) => {

    const [types, setTypes] = useState([]);
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            setTypes(types);
        }
    };

    const typesList = () => {
        return types.map((t, i) => (
            <li className="types__item" key={t.id}>
                <p className="types__index">{i + 1 + '.'}</p>
                <Link to={`/types/${t.name}`} className="types__link">{t.name}</Link>
            </li>
        ));
    };

    useEffect(() => {
        getTypes();
    }, []);

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
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
     );
}
 
export default withRouter(Types);