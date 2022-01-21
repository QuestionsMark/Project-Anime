import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import SingleTypeLoverCircle from './SingleTypeLoverCircle';

import { HOST_ADDRESS } from '../config';

const SingleType = ({type}) => {

    const componentRef = useRef();

    const { id, name } = type;

    const [lovers, setLovers] = useState([]);
    const [count, setCount] = useState(0);
    const [bestAnime, setBestAnime] = useState([]);
    const getLovers = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/types/${name}/lovers`);
        if (response.ok) {
            const lovers = await response.json();
            if (!componentRef.current) return;
            setLovers(lovers);
        }
    }, [name]);
    const getCount = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/type/${name}/count`);
        if (response.ok) {
            const count = await response.json();
            if (!componentRef.current) return;
            setCount(count);
        }
    }, [name]);
    const getBestAnime = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/type/${name}/best/minimalist`);
        if (response.ok) {
            const anime = await response.json();
            if (!componentRef.current) return;
            setBestAnime(anime);
        }
    }, [name]);

    const loversListComponent = useMemo(() => {
        return lovers.length > 0 ? lovers.map(l => <SingleTypeLoverCircle key={l.id} lover={l}/>) : 'Brak';
    }, [lovers]);

    const animeListComponent = useMemo(() => {
        return bestAnime.length > 0 ? bestAnime.map(a => <Popup key={a.id} className="normal-popup" position="top center" offsetY={2} on="hover" mouseEnterDelay={200} trigger={<Link to={`/anime/${a.id}`} className="userList__favorite-anime-item" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${a.mini})`}}/>}>
        {a.title}
    </Popup>) : 'Brak';
    }, [bestAnime]);

    useEffect(() => {
        getLovers();
        getCount();
        getBestAnime();
    }, [getLovers, getCount, getBestAnime]);

    return ( 
        <li className="types__item" key={id} ref={componentRef}>
            <div className="types__info">
                <Link to={`/types/${name}`} className="types__link">{name}</Link>
                <p className="types__anime-info">Ilość Anime: (<span className="types__anime-info-value">{count}</span>)</p>
                <div className="types__lovers-info">
                    <FavoriteRoundedIcon className="types__lovers-icon"/>
                    <p className="types__lovers-value">{lovers.length}</p>
                </div>
            </div>
            <div className="types__content">
                <div className="types__lovers">
                    <h2 className="types__subtitle">Miłośnicy Gatunku:</h2>
                    <ul className="types__content-list">
                        {loversListComponent}
                    </ul>
                </div>
                <div className="types__anime">
                    <h2 className="types__subtitle">Najlepsze Anime z tym gatunkiem:</h2>
                    <ul className="types__content-list">
                        {animeListComponent}
                    </ul>
                </div>
            </div>
        </li>
     );
}
 
export default SingleType;