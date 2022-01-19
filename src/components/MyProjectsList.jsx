import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import LOLImg from '../media/img/lol-icon.png';
import QMAImg from '../media/img/icon.jpg';
import SAOImg from '../media/img/SAOIcon.png';
import CityDefenceImg from '../media/img/ship.png';

const MyProjectsList = () => {
    return ( 
        <section className="myProjects main__section scrollNav" data-id="4">
            <h2 className="myProjects__title">Inne Moje Projekty</h2>
            <div className="myProjects__article">
                <div className="myProjects__content">
                    <div className="myProjects__image" style={{ backgroundImage: `url(${CityDefenceImg})` }}/>
                    <div className="myProjects__info">
                        <h2 className="myProjects__projectTitle">City Defence</h2>
                        <p className="myProjects__description">Obroń miasto przed spadającymi meteorytami! Wsiadaj za stery statku kosmicznego i strzelaj bez opamiętania. Ludzkość musi przetrwać za wszelką cenę.</p>
                    </div>
                </div>
                <a href="https://city-defence.herokuapp.com" target="_blank" rel="noreferrer" className="myProjects__link"><Button className="button myProjects__button">Zagraj!</Button></a>
                <Link to="/planet-defence/ranking" className="myProjects__link"><Button className="button myProjects__button">Ranking</Button></Link>
            </div>
            <div className="myProjects__article">
                <div className="myProjects__content">
                    <div className="myProjects__image" style={{ backgroundImage: `url(${SAOImg})` }}/>
                    <div className="myProjects__info">
                        <h2 className="myProjects__projectTitle">Sword Art Online Clicker</h2>
                        <p className="myProjects__description">SAO Clicker to gra przeglądarkowa, która nigdzie się nie zapisuje, co oznacza, że jeśli odświeżysz stronę, to automatycznie cały Twój postęp się zresetuje i gra zacznie się od nowa. W sumie jakby na to nie patrzeć, jest to ciekawa mechanika, gdy zna się historię SAO i ruzumie na czym polega fenomen tego anime. Zacząłeś grać? To grasz do końca, inaczej umierasz. W każdym razie pamiętaj o tym i powodzenia! Miłej gry!</p>
                    </div>
                </div>
                <a href="https://www.youtube.com/watch?v=dchkT0uUfhs" target="_blank" rel="noreferrer" className="myProjects__link"><Button className="button myProjects__button">Zobacz Trailer!</Button></a>
                <a href="http://www.clicker.questionmarksanime.pl" target="_blank" rel="noreferrer" className="myProjects__link"><Button className="button myProjects__button">Zagraj!</Button></a>
                <Link to="/sword-art-online-clicker/ranking" className="myProjects__link"><Button className="button myProjects__button">Ranking</Button></Link>
            </div>
            <div className="myProjects__article">
                <div className="myProjects__content">
                <div className="myProjects__image" style={{ backgroundImage: `url(${QMAImg})` }}/>
                    <div className="myProjects__info">
                        <h2 className="myProjects__projectTitle">Question Mark's Anime</h2>
                        <p className="myProjects__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod similique iusto rem ratione sunt ea qui, magnam quaerat officiis nemo labore ipsa praesentium temporibus voluptatum quas natus quia commodi accusamus.</p>
                    </div>
                </div>
                <a href="http://questionmarksanime.pl" target="_blank" rel="noreferrer" className="myProjects__link"><Button className="button myProjects__button">Odwiedź Stronę!</Button></a>
            </div>
            <div className="myProjects__article">
                <div className="myProjects__content">
                <div className="myProjects__image" style={{ backgroundImage: `url(${LOLImg})` }}/>
                    <div className="myProjects__info">
                        <h2 className="myProjects__projectTitle">League of Legend Team Generator</h2>
                        <p className="myProjects__description">Siedzisz z ziomeczkami na TS i nie macie co robić? Zagrajcie w ligusię przeciwko sobie! Wylosujcie drużyny i do boju!</p>
                    </div>
                </div>
                <a href="http://lol.questionmarksanime.pl" target="_blank" rel="noreferrer" className="myProjects__link"><Button className="button myProjects__button">Losuj Drużyny!</Button></a>
            </div>
        </section>
     );
}
 
export default MyProjectsList;