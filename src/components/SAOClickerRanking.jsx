import React, { useCallback, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import useGameSearch from '../hooks/useGameSearch';
import Error from './Error';
import Loading from './Loading';

import SingleSAOClickerResult from './SingleSAOClickerResult';

const SAOClickerRanking = () => {

    const [sort, setSort] = useState('time');
    const handleChangeSort = (newSort) => {
        if (newSort === sort) return;
        setSort(newSort);
        setPage(1);
    };
    const [page, setPage] = useState(1);

    const { data, hasMore, loading, error } = useGameSearch('saoc', 'sword-art-online-clicker', page, sort);

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

    const swordArtOnlineClickerList = () => {
        return data.map((r, i) => {
            if (data.length === i + 1) return <SingleSAOClickerResult key={r.id} place={i + 1} result={r} refference={lastDataElementRef}/>
            return <SingleSAOClickerResult key={r.id} place={i + 1} result={r}/>;
        });
    };

    return ( 
        <>
            <h2 className="SAOCRanking__title largeTitle">Sword Art Online Clicker Ranking</h2>
            <div className="SAOCRanking__legend">
                <p className="SAOCRanking__legend-item">Miejsce</p>
                <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`SAOCRanking__legend-item ${sort === 'username' ? 'active' : ''}`} onClick={() => handleChangeSort('username')}>Użytkownik</p>}>
                    Sortowanie po użytkowniku.
                </Popup>
                <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`SAOCRanking__legend-item ${sort === 'time' ? 'active' : ''}`} onClick={() => handleChangeSort('time')}>Czas</p>}>
                    Sortowanie po czasie ukończenia.
                </Popup>
                <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`SAOCRanking__legend-item ${sort === 'level' ? 'active' : ''}`} onClick={() => handleChangeSort('level')}>Poziom</p>}>
                    Sortowanie po poziomie.
                </Popup>
                <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`SAOCRanking__legend-item ${sort === 'achievements' ? 'active' : ''}`} onClick={() => handleChangeSort('achievements')}>Osiągnięcia</p>}>
                    Sortowanie po ilości osiągnięć.
                </Popup>
                <Popup className="normal-popup" position="top center" on="hover" mouseEnterDelay={100} trigger={<p className={`SAOCRanking__legend-item ${sort === 'swords' ? 'active' : ''}`} onClick={() => handleChangeSort('swords')}>Ilość Mieczy</p>}>
                    Sortowanie po ilości zakupionych mieczy.
                </Popup>
            </div>
            {data.length > 0 ? <ul className="SAOCRanking__list">{swordArtOnlineClickerList()}</ul> : <Loading />}
            {error ? <Error error={error}/> : null}
        </>
     );
}
 
export default withRouter(SAOClickerRanking);