import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import SingleNews from './SingleNews';

import { HOST_ADDRESS } from '../config';

const LastNews = () => {

    const [news, setNews] = useState([]);
    console.log(news);
    const getNews = async () => {
        const response = await fetch(`${HOST_ADDRESS}/news/last`);
        if (response.ok) {
            const news = await response.json();
            setNews(news);
        }
    };

    const newsList = () => {
        // const lastNews = [news[news.length - 1], news[news.length - 2]];
        return news.map(n => <SingleNews key={n.id} news={n}/>);
    }

    useEffect(() => {
        getNews();
    }, []);

    return ( 
        <section className="news main__section scrollNav"  data-id="3">
            <h2 className="news__title">Wiadomości ze Świata Anime!</h2>
            <div className="news__container">
                {newsList()}
            </div>
            <Link to="/news" className="news__link"><Button className="button news__button">Aktualności</Button></Link>
        </section>
     );
}
 
export default LastNews;