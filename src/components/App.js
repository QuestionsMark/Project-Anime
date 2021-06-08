import React, { useState } from 'react';
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

function App() {

  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <Router>

      {/* ---Hidden elements--- */}

      {isUserLogged ? null : <LoginScreen />}
      {isUserLogged ? null : <RegisterScreen />}

      {/* ---TopSide--- */}

      <Nav isUserLogged={isUserLogged} />

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
        <Route path="/page">
          {/* <Page /> */}
        </Route>
        <Route path="/types">
          {/* <Types /> */}
        </Route>
        <Route path="/news">
          {/* <News /> */}
        </Route>
        <Route path="/rules">
          {/* <Rules /> */}
        </Route>
        <Route path="/source">
          {/* <Source /> */}
        </Route>
        <Route path="/help">
          {/* <Help /> */}
        </Route>
      </Switch>
      {/* ---BottomSide--- */}

      <Footer />
    </Router>
  );
}

export default App;
