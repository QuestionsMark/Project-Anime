import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TopAnimeList from '../TopAnimeList';

import Filter from '../Filter';
import Search from '../Search';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';

import img from '../../media/img/sak6-spec.jpg';
import LeftSide from '../LeftSide';

const Top = ({history}) => {

    const [animeList, setAnimeList] = useState([])

    const [searchPhrase, setSearchPhrase] = useState('');
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
    }

    const handleFilterKind = (e) => {
        console.log(e.target.value)
        setKindFilter(e.target.value)
    }

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
    }

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const filteredAnimeList = () => {
        let FK;
        if (kindFilter === 'all') {
            FK = [...animeList];
        } else if (kindFilter === 'series') {
            FK = animeList.filter(a => a.kind === 'series');
        } else if (kindFilter === 'movies') {
            FK = animeList.filter(a => a.kind === 'movie');
        }
        const FS = FK.filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()));
        const FWT = FS.filter(anime => {
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
        const FDWT = FWT.filter(anime => {
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
        const FMinR = FDWT.filter(anime => anime.rate >= rateMinFilter);
        const FMaxR = FMinR.filter(anime => {
            if (rateMaxFilter === '') {
                return true;
            } else {
                if (anime.rate <= rateMaxFilter) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        const sorted = FMaxR.sort((a, b) => {
            if (a.rate > b.rate) {
                return -1;
            } else if (a.rate < b.rate) {
                return 1;
            } else {
                return 0;
            }
        })
        return sorted;
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    const callAPI = () => {
        fetch('http://localhost:9000/anime')
        .then(res => res.json())
        .then(res => setAnimeList(res));
    }

    useEffect(() => {
        goUp();
        callAPI();
    }, []);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="top main__content">
                <div className="top__search">
                    <Search handleSearch={handleSearch}/>
                </div>
                <Filter kindFilter={kindFilter} rateMinFilter={rateMinFilter} rateMaxFilter={rateMaxFilter} handleFilterKind={handleFilterKind} handleFilterTypes={handleFilterTypes} handleFilterKind={handleFilterKind} handleFilterRate={handleFilterRate}/>
                <TopAnimeList anime={filteredAnimeList()}/>
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Top);