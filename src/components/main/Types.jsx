import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import TypePage from './TypePage';

const Types = () => {

    const [types, setTypes] = useState([
        {
            id: 1,
            name: "Dramat",
            link: "/types/dramat",
            match: "dramat",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 2,
            name: "Fantasy",
            link: "/types/fantasy",
            match: "fantasy",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 3,
            name: "Sztuki Walki",
            link: "/types/sztuki-walki",
            match: "sztuki-walki",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 4,
            name: "Psychologiczne",
            link: "/types/psychologiczne",
            match: "psychologiczne",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 5,
            name: "Szkolne",
            link: "/types/szkolne",
            match: "szkolne",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 6,
            name: "Komedia",
            link: "/types/komedia",
            match: "komedia",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 7,
            name: "Romans",
            link: "/types/romans",
            match: "romans",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 8,
            name: "Muzyczne",
            link: "/types/muzyczne",
            match: "muzyczne",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 9,
            name: "Nadprzyrodzone",
            link: "/types/nadprzyrodzone",
            match: "nadprzyrodzone",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 10,
            name: "Science Fiction",
            link: "/types/science-fiction",
            match: "science-fiction",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        },
        {
            id: 11,
            name: "Wojskowe",
            link: "/types/wojskowe",
            match: "wojskowe",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos alias accusantium culpa pariatur ea quam quis vitae quod dicta aut at ex impedit. Vero eos cupiditate fugit nemo suscipit?",
        }
    ]);

    const typesList = types.map((t, i) => (
        <li className="types__item" key={t.id}>
            <p className="types__index">{i + 1 + '.'}</p>
            <Link to={t.link} className="types__link">{t.name}</Link>
        </li>
    ));

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="types main__content">
                <Switch>
                    <Route path="/types" exact>
                        <div className="types__container">
                            <h2 className="largeTitle types__title scrollNav" data-id="4">Lista Gatunków</h2>
                            <ul className="types__list">
                                {typesList}
                            </ul>
                        </div>
                    </Route>
                    <Route path="/types/:type">
                        <TypePage types={types}/>
                    </Route>
                </Switch>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Types;