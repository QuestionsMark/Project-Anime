import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { WTMCommentsProvider } from '../contexts/WTMCommentsProvider';
import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useUser } from '../contexts/UserProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useAnime } from '../contexts/AnimeProvider';
import { useTypes } from '../contexts/TypesProvider';
import setContexts from '../utils/setContexts';

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

import { HOST_ADDRESS } from '../config';
import { useData } from '../contexts/DataProvider';

function App() {

  const [open, setOpen] = useResponsePopup();
  const handleClose = () => {
    setOpen(false);
  };
  const [status, setStatus, , setAuthorization, , setUser] = useUser();
  const [, setUsers] = useUsers();
  const [, setAnime] = useAnime();
  const [, setTypes] = useTypes();
  const { setAnimeOnTop, setDailyAnime, setWhatsTheMelody, setWhatsTheMelodyComments } = useData();

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
    const { users, user, anime, types, animeOnTop, dailyAnime, whatsTheMelody, whatsTheMelodyComments } = await setContexts(JSON.parse(localStorage.getItem('animark-user-id')));
    console.log({ users, user, anime, types, animeOnTop, dailyAnime, whatsTheMelody, whatsTheMelodyComments });
    setAnime(anime);
    setUsers(users);
    setUser(user);
    setTypes(types);
    setAnimeOnTop(animeOnTop);
    setDailyAnime(dailyAnime);
    setWhatsTheMelody(whatsTheMelody);
    setWhatsTheMelodyComments(whatsTheMelodyComments);
    checkUserStatus();
  };

  useEffect(() => {
    setApp();
  }, []);

  return (
    <Router>
      <WTMCommentsProvider>
        {/* ---Popups--- */}

        {status ? null : <LoginScreen />}
        {status ? null : <RegisterScreen />}

        {/* ---TopSide--- */}

        <Nav />

        {/* ---Main--- */}

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/anime" exact>
            <Anime />
          </Route>
          <Route path="/anime/create">
            <PageCreate />
          </Route>
          <Route path="/anime/:animeID">
            <Page />
          </Route>
          <Route path="/top">
            <Top />
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
          <Route path="/news">
            <News />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/source">
            <Source />
          </Route>
          <Route path="/my-projects">
            <MyProjects />
          </Route>
          <Route path="/sword-art-online-clicker">
            <SAOClicker />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>

        {/* ---BottomSide--- */}

        <Footer />
        <Popup modal closeOnDocumentClick open={open} onClose={handleClose}>
          <ServerResponse />
        </Popup>
      </WTMCommentsProvider>
    </Router>
  );
}

export default App;
