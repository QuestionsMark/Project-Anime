import React from 'react';
import ReactDOM from 'react-dom';
import 'reactjs-popup/dist/index.css';
import './styles/css/main.css';
import App from './components/App';
import SimpleReactLightbox from 'simple-react-lightbox';

import { UserProvider } from './contexts/UserProvider';
import { UsersProvider } from './contexts/UsersProvider';
import { AnimeProvider } from './contexts/AnimeProvider';
import { ResponsePopupProvider } from './contexts/ResponsePopupProvider';
import { TypesProvider } from './contexts/TypesProvider';
import { DataProvider } from './contexts/DataProvider';
import { LoginPopupProvider } from './contexts/LoginPopup';

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <ResponsePopupProvider>
        <LoginPopupProvider>
          <UserProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </UserProvider>
        </LoginPopupProvider>
      </ResponsePopupProvider>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);