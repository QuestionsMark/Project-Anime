import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useAnime } from '../../contexts/AnimeProvider';
import { useUsers } from '../../contexts/UsersProvider';

import SingleTopAnime from '../SingleTopAnime';
import SingleTypeLover from '../SingleTypeLover';

import { HOST_ADDRESS } from '../../config';

const TypePage = ({match, history}) => {

    const [anime] = useAnime();
    const [users] = useUsers();

    const [typeData, setTypeData] = useState(null);
    const getType = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types/${match.params.type}`);
        if (response.ok) {
            const type = await response.json();
            setTypeData(type);
        }
    };

    const animeList = () => {
        return [...anime]
            .filter(a => {
                let has = true;
                let types = [];
                a.types.forEach(t => {
                    types.push(t.name);
                });
                if (types.indexOf(typeData.name) === -1) {
                    has = false;
                }
                return has;
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
                if (averageA < averageB) return 1;
                if (averageA > averageB) return -1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
                return 0;
            })
            .slice(0, 3)
            .map((a, i) => {
                let rate; 
                if (a.rate.length > 0) {
                    let rateValue = 0;
                    a.rate.forEach(r => rateValue += r.rate);
                    const average = (rateValue / a.rate.length).toFixed(2);
                    rate = average;
                } else {
                    rate = 0;
                }
                return <SingleTopAnime key={a.id} place={i} anime={a} rate={rate}/>
            });
    };

    const userList = () => {
        return [...users]
            .filter(u => u.favoriteType === typeData.name)
            .sort((a, b) => {
                if (a.likes > b.likes) return -1;
                if (a.likes < b.likes) return 1;
                return 0;
            })
            .map(u => <SingleTypeLover key={u.id} lover={u}/>);
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
        getType();
    },[match]);

    return ( 
        <>
        {typeData ? <div className="typePage">
            <h2 className="typePage__title largeTitle scrollNav" data-id="4">{typeData.name}</h2>
            <p className="typePage__description">{typeData.description}</p>
            {animeList().length > 0 ? <div className="typePage__bestAnimeWithType">
                <h3 className="typePage__BAWTTitle mediumTitle">Najlepsze anime z tym gatunkiem:</h3>
                <ul className="typePage__list column">
                    {animeList()}
                </ul>
            </div> : null}
            {userList().length > 0 ? <div className="typePage__typeLovers">
                <h3 className="typePage__TLTitle mediumTitle">Type Lovers</h3>
                <ul className="typePage__list typePage__list--maxHeight">
                    {userList()}
                </ul>
            </div> : null}
        </div> : null}
        </>
     );
}
 
export default withRouter(TypePage);