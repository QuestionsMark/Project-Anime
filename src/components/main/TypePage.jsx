import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import SingleTopAnime from '../SingleTopAnime';
import SingleTypeLover from '../SingleTypeLover';

import { HOST_ADDRESS } from '../../config';

const TypePage = ({ typesList, isUserLogged, match }) => {

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
        })
        const bestThree = sorted.slice(0, 3);  
        const bestAnimeList =  bestThree.map(a => {
            let rate; 
            if (a.rate.length > 0) {
                let rateValue = 0;
                a.rate.forEach(r => rateValue += r.rate);
                const average = (rateValue / a.rate.length).toFixed(2);
                rate = average;
            } else {
                rate = 0;
            }
            let userData;
            if (isUserLogged && users.length > 1) {
                userData = users.find(u => u.link === localStorage.getItem('l'));
            } else {
                userData = {
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
                }
            }
            return <SingleTopAnime key={a._id} title={a.title} link={a.link} img={a.images.mini.img} types={a.types} rate={rate} isUserLogged={isUserLogged} user={userData} callAPI={callAPI}/>
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
        return sorted.map(u => <SingleTypeLover key={u.id} img={u.avatar} name={u.username} link={u.link} likes={u.likes.length}/>)
    }

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/anime`)
            .then(res => res.json())
            .then(res => setAnime(res));
        fetch(`${HOST_ADDRESS}/users`)
            .then(res => res.json())
            .then(res => setUsers(res));
    }

    useEffect(() => {
        callAPI();
    },[])

    useEffect(() => {
        callAPI();
    },[match])

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