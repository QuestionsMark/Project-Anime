import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Loading from './Loading';
import SingleNews from './SingleNews';

import { HOST_ADDRESS } from '../config';

import { DefaultArray } from '../utils/CustomClasses';

const LastNews = () => {

    const componentRef = useRef();

    const [news, setNews] = useState(new DefaultArray());
    const getNews = async () => {
        const response = await fetch(`${HOST_ADDRESS}/news/last`);
        if (response.ok) {
            const news = await response.json();
            if (!componentRef.current) return;
            setNews(news);
        }
    };

    const newsList = () => {
        return news.map(n => <SingleNews key={n.id} news={n}/>);
    }

    const lastNewsComponent = news instanceof DefaultArray ?
        <Loading />
        :
        <>
            <h2 className="news__title">Wiadomości ze Świata Anime!</h2>
            <div className="news__container">
                {newsList()}
            </div>
            <Link to="/news" className="news__link"><Button className="button news__button">Więcej Nowości</Button></Link>
        </>;

    useEffect(() => {
        getNews();
    }, []);

    return ( 
        <section className="news main__section scrollNav" ref={componentRef} data-id="3">
            {lastNewsComponent}
        </section>
     );
}
 
export default LastNews;