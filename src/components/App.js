import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

function App() {

  const [isUserLogged, setIsUserLogged] = useState(false);

  const handleSignIn = () => {
    document.querySelector('.loginScreen').classList.toggle('none');
  }

  const checkUserState = () => {
    fetch("https://question-mark-project-anime.herokuapp.com/users/is-user-logged", {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(async res => {
        if (res.status !== 403) {
          const response = await res.json();
          response.isLogged = true;
          return response;
        } else {
          const response = await res.json();
          response.isLogged = false;
          return response;
        }
      })
      .then(res => {
        setIsUserLogged(res.isLogged);
      })
  }

  useEffect(() => {
    checkUserState()
  }, [])

  return (
    <Router>

      {/* ---Hidden elements--- */}

      {isUserLogged ? null : <LoginScreen />}
      {isUserLogged ? null : <RegisterScreen handleSignIn={handleSignIn} />}

      {/* ---TopSide--- */}

      <Nav isUserLogged={isUserLogged} handleSignIn={handleSignIn} />

      {/* ---Main--- */}

      <Switch>
        <Route path="/" exact>
          <Home isUserLogged={isUserLogged} />
        </Route>
        <Route path="/anime-list">
          <Anime isUserLogged={isUserLogged} />
        </Route>
        <Route path="/top">
          <Top isUserLogged={isUserLogged} />
        </Route>
        <Route path="/users">
          <Users isUserLogged={isUserLogged} />
        </Route>
        <Route path="/galery">
          <Galery />
        </Route>
        <Route path="/profile/:userLink">
          <Profile isUserLogged={isUserLogged} />
        </Route>
        <Route path="/pages/create">
          <PageCreate isUserLogged={isUserLogged} />
        </Route>
        <Route path="/pages/:anime">
          <Page isUserLogged={isUserLogged} />
        </Route>
        <Route path="/types">
          <Types isUserLogged={isUserLogged} />
        </Route>
        <Route path="/news">
          <News isUserLogged={isUserLogged} />
        </Route>
        <Route path="/rules">
          <Rules isUserLogged={isUserLogged} />
        </Route>
        <Route path="/source">
          <Source isUserLogged={isUserLogged} />
        </Route>
        <Route path="/my-projects">
          <MyProjects isUserLogged={isUserLogged} />
        </Route>
        <Route path="/sao">
          <SAOClicker isUserLogged={isUserLogged} />
        </Route>
        <Route path="/">
          <NotFound isUserLogged={isUserLogged} />
        </Route>
      </Switch>

      {/* ---BottomSide--- */}

      <Footer />
    </Router>
  );
}

export default App;
