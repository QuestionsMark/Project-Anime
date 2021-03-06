import React, { useEffect } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';

const LeftNav = ({match}) => {

    useEffect(() => {
        const navs = document.querySelectorAll('.leftNav__item');
        const navHeight = document.querySelector('.header').offsetHeight;
        navs.forEach(n => {
            n.addEventListener('click', function (e) {
                const dataID = this.getAttribute('data-id');
                const section = document.querySelector(`.scrollNav[data-id="${dataID}"]`);
                document.querySelector('html').scroll({
                    behavior: 'smooth',
                    top: section.offsetTop - navHeight + 50
                });
            });
        });
        window.addEventListener('scroll', function () {
            const scrollValue = window.scrollY;
            const scrollNavs = document.querySelectorAll('.scrollNav');
            scrollNavs.forEach(s => {
                if (scrollValue >= s.offsetTop - navHeight - 30 && scrollValue < s.offsetTop + s.offsetHeight) {
                    const dataID = s.getAttribute('data-id');
                    const navs = document.querySelectorAll('.leftNav__item')
                    navs.forEach(n => {
                        n.classList.remove('active');
                    });
                    if (document.querySelector(`.leftNav__item[data-id="${dataID}"]`)) {
                        document.querySelector(`.leftNav__item[data-id="${dataID}"]`).classList.add('active');
                    }
                }
            })
        })
    }, [match]);

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
                    <Route path="/anime" exact>
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/anime/create">
                        <Link to="/" className="leftNav__Link">Strona główna</Link>
                    </Route>
                    <Route path="/anime/:anime">
                        <li className="leftNav__item" data-id="1">Oglądaj</li>
                        <li className="leftNav__item" data-id="2">Gatunek</li>
                        <li className="leftNav__item" data-id="3">Opis</li>
                        <li className="leftNav__item" data-id="4">Posłuchaj Soundtracku</li>
                        <li className="leftNav__item" data-id="5">Powiązane Anime</li>
                        <li className="leftNav__item" data-id="6">Komentarze</li>
                    </Route>
                    <Route path="/top">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                        <li className="leftNav__item" data-id="2">Filtruj</li>
                        <li className="leftNav__item" data-id="3">Lista Anime</li>
                    </Route>
                    <Route path="/news" exact>
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/users" exact>
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/users/:userID" exact>
                        <li className="leftNav__item" data-id="3">Wróć do góry</li>
                    </Route>
                    <Route path="/users/:userID/user-top">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/users/:userID/achievements">
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/users/:userID/settings">
                        <li className="leftNav__item" data-id="3">Wróć do góry</li>
                    </Route>
                    <Route path="/galery" exact >
                        <li className="leftNav__item" data-id="1">Szukaj</li>
                    </Route>
                    <Route path="/galery/:id">
                    <Link to="/galery" className="leftNav__Link">Wróć do galerii</Link>
                    </Route>
                    <Route path="/news" exact>
                        <li className="leftNav__item" data-id="4">Wróć do góry</li>
                    </Route>
                    <Route path="/news/:id">
                        <Link to="/news" className="leftNav__Link">Wróć do listy</Link>
                    </Route>
                    <Route path="/">
                        <Link to="/" className="leftNav__Link">Strona główna</Link>
                    </Route>
                </Switch>
            </ul>
        </div>
    );
}

export default withRouter(LeftNav);