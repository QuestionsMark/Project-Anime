import React, { useState, useCallback, useMemo, useRef } from 'react';

import Error from '../Error';
import Filter from '../Filter';
import Loading from '../Loading';
import Search from '../Search';
import SingleAnime from './SingleAnime';

import useSearch from '../../hooks/useSearch';

const Anime = () => {

    const [searchPhrase, setSearchPhrase] = useState('');
    const [page, setPage] = useState(1);
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
        setPage(1);
    };

    const [wantTypesFilter, setWantTypesFilter] = useState([]);
    const [dontWantTypesFilter, setDontWantTypesFilter] = useState([]);
    const [sortFilter, setSortFilter] = useState('best');
    const [kindFilter, setKindFilter] = useState('all');
    const [rateMinFilter, setRateMinFilter] = useState('');
    const [rateMaxFilter, setRateMaxFilter] = useState('');

    const { data, hasMore, loading, error } = useSearch('anime/top', searchPhrase, page, null, wantTypesFilter, dontWantTypesFilter, sortFilter, kindFilter, rateMinFilter, rateMaxFilter);

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

    const handleFilterTypes = (e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement;
        }
        const options = target.parentElement.querySelectorAll('.filter__filterIcon');
        const type = target.getAttribute('data-type-name');
        if (target.getAttribute('data-type') === "we") {
            options.forEach(o => {
                o.classList.remove('active');
            })
            options.forEach(o => {
                if (o.getAttribute('data-type') === "w") {
                    o.classList.add('active');
                }
            })
            setWantTypesFilter(prev => [...prev, type])
        } else if (target.getAttribute('data-type') === "w") {
            options.forEach(o => {
                o.classList.remove('active');
            })
            options.forEach(o => {
                if (o.getAttribute('data-type') === "dw") {
                    o.classList.add('active');
                }
            })
            setWantTypesFilter(prev => {
                const index = prev.indexOf(type);
                const newState = [...prev];
                newState.splice(index, 1);
                return newState;
            })
            setDontWantTypesFilter(prev => [...prev, type])
        } else if (target.getAttribute('data-type') === "dw") {
            options.forEach(o => {
                o.classList.remove('active');
            })
            options.forEach(o => {
                if (o.getAttribute('data-type') === "we") {
                    o.classList.add('active');
                }
            })
            setDontWantTypesFilter(prev => {
                const index = prev.indexOf(type);
                const newState = [...prev];
                newState.splice(index, 1);
                return newState;
            })
        }
        setPage(1);
    };
    const handleFilterKind = (e) => {
        setKindFilter(e.target.value);
        setPage(1);
    };
    const handleFilterSort = (e) => {
        setSortFilter(e.target.value);
        setPage(1);
    };
    const handleFilterRate = (e) => {
        const value = e.target.value;
        const length = value.length;
        if ((value == 10) || (value >= 0 && value < 10 && length === 1) || (value >= 0 && value < 10 && length >= 3)) {
            if (e.target.classList.contains('rateMin')) {
                setRateMinFilter(e.target.value);
            } else if (e.target.classList.contains('rateMax')) {
                setRateMaxFilter(e.target.value);
            }
        } else if (length === 0) {
            if (e.target.classList.contains('rateMin')) {
                setRateMinFilter('');
            } else if (e.target.classList.contains('rateMax')) {
                setRateMaxFilter('');
            }
        }
        setPage(1);
    };

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
            if (data.length === i + 1) return <SingleAnime key={a.id} refference={lastDataElementRef} place={i + 1} anime={a} rate={rate} />;
            return <SingleAnime key={a.id} anime={a} place={i + 1} rate={rate} />;
        });
    };

    const searchComponent = useMemo(() => <Search handleSearch={handleSearch} value={searchPhrase} />, [searchPhrase]);

    const filterComponent = useMemo(() => <Filter
    kindFilter={kindFilter}
    rateMinFilter={rateMinFilter}
    rateMaxFilter={rateMaxFilter}
    sortFilter={sortFilter}
    handleFilterTypes={handleFilterTypes}
    handleFilterKind={handleFilterKind}
    handleFilterRate={handleFilterRate}
    handleFilterSort={handleFilterSort}
    />, [kindFilter, rateMinFilter, rateMaxFilter, sortFilter]);

    return ( 
        <div className="top main__content">
            {searchComponent}
            {filterComponent}
            {data.length > 0 ? <div className="animeList scrollNav" data-id="3">
                <ul className="animeList__list">
                    {animeList()}
                </ul>
            </div> : null}
            {loading ? <Loading /> : null}
            {error ? <Error error={error}/> : null}
        </div>
     );
}
 
export default Anime;