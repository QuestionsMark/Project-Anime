import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from '../Loading';
import TypePage from './TypePage';
import SingleType from '../SingleType';

import { HOST_ADDRESS } from '../../config';
import { DefaultArray } from '../../utils/CustomClasses';

const Types = () => {

    const componentRef = useRef();

    const [types, setTypes] = useState(new DefaultArray());
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            if (!componentRef.current) return;
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

    const typesComponent = types instanceof DefaultArray ?
        <Loading />
        :
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
        </Switch>;

    useEffect(() => {
        getTypes();
    }, []);

    return ( 
        <div className="types main__content" ref={componentRef}>
            {typesComponent}
        </div>
     );
}
 
export default Types;