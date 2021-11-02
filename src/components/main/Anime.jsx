import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import Search from '../Search';
import AnimeList from '../AnimeList';

import { HOST_ADDRESS } from '../../config.js';

const Anime = ({history, match, isUserLogged}) => {

    const [searchValue, setSearchValue] = useState('');
    const [animeList, setAnimeList] = useState([])
    const [userData, setUserData] = useState({
        favoriteAnime: {
            link: '',
        },
        userAnimeData: {
            watched: [
                {
                    link: '',
                }
            ],
            stopped: [
                {
                    link: '',
                }
            ],
            processOfWatching: [
                {
                    link: '',
                }
            ],
            planned: [
                {
                    link: '',
                }
            ],
        }
    });

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const searchAnimeList = (type) => {
        if (type === "series") {
            const series = animeList.filter(a => a.kind === "series");
            const filtered = series.filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
            const sorted = filtered.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
            return sorted;
        } else if (type === "movies") {
            const movies = animeList.filter(a => a.kind === "movie");
            const filtered = movies.filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase()))
            const sorted = filtered.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
            return sorted;
        }
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/anime`)
            .then(res => res.json())
            .then(res => setAnimeList(res));
        if (isUserLogged) {
            fetch(`${HOST_ADDRESS}/users/${localStorage.getItem('l')}`)
                .then(res => res.json())
                .then(res => {
                    setUserData(res);
                });
        }
    }

    useEffect(() => {
        callAPI();
    }, [isUserLogged]);

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
                    <AnimeList anime={searchAnimeList("series")} isUserLogged={isUserLogged} user={userData} callAPI={callAPI}/>
                </div>
                <div className="anime__movies scrollNav" data-id="3">
                    <h2 className="anime__title">Filmy Anime</h2>
                    <AnimeList anime={searchAnimeList("movies")} isUserLogged={isUserLogged} user={userData} callAPI={callAPI}/>
                </div>
            </div>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default withRouter(Anime);