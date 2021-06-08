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
    const [animeList, setAnimeList] = useState({
        movies: [
            {
                id: 1,
                title: "Charlotte",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            },
            {
                id: 2,
                title: "Violet Evergarden",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            },
            {
                id: 3,
                title: "Naruto",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            }
        ],
        series: [
            {
                id: 1,
                title: "Charlotte",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                    {
                        id: 4,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 5,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 6,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                    {
                        id: 7,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 8,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 9,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            },
            {
                id: 2,
                title: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: [],
                watched: [],
                favorite: [],
                stopped: ["1"],
                processOfWatching: [],
            },
            {
                id: 3,
                title: "Naruto",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            },
            {
                id: 4,
                title: "Naruto Shippuden",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Okruchy Życia",
                        link: "/type/coś"
                    },
                ],
                rate: 7.43,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            }
        ]
    })

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const searchAnimeList = (type) => {
        if (type === "series") {
            const searchAnime = animeList.series.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
            return searchAnime;
        } else if (type === "movies") {
            const searchAnime = animeList.movies.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
            return searchAnime;
        }
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
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