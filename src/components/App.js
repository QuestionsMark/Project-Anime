import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { WTMCommentsProvider } from '../contexts/WTMCommentsProvider';
import { useUser } from '../contexts/UserProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useAnime } from '../contexts/AnimeProvider';
import setContexts from '../utils/setContexts';

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

function App() {

  const [status, setStatus, , setAuthorization, , setUser] = useUser();
  const [, setUsers] = useUsers();
  const [, setAnime] = useAnime();

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
  }

  const setApp = async () => {
    const { users, user, anime } = await setContexts(JSON.parse(localStorage.getItem('animark-user-id')));
    console.log({ users, user, anime });
    setAnime(anime);
    setUsers(users);
    setUser(user || {});
    checkUserStatus();
  };

  useEffect(() => {
    setApp();
  }, [])

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
          <Route path="/anime-list">
            <Anime />
          </Route>
          <Route path="/top">
            <Top />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/galery">
            <Galery />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/pages/create">
            <PageCreate />
          </Route>
          <Route path="/pages/:animeID">
            <Page />
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
          <Route path="/sao">
            <SAOClicker />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>

        {/* ---BottomSide--- */}

        <Footer />
      </WTMCommentsProvider>
    </Router>
  );
}

export default App;
