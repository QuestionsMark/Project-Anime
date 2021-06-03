import React, { useEffect } from 'react';
import $ from 'jquery';
import { Switch, Route } from 'react-router-dom';

const LeftNav = () => {

    useEffect(() => {
        const navs = $('.leftNav__item');
        const navHeight = $('.header').innerHeight();
        navs.on('click', function () {
            const dataID = this.getAttribute('data-id');
            const $section = $(`section[data-id=${dataID}]`);
            console.log($section.offset().top)
            $('body, html').animate({
                scrollTop: $section.offset().top - navHeight
            }, 500)
        })
    }, [])

    return (
        <div className="leftNav">
            <ul className="leftNav__list">
                <Switch>
                    <Route path="/" exact>
                        <li className="leftNav__item" data-id="1">Anime na Topie</li>
                        <li className="leftNav__item" data-id="2">Polecane Profile</li>
                        <li className="leftNav__item" data-id="3">Aktualności ze Świata Anime</li>
                        <li className="leftNav__item" data-id="4">Inne Moje Projekty</li>
                    </Route>
                    <Route path="/anime-list">
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
                    </Route>
                    <Route path="/top">
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
                    </Route>
                    <Route path="/users">
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Anime na czasie</li>
                    </Route>
                    <Route path="/types">
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Anime na czasie</li>
                    </Route>
                </Switch>
            </ul>
        </div>
    );
}

export default LeftNav;