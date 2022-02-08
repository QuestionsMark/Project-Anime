import React, { useCallback, useEffect, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useLoginPopup } from '../contexts/LoginPopup';
import { useUser } from '../contexts/UserProvider';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import ServerResponse from './ServerResponse';
import Footer from './Footer';
import Home from './main/Home';
import LoginScreen from './LoginScreen';
import Nav from './Nav';
import RegisterScreen from './RegisterScreen';
import Anime from './main/Anime';
import Users from './main/Users';
import Galery from './main/Galery';
import Page from './main/Page/Page';
import Types from './main/Types';
import Rules from './main/Rules';
import News from './main/News/News';
import Source from './main/Source';
import NotFound from './main/NotFound';
import Profile from './main/Profile';
import AnimeCreate from './main/AnimeCreate/AnimeCreate';
import MyProjects from './main/MyProjects';
import SAOClicker from './main/SAOClicker';
import Achievements from './main/Achievements';
import PlanetDefence from './main/PlanetDefence';

import { setMainBackground } from '../utils/setMainBackground';
import { HOST_ADDRESS } from '../config';

function App() {

    const html = useRef(document.querySelector('html'));
    const mainRef = useRef();

    const location = useLocation();

    const { open, setOpen } = useResponsePopup();
    const { openLoginScreen, setOpenLoginScreen, openRegistrationScreen, setOpenRegistrationScreen } = useLoginPopup();
    const handleCloseResponsePopup = () => {
        setOpen(false);
    };
    const handleCloseLoginScreen = () => {
        setOpenLoginScreen(false);
    };
    const handleCloseRegistrationScreen = () => {
        setOpenRegistrationScreen(false);
    };

    const { setStatus, setAuthorization, setUser } = useUser();

    const setApp = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${JSON.parse(localStorage.getItem('animark-user-id'))}/authorization/${JSON.parse(localStorage.getItem('animark-token'))}`);
        if (response.ok) {
            const user = await response.json();
            setStatus(true);
            setAuthorization(user.rank);
            setUser(user);
        } else {
            setStatus(false);
            setAuthorization('1');
        }
    }, [setAuthorization, setStatus, setUser]);

    useEffect(() => {
        html.current.scroll({
            behavior: 'smooth',
            top: 0,
        });
        setMainBackground(mainRef.current, location)
    }, [location]);

    useEffect(() => {
        setApp();
    }, [setApp]);

    return (
        <>
            <Nav />
            <main className="main" ref={mainRef}>
                <div className="curtain"></div>
                <LeftSide />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/anime" exact>
                        <Anime />
                    </Route>
                    <Route path="/anime/create">
                        <AnimeCreate />
                    </Route>
                    <Route path="/anime/:animeID">
                        <Page />
                    </Route>
                    <Route path="/users" exact>
                        <Users />
                    </Route>
                    <Route path="/users/:id">
                        <Profile />
                    </Route>
                    <Route path="/galery">
                        <Galery />
                    </Route>
                    <Route path="/types">
                        <Types />
                    </Route>
                    <Route path="/achievements">
                        <Achievements />
                    </Route>
                    <Route path="/news">
                        <News />
                    </Route>
                    <Route path="/rules">
                        <Rules />
                    </Route>
                    <Route path="/source">
                        <Source />
                    </Route>
                    <Route path="/my-another-projects">
                        <MyProjects />
                    </Route>
                    <Route path="/sword-art-online-clicker">
                        <SAOClicker />
                    </Route>
                    <Route path="/planet-defence">
                        <PlanetDefence />
                    </Route>
                    <Route path="/">
                        <NotFound />
                    </Route>
                </Switch>
                <RightSide />
            </main>
            <Footer />

            {/* Popups */}

            <Popup modal closeOnDocumentClick open={open} onClose={handleCloseResponsePopup}>
                <ServerResponse />
            </Popup>
            <Popup modal closeOnDocumentClick open={openLoginScreen} onClose={handleCloseLoginScreen}>
                <LoginScreen />
            </Popup>
            <Popup modal closeOnDocumentClick open={openRegistrationScreen} onClose={handleCloseRegistrationScreen}>
                <RegisterScreen />
            </Popup>
        </>
    );
}

export default App;
