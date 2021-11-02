import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import SingleNews from './SingleNews';

const LastNews = () => {

    const [news, setNews] = useState([
        {
            id: 1,
            date: "12:54 04.05.2021",
            title: "Wiadomosć 1",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate.",
        },
        {
            id: 2,
            date: "12:54 04.05.2021",
            title: "Wiadomosć 2",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate.",
        },
        {
            id: 3,
            date: "12:54 04.05.2021",
            title: "Wiadomosć 3",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate.",
        },
        {
            id: 4,
            date: "12:54 04.05.2021",
            title: "Wiadomosć 4",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati soluta, laudantium ab, sequi voluptatibus sed doloribus architecto unde porro magni maiores ullam veniam natus magnam temporibus nulla odit? Voluptate.",
        }
    ]);

    const newsList = () => {
        const lastNews = [news[news.length - 1], news[news.length - 2]];
        return lastNews.map(news => <SingleNews key={news.id} date={news.date} title={news.title} text={news.text}/>);
    }

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