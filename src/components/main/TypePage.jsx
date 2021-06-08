import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import SingleTopAnime from '../SingleTopAnime';
import SingleTypeLover from '../SingleTypeLover';

import img from '../../media/img/vios1-spec.jpg';
import img2 from '../../media/img/hos-back20502.jpg';

const TypePage = ({types, match}) => {

    const [anime, setAnime] = useState({
        movies: [
            {
                id: 13,
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
                        name: "Psychologiczne",
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
                id: 23,
                title: "Violet Evergarden",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Psychologiczne",
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
                rate: 6.54,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            },
            {
                id: 33,
                title: "Naruto",
                link: "/page/coś",
                img: img,
                types: [
                    {
                        id: 1,
                        name: "Komedia",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Dramat",
                        link: "/type/coś"
                    },
                ],
                rate: 8.20,
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
                        name: "Komedia",
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
                        name: "Komedia",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Psychologiczne",
                        link: "/type/coś"
                    },
                ],
                rate: 10.00,
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
                        name: "Fantasy",
                        link: "/type/coś"
                    },
                    {
                        id: 2,
                        name: "Romans",
                        link: "/type/coś"
                    },
                    {
                        id: 3,
                        name: "Szkolne",
                        link: "/type/coś"
                    },
                ],
                rate: 9.32,
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
                rate: 6.12,
                planned: ["1"],
                watched: ["1"],
                favorite: ["1"],
                stopped: ["1"],
                processOfWatching: ["1"],
            }
        ]
    })
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Question Mark",
            link: "/users/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 57,
            favoriteAnime: 
            {
                name: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
                img: img,
            },
            favoriteType: "Dramat",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 7,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 8,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 2,
            name: "Przemcioss",
            link: "/users/9845",
            avatar: img,
            backgroundTheme: img2,
            likes: 123,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Science Fiction",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 7,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 3,
            name: "PpekKOX",
            link: "/users/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 748,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Nadprzyrodzone",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 4,
            name: "T0NY",
            link: "/users/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 932,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Akcja",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 6,
            name: "Turbo Bocz",
            link: "/users/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 80,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Ecchi",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 5,
            name: "ButSmokes",
            link: "/users/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 12,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Romans",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
    ]);

    const typeMatch = match.params.type;
    const { name, description } = types.find(({match}) => match === typeMatch );

    const animeList = () => {
        const animeList = [...anime.series, ...anime.movies];
        const filtered = animeList.filter(a => {
            let has = true;
            let types = [];
            a.types.forEach(t => {
                types.push(t.name);
            });
            if (types.indexOf(name) === -1) {
                has = false;
            }
            return has;
        })
        const sorted = filtered.sort((a, b) => {
            if (a.rate > b.rate) {
                return -1;
            } else if (a.rate < b.rate) {
                return 1;
            } else {
                return 0;
            }
        })
        const bestThree = sorted.slice(0, 3); 
        return bestThree.map((a, index) => <SingleTopAnime 
        key={a.id}
        title={a.title}
        link={a.link}
        place={index + 1}
        img={a.img}
        types={a.types}
        rate={a.rate}
        favorite={a.favorite}
        watched={a.watched}
        stopped={a.stopped}
        processOfWatching={a.processOfWatching}
        planned={a.planned}
        />);
    }

    const userList = () => {
        const filtered = users.filter(u => u.favoriteType === name);
        const sorted = filtered.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            } else if (a.likes < b.likes) {
                return 1;
            } else {
                return 0;
            }
        })
        return sorted.map(u => <SingleTypeLover key={u.id} img={u.avatar} name={u.name} link={u.link} likes={u.likes}/>)
    }

    return ( 
        <div className="typePage">
            <h2 className="typePage__title largeTitle scrollNav" data-id="4">{name}</h2>
            <p className="typePage__description">{description}</p>
            <div className="typePage__bestAnimeWithType">
                <h3 className="typePage__BAWTTitle mediumTitle">Najlepsze anime z tym gatunkiem:</h3>
                <ul className="typePage__list column">
                    {animeList()}
                </ul>
            </div>
            <div className="typePage__typeLovers">
                <h3 className="typePage__TLTitle mediumTitle">Type Lovers</h3>
                <ul className="typePage__list typePage__list--maxHeight">
                    {userList()}
                </ul>
            </div>
        </div>
     );
}
 
export default withRouter(TypePage);