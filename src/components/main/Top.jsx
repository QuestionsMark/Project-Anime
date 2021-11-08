import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useAnime } from '../../contexts/AnimeProvider';

import TopAnimeList from '../TopAnimeList';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import Filter from '../Filter';
import Search from '../Search';

const Top = ({history, match}) => {

    const [anime] = useAnime();

    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const [wantTypesFilter, setWantTypesFilter] = useState([]);
    const [dontWantTypesFilter, setDontWantTypesFilter] = useState([]);
    const [kindFilter, setKindFilter] = useState('all');
    const [rateMinFilter, setRateMinFilter] = useState('');
    const [rateMaxFilter, setRateMaxFilter] = useState('');

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
    };

    const handleFilterKind = (e) => {
        setKindFilter(e.target.value);
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
    };

    const filteredAnimeList = () => {
        let filtered;
        if (kindFilter === 'all') {
            filtered = anime;
        } else if (kindFilter === 'series') {
            filtered = anime.filter(a => a.kind === 'series');
        } else if (kindFilter === 'movies') {
            filtered = anime.filter(a => a.kind === 'movie');
        }
        return filtered
            .filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()))
            .filter(anime => {
                let has = true;
                let types = [];
                anime.types.forEach(t => {
                    types.push(t.name)
                });
                wantTypesFilter.forEach(t => {
                    if (types.indexOf(t) === -1) {
                        has = false;
                    }
                })
                return has;
            })
            .filter(anime => {
                let hasNot = true;
                let types = [];
                anime.types.forEach(t => {
                    types.push(t.name)
                });
                dontWantTypesFilter.forEach(t => {
                    if (types.indexOf(t) !== -1) {
                        hasNot = false;
                    }
                })
                return hasNot;
            })
            .filter(a => {
                let average = 0;
                if (a.rate.length > 0) {
                    let rateValueA = 0;
                    a.rate.forEach(r => rateValueA += r.rate);
                    average = (rateValueA / a.rate.length).toFixed(2) * 1;
                }
                return average >= rateMinFilter;
            })
            .filter(a => {
                if (rateMaxFilter === '') {
                    return true;
                } else {
                    let average = 0;
                    if (a.rate.length > 0) {
                        let rateValueA = 0;
                        a.rate.forEach(r => rateValueA += r.rate);
                        average = (rateValueA / a.rate.length).toFixed(2) * 1;
                    }
                    return average <= rateMaxFilter;
                }
            })
            .sort((a, b) => {
                let averageA = 0;
                if (a.rate.length > 0) {
                    let rateValueA = 0;
                    a.rate.forEach(r => rateValueA += r.rate);
                    averageA = (rateValueA / a.rate.length).toFixed(2) * 1;
                }
                let averageB = 0;
                if (b.rate.length > 0) {
                    let rateValueB = 0;
                    b.rate.forEach(r => rateValueB += r.rate);
                    averageB = (rateValueB / b.rate.length).toFixed(2) * 1;
                }
                if (averageA < averageB) {
                    return 1;
                } else if (averageA > averageB) {
                    return -1;
                } else {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1
                    }
                    return 0;
                }
            });
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, [match]);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="top main__content">
                <div className="top__search">
                    <Search handleSearch={handleSearch}/>
                </div>
                <Filter kindFilter={kindFilter} rateMinFilter={rateMinFilter} rateMaxFilter={rateMaxFilter} handleFilterTypes={handleFilterTypes} handleFilterKind={handleFilterKind} handleFilterRate={handleFilterRate}/>
                <TopAnimeList anime={filteredAnimeList()} />
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Top);