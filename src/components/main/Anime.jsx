import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import Search from '../Search';
import setMain from '../../utils/setMain';
import useSearch from '../../hooks/useSearch';
import SingleAnime from '../SingleAnime';
import Loading from '../Loading';
import Error from '../Error';

const Anime = ({main, history, match}) => {

    const [searchPhrase, setSearchPhrase] = useState('');
    const [page, setPage] = useState(1);
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
        setPage(1);
    };

    const { data, hasMore, loading, error } = useSearch('anime', searchPhrase, page);

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

    const animeList = () => {
        return data.map((a, i) => {
            let rate;
            if (a.rate.length > 0) {
                let rateValue = 0;
                a.rate.forEach(r => rateValue += r.rate);
                const average = (rateValue / a.rate.length).toFixed(2);
                rate = average;
            } else {
                rate = 0;
            }
            if (data.length === i + 1) return <SingleAnime key={a.id} refference={lastDataElementRef} anime={a} rate={rate} />;
            return <SingleAnime key={a.id} anime={a} rate={rate} />;
        });
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="anime main__content">
            <Search handleSearch={handleSearch} value={searchPhrase}/>
            {data.length > 0 ? <div className="animeList">
                <ul className="animeList__list">
                    {animeList()}
                </ul>
            </div> : null}
            {loading ? <Loading /> : null}
            {error ? <Error error={error}/> : null}
        </div>
     );
}
 
export default withRouter(Anime);