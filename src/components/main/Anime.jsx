import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Search from '../Search';
import AnimeList from '../AnimeList';
import setMain from '../../utils/setMain';
import { HOST_ADDRESS } from '../../config';

const Anime = ({main, history, match}) => {

    const [anime, setAnime] = useState([]);
    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime`);
        if (response.ok) {
            const anime = await response.json();
            setAnime(anime);
        }
    };

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
        getAnime();
    }, []);

    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
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
     );
}
 
export default withRouter(Anime);