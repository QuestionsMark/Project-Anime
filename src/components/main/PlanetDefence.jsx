import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { HOST_ADDRESS_PLANET_DEFENCE } from '../../config';
import setMain from '../../utils/setMain';

const PlanetDefence = ({ main, history, match }) => {

    const [planetDefenceResults, setPlanetDefenceResults] = useState([]);
    const getPlanetDefenceResults = async () => {
        const response = await fetch(`${HOST_ADDRESS_PLANET_DEFENCE}/results`);
        if (response.ok) {
            setPlanetDefenceResults(await response.json());
        }
    };

    const planetDefenceList = () => {
        return planetDefenceResults.map((r, i) => <li key={i} className="planet-defence__item">
            <p className="planet-defence__stat">Miejsce: {i + 1}</p>
            <p className="planet-defence__stat">Użytkownik: {r.username}</p>
            <p className="planet-defence__stat">Punkty: {r.score}</p>
            <p className="planet-defence__stat">Celność: {r.accuracy}</p>
        </li>);
    };

    useEffect(() => {
        getPlanetDefenceResults();
    }, []);

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="planet-defence main__content">
            <h2 className="planet-defence__title largeTitle">Sword Art Online Clicker ranking</h2>
            <Switch>
                <Route path="/planet-defence/ranking">
                    {planetDefenceResults.length > 0 ? <ul className="planet-defence__list">{planetDefenceList()}</ul> : null}
                </Route>
            </Switch>
        </div>
     );
}
 
export default withRouter(PlanetDefence);