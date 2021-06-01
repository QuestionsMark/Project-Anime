import React from 'react';
import { Switch, Route } from 'react-router-dom';

const LeftNav = () => {
    return ( 
        <div className="leftNav">
            <ul className="leftNav__list">
                <Switch>
                    <Route path="/" exact>
                        <li className="leftNav__item">Anime na czasie</li>
                        <li className="leftNav__item">Polecane profile</li>
                        <li className="leftNav__item">Moje projekty</li>
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