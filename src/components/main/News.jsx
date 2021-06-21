import React, { useState } from 'react';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

import SingleNews from '../SingleNews';

const News = ({isUserLogged}) => {

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

    const newsList = news.map(news => <SingleNews key={news.id} date={news.date} title={news.title} text={news.text}/>);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="news main__content">
                <h2 className="news__title">Wiadomości ze Świata Anime!</h2>
                <div className="news__container">
                    {newsList}
                </div>
            </div>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default News;