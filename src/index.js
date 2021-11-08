import React from 'react';
import ReactDOM from 'react-dom';
import 'reactjs-popup/dist/index.css';
import './styles/css/main.css';
import App from './components/App';
import SimpleReactLightbox from 'simple-react-lightbox';

import { UserProvider } from './contexts/UserProvider';
import { UsersProvider } from './contexts/UsersProvider';
import { AnimeProvider } from './contexts/AnimeProvider';

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <UserProvider>
        <UsersProvider>
          <AnimeProvider>
            <App />
          </AnimeProvider>
        </UsersProvider>
      </UserProvider>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);