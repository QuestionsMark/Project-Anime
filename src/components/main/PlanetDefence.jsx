import React, { useCallback, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { Route, Switch } from 'react-router-dom';
import useGameSearch from '../../hooks/useGameSearch';

import Loading from '../Loading';
import Error from '../Error';

const PlanetDefence = () => {

    const [sort, setSort] = useState('overall');
    const handleChangeSort = (newSort) => {
        if (newSort === sort) return;
        setSort(newSort);
        setPage(1);
    };
    const [page, setPage] = useState(1);

    const { data, hasMore, loading, error } = useGameSearch('city-defence', 'results', page, sort);

    const observer = useRef();
    const lastDataElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const planetDefenceList = () => {
        return data.map((r, i) => {
            if (data.length === i + 1) {
                return (
                    <li key={i} className="planet-defence__item" ref={lastDataElementRef}>
                        <p className="planet-defence__stat">{i + 1}</p>
                        <p className="planet-defence__stat">{r.username}</p>
                        <p className="planet-defence__stat">{r.score}</p>
                        <p className="planet-defence__stat">{r.accuracy.toFixed(2)}%</p>
                        <p className="planet-defence__stat">{r.date}</p>
                    </li>
                );
            } else {
                return (
                    <li key={i} className="planet-defence__item">
                        <p className="planet-defence__stat">{i + 1}</p>
                        <p className="planet-defence__stat">{r.username}</p>
                        <p className="planet-defence__stat">{r.score}</p>
                        <p className="planet-defence__stat">{r.accuracy.toFixed(2)}%</p>
                        <p className="planet-defence__stat">{r.date}</p>
                    </li>
                );
            }
        });
    };

    return ( 
        <div className="planet-defence main__content">
            <h2 className="planet-defence__title largeTitle">City Defence Ranking</h2>
            <Switch>
                <Route path="/planet-defence/ranking">
                    <div className="planet-defence__legend">
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`planet-defence__legend-item ${sort === 'overall' ? 'active' : ''}`} onClick={() => handleChangeSort('overall')}>Miejsce</p>}>
                            Sortowanie overall.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`planet-defence__legend-item ${sort === 'username' ? 'active' : ''}`} onClick={() => handleChangeSort('username')}>Użytkownik</p>}>
                            Sortowanie po nazwie.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`planet-defence__legend-item ${sort === 'score' ? 'active' : ''}`} onClick={() => handleChangeSort('score')}>Pynkty</p>}>
                            Sortowanie po punktacji.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`planet-defence__legend-item ${sort === 'accuracy' ? 'active' : ''}`} onClick={() => handleChangeSort('accuracy')}>Celność</p>}>
                            Sortowanie po celności.
                        </Popup>
                        <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`planet-defence__legend-item ${sort === 'date' ? 'active' : ''}`} onClick={() => handleChangeSort('date')}>Data</p>}>
                            Sortowanie po dacie.
                        </Popup>
                    </div>
                    {data.length > 0 ? <ul className="planet-defence__list">{planetDefenceList()}</ul> : <Loading />}
                    {error ? <Error error={error}/> : null}
                </Route>
            </Switch>
        </div>
     );
}
 
export default PlanetDefence;