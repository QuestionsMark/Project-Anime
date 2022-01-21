import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Loading from '../Loading';
import TypePage from './TypePage';
import SingleType from '../SingleType';

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

    const typesList = useCallback(() => {
        return types
            .sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })
            .map((t, i) => <SingleType key={t.name} type={t}/>);
    }, [types]);

    const typesListComponent = useMemo(() => <ul className="types__list">{typesList()}</ul>, [typesList]);

    useEffect(() => {
        getTypes();
    }, []);

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, match, main]);

    return ( 
        <>
        {types.length > 0 ? <div className="types main__content">
            <Switch>
                <Route path="/types" exact>
                    <div className="types__container">
                        <h2 className="largeTitle types__title scrollNav" data-id="4">Lista Gatunków</h2>
                        {typesListComponent}
                    </div>
                </Route>
                <Route path="/types/:type">
                    <TypePage types={types}/>
                </Route>
            </Switch>
        </div> : <div className="types main__content"><Loading /></div>}
        </>
     );
}
 
export default withRouter(Types);