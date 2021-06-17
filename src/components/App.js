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

function App() {

  const [isUserLogged, setIsUserLogged] = useState(false);

  const handleSignIn = () => {
    document.querySelector('.loginScreen').classList.toggle('none');
  }

  const handleLogOut = () => {
    localStorage.removeItem('UID')
    localStorage.removeItem('token');
    localStorage.removeItem('l');
    window.location.href = "http://localhost:3000";
  }

  const checkUserState = () => {
    fetch("http://localhost:9000/users/is-user-logged", {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        setIsUserLogged(res.userState)
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

      <Nav isUserLogged={isUserLogged} handleSignIn={handleSignIn} handleLogOut={handleLogOut} />

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
        <Route path="/profile/:userLink">
          <Profile isUserLogged={isUserLogged} />
        </Route>
        <Route path="/pages/create">
          <PageCreate />
        </Route>
        <Route path="/pages/:anime">
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
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
      {/* ---BottomSide--- */}

      <Footer />
    </Router>
  );
}

export default App;
