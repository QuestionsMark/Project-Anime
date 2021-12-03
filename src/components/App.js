import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useLoginPopup } from '../contexts/LoginPopup';
import { useUser } from '../contexts/UserProvider';
import { useData } from '../contexts/DataProvider';
import setContexts from '../utils/setContexts';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import ServerResponse from './ServerResponse';
import Footer from './Footer';
import Home from './main/Home';
import LoginScreen from './LoginScreen';
import Nav from './Nav';
import RegisterScreen from './RegisterScreen';
import Anime from './main/Anime';
import Top from './main/Top';
import Users from './main/Users';
import Galery from './main/Galery';
import Page from './main/Page';
import Types from './main/Types';
import Rules from './main/Rules';
import News from './main/News';
import Source from './main/Source';
import NotFound from './main/NotFound';
import Profile from './main/Profile';
import PageCreate from './main/PageCreate';
import MyProjects from './main/MyProjects';
import SAOClicker from './SAOClicker';
import Achievements from './main/Achievements';

import { HOST_ADDRESS } from '../config';

function App() {

    const mainRef = useRef();

    const [main, setMain] = useState(null);

    const [open, setOpen] = useResponsePopup();
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

    const [, setStatus, , setAuthorization, , setUser] = useUser();
    // const { setUsers, setAnime, setTypes, setAnimeOnTop, setDailyAnime, setWhatsTheMelody, setWhatsTheMelodyComments, setSaoClicker } = useData();

    const checkUserStatus = async () => {
        if (localStorage.getItem('animark-user-id')) {
            try {
                const response = await fetch(`${HOST_ADDRESS}/users/${JSON.parse(localStorage.getItem('animark-user-id'))}/status`);
                if (response.ok) {
                    setStatus(true);
                    const { rank } = await response.json();
                    setAuthorization(rank);
                } else {
                    setStatus(false);
                    setAuthorization('1');
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const setApp = async () => {
        const { users, user, anime, types, animeOnTop, dailyAnime, whatsTheMelody, whatsTheMelodyComments, SAOCRanking } = await setContexts(JSON.parse(localStorage.getItem('animark-user-id')));
        // console.log({ users, user, anime, types, animeOnTop, dailyAnime, whatsTheMelody, whatsTheMelodyComments, SAOCRanking });
        // setAnime(anime);
        // setUsers(users);
        setUser(user);
        // setTypes(types);
        // setAnimeOnTop(animeOnTop);
        // setDailyAnime(dailyAnime);
        // setWhatsTheMelody(whatsTheMelody);
        // setWhatsTheMelodyComments(whatsTheMelodyComments);
        // setSaoClicker(SAOCRanking);
        checkUserStatus();
    };

    useEffect(() => {
        setApp();
        setMain(mainRef.current);
    }, []);

    return (
        <Router>
            <Nav />
            <main className="main" ref={mainRef}>
                <div className="curtain"></div>
                <LeftSide />
                <Switch>
                    <Route path="/" exact>
                        <Home main={main} />
                    </Route>
                    <Route path="/anime" exact>
                        <Anime main={main} />
                    </Route>
                    <Route path="/anime/create">
                        <PageCreate main={main} />
                    </Route>
                    <Route path="/anime/:animeID">
                        <Page main={main} />
                    </Route>
                    <Route path="/top">
                        <Top main={main} />
                    </Route>
                    <Route path="/users" exact>
                        <Users main={main} />
                    </Route>
                    <Route path="/users/:id">
                        <Profile main={main} />
                    </Route>
                    <Route path="/galery">
                        <Galery main={main} />
                    </Route>
                    <Route path="/types">
                        <Types main={main} />
                    </Route>
                    <Route path="/achievements">
                        <Achievements main={main} />
                    </Route>
                    <Route path="/news">
                        <News main={main} />
                    </Route>
                    <Route path="/rules">
                        <Rules main={main} />
                    </Route>
                    <Route path="/source">
                        <Source main={main} />
                    </Route>
                    <Route path="/my-another-projects">
                        <MyProjects main={main} />
                    </Route>
                    <Route path="/sword-art-online-clicker">
                        <SAOClicker main={main} />
                    </Route>
                    <Route path="/">
                        <NotFound main={main} />
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
        </Router>
    );
}

export default App;
