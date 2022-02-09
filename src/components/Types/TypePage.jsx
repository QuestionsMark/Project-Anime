import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import Loading from '../Loading';
import SingleAnime from '../Anime/SingleAnime';
import SingleTypeLover from './SingleTypeLover';

import { HOST_ADDRESS } from '../../config';
import { DefaultArray } from '../../utils/CustomClasses';

const TypePage = ({match}) => {

    const componentRef = useRef();

    const [typeData, setTypeData] = useState(null);
    const [users, setUsers] = useState(new DefaultArray());
    const [anime, setAnime] = useState(new DefaultArray());
    const getType = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/types/${match.params.type}`);
        if (response.ok) {
            const type = await response.json();
            if (!componentRef.current) return;
            setTypeData(type);
        }
    }, [match.params.type]);
    const getUsers = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/type/${match.params.type}`);
        if (response.ok) {
            const users = await response.json();
            if (!componentRef.current) return;
            setUsers(users);
        }
    }, [match.params.type]);
    const getAnime = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/type/${match.params.type}/best`);
        if (response.ok) {
            const anime = await response.json();
            if (!componentRef.current) return;
            setAnime(anime);
        }
    }, [match.params.type]);

    const animeList = useCallback(() => {
        return anime
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
                return <SingleAnime key={a.id} place={i + 1} anime={a} rate={rate} />
            });
    }, [anime]);

    const userList = useCallback(() => {
        return [...users]
            .sort((a, b) => {
                if (a.likes > b.likes) return -1;
                if (a.likes < b.likes) return 1;
                return 0;
            })
            .map(u => <SingleTypeLover key={u.id} lover={u}/>);
    }, [users]);

    const animeListComponent = useMemo(() => <ul className="typePage__list column">{animeList()}</ul>, [animeList]);
    const usersListComponent = useMemo(() => <ul className="typePage__list">{userList()}</ul>, [userList]);

    useEffect(() => {
        getType();
        getAnime();
        getUsers();
    },[getAnime, getType, getUsers, match]);

    return ( 
        <div ref={componentRef}>
        {typeData ? <div className="typePage" >
            <h2 className="typePage__title largeTitle scrollNav" data-id="4">{typeData.name}</h2>
            <p className="typePage__description">{typeData.description}</p>
            <div className="typePage__bestAnimeWithType">
                <h3 className="typePage__BAWTTitle mediumTitle">Najlepsze anime z tym gatunkiem:</h3>
                {!(anime instanceof DefaultArray) ? anime.length === 0 ? 'Brak' : animeListComponent : <Loading />}
            </div>
            <div className="typePage__typeLovers">
                <h3 className="typePage__TLTitle mediumTitle">Miłośnicy Gatunku:</h3>
                {!(users instanceof DefaultArray) ? users.length === 0 ? 'Brak' : usersListComponent : <Loading />}
            </div>
        </div> : null}
        </div>
     );
}
 
export default withRouter(TypePage);