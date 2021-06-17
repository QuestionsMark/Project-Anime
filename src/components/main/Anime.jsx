import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';
import Search from '../Search';
import AnimeList from '../AnimeList';

import img from '../../media/img/sak6-spec.jpg';
import LeftSide from '../LeftSide';

const Anime = ({history}) => {

    const [searchValue, setSearchValue] = useState('');
    const [animeList, setAnimeList] = useState([])

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const searchAnimeList = (type) => {
        if (type === "series") {
            console.log(animeList)
            const series = animeList.filter(a => a.kind === "series");
            const filtered = series.filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
            return filtered;
        } else if (type === "movies") {
            const movies = animeList.filter(a => a.kind === "movie");
            const filtered = movies.filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
            return filtered;
        }
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
            <div className="anime main__content">
                <Search handleSearch={handleSearch}/>
                <div className="anime__series scrollNav" data-id="2">
                    <h2 className="anime__title">Serie Anime</h2>
                    <AnimeList anime={searchAnimeList("series")}/>
                </div>
                <div className="anime__movies scrollNav" data-id="3">
                    <h2 className="anime__title">Filmy Anime</h2>
                    <AnimeList anime={searchAnimeList("movies")}/>
                </div>
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Anime);