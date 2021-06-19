import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import SingleTopAnime from '../SingleTopAnime';
import SingleTypeLover from '../SingleTypeLover';

const TypePage = ({ typesList, match }) => {

    const [types, setTypes] = useState(typesList);
    const [anime, setAnime] = useState([
            {
                _id: '',
                title: '',
                link: '',
                images: {
                    mini: ''
                },
                types: [
                    {
                        id: '',
                        name: '',
                        link: ''
                    }
                ],
                rate: [],
            }
        ])
    const [users, setUsers] = useState([
        {
            id: '',
            name: '',
            link: '',
            avatar: '',
            backgroundTheme: '',
            likes: [],
            favoriteType: ''
        }
    ]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const animeList = () => {
        const animeList = [...anime];
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
        const bestAnimeList =  bestThree.map((a, index) => {
            let rate; 
            if (a.rate.length > 0) {
                let rateValue = 0;
                a.rate.forEach(r => rateValue += r.value);
                const average = (rateValue / a.rate.length).toFixed(2);
                rate = average;
            } else {
                rate = 0;
            }
            return (<SingleTopAnime 
            key={a._id}
            title={a.title}
            link={a.link}
            place={index + 1}
            img={a.images.mini.img}
            types={a.types}
            rate={rate}
            favorite={a.favorite}
            watched={a.watched}
            stopped={a.stopped}
            processOfWatching={a.processOfWatching}
            planned={a.planned}
            />)
        });
        return bestAnimeList;
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

    const callAPI = () => {
        fetch('http://localhost:9000/anime')
            .then(res => res.json())
            .then(res => setAnime(res));
        fetch('http://localhost:9000/users')
            .then(res => res.json())
            .then(res => setUsers(res));
    }

    useEffect(() => {
        callAPI();
    },[])

    useEffect(() => {
        if (typesList.length > 0) {
            const typeMatch = match.params.type;
            setName(() => {
                const type = types.find(t => t.link === typeMatch );
                if (type) {
                    return type.name;
                }
                return '';
            })
            setDescription(() => {
                const type = types.find(t => t.link === typeMatch );
                if (type) {
                    return type.description;
                }
                return '';
            })
        }
    },[types, typesList, match])

    useEffect(() => {
        setTypes(typesList);
    },[typesList])

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