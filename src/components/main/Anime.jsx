import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useData } from '../../contexts/DataProvider';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import Search from '../Search';
import AnimeList from '../AnimeList';

const Anime = ({history, match}) => {

    const { anime } = useData();

    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getAnimeList = (type) => {
        if (type === 'series') {
            return anime
                .filter(a => a.kind === 'series')
                .filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
                .sort((a, b) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    return 0;
                });
        } else if (type === 'movies') {
            return anime
                .filter(a => a.kind === 'movie')
                .filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
                .sort((a, b) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    return 0;
                });
        }
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
            <div className="anime main__content">
                <Search handleSearch={handleSearch}/>
                <div className="anime__series scrollNav" data-id="2">
                    <h2 className="anime__title">Serie Anime</h2>
                    <AnimeList anime={getAnimeList('series')} />
                </div>
                <div className="anime__movies scrollNav" data-id="3">
                    <h2 className="anime__title">Filmy Anime</h2>
                    <AnimeList anime={getAnimeList('movies')} />
                </div>
            </div>
            <RightSide/>
        </main>
     );
}
 
export default withRouter(Anime);