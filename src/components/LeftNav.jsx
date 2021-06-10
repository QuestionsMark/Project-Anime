import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { Switch, Route } from 'react-router-dom';

const LeftNav = () => {

    useEffect(() => {
        const navs = $('.leftNav__item');
        const navHeight = $('.header').innerHeight();
        navs.on('click', function () {
            const dataID = this.getAttribute('data-id');
            const $section = $(`.scrollNav[data-id=${dataID}]`);
            $('body, html').animate({
                scrollTop: $section.offset().top - navHeight - 25
            }, 500)
        })
        $(window).on('scroll', function () {
            const scrollValue = window.scrollY;
            const scrollNavs = document.querySelectorAll('.scrollNav');
            const navs = $('.leftNav__item');
            scrollNavs.forEach(s => {
                if (scrollValue >= s.offsetTop - navHeight - 30 && scrollValue < s.offsetTop + s.offsetHeight) {
                    const dataID = s.getAttribute('data-id');
                    $('.leftNav__item').removeClass('active');
                    $(`.leftNav__item[data-id=${dataID}]`).addClass('active');
                }
            })
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
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                        <li className="leftNav__item" data-id="2">Serie Anime</li>
                        <li className="leftNav__item" data-id="3">Filmy ANime</li>
                    </Route>
                    <Route path="/top">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                        <li className="leftNav__item" data-id="2">Filtruj</li>
                        <li className="leftNav__item" data-id="3">Lista Anime</li>
                    </Route>
                    <Route path="/users" exact>
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                        <li className="leftNav__item" data-id="2">Lista Użytkowników</li>
                    </Route>
                    <Route path="/profile/:userID" exact>
                        <li className="leftNav__item" data-id="3">Wróć do góry</li>
                    </Route>
                    <Route path="/profile/:userID/user-top">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/profile/:userID/achievements">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/profile/:userID/settings">
                        <li className="leftNav__item" data-id="3">Wróć do góry</li>
                    </Route>
                    <Route path="/pages/:anime">
                        <li className="leftNav__item" data-id="1">Oglądaj</li>
                        <li className="leftNav__item" data-id="2">Informacje</li>
                        <li className="leftNav__item" data-id="3">Opis</li>
                        <li className="leftNav__item" data-id="4">Posłuchaj Soundtracku</li>
                        <li className="leftNav__item" data-id="5">Komentarze</li>
                    </Route>
                    <Route path="/types">
                        <li className="leftNav__item" data-id="4">Wróć do góry</li>
                    </Route>
                    <Route path="/rules">
                        <li className="leftNav__item" data-id="4">Wróć do góry</li>
                    </Route>
                    <Route path="/news">
                        <li className="leftNav__item" data-id="4">Wróć do góry</li>
                    </Route>
                    <Route path="/source">
                        <li className="leftNav__item" data-id="4">Wróć do góry</li>
                    </Route>
                    <Route path="/">
                        <Link to="/" className="leftNav__Link">Strona główna</Link>
                    </Route>
                </Switch>
            </ul>
        </div>
    );
}

export default LeftNav;