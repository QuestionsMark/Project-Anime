import React, { useState } from 'react';

import SingleWTMComment from './SingleWTMComment';
import AddWTMComment from './AddWTMComment';

import testImg from '../media/img/sak6-spec.jpg';

const WhatsTheMelodyComments = () => {

    const [WTMComments, setWTMComments] = useState([
        {
            id: 1,
            nick: "Question Mark",
            link: "/user/3948",
            img: testImg,
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quibusdam dolorem nulla voluptate enim, nam debitis soluta impedit quidem delectus voluptatibus fugit velit accusantium earum blanditiis error eligendi, vel illo.",
            likes: ["9", "2", "3", "4","9", "2", "3", "4","9", "2", "3", "4","9", "2", "3", "4"],
            date: "12:43 03.05.2021"
        },
        {
            id: 2,
            nick: "Przemcioss",
            link: "/user/3948",
            img: testImg,
            message: "Es trafiłem!",
            likes: ["1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2"],
            date: "12:43 03.05.2021"
        },
        {
            id: 3,
            nick: "PpekKOX",
            link: "/user/3948",
            img: testImg,
            message: "Ta na pewno źle odpowiedziałem, zepsute i tyle.",
            likes: ["9", "2", "3", "4","9", "2", "3"],
            date: "12:43 03.05.2021"
        },
        {
            id: 4,
            nick: "T0NY",
            link: "/user/3948",
            img: testImg,
            message: "Siema, łatwo :)",
            likes: ["10", "2", "3", "4","7", "2", "3", "4","8", "2", "3", "4","9"],
            date: "12:43 03.05.2021"
        },
        {
            id: 5,
            nick: "Pota",
            link: "/user/3948",
            img: testImg,
            message: "Es",
            likes: ["1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4"],
            date: "12:43 03.05.2021"
        },
        {
            id: 6,
            nick: "Pota",
            link: "/user/3948",
            img: testImg,
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quibusdam dolorem nulla voluptate enim, nam debitis soluta impedit quidem delectus voluptatibus fugit velit accusantium earum blanditiis error eligendi, vel illo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quibusdam dolorem nulla voluptate enim, nam debitis soluta impedit quidem delectus voluptatibus fugit velit accusantium earum blanditiis error eligendi, vel illo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quibusdam dolorem nulla voluptate enim, nam debitis soluta impedit quidem delectus voluptatibus fugit velit accusantium earum blanditiis error eligendi, vel illo.",
            likes: ["1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4","1", "2", "3", "4"],
            date: "12:43 03.05.2021"
        },
    ]);

    const WTMCommentsList = WTMComments.map(com => <SingleWTMComment key={com.id} nick={com.nick} link={com.link} img={com.img} message={com.message} likes={com.likes} date={com.date}/>);

    return ( 
        <div className="WTMC">
            <h3 className="WTMC__title">Skomentuj wyniki!</h3>
            <div className="WTMC__comments">
                <ul className="WTMC__list">
                    {WTMCommentsList}
                </ul>
                <AddWTMComment />
            </div>
        </div>
     );
}
 
export default WhatsTheMelodyComments;