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
      <UserProvider>
        <UsersProvider>
          <AnimeProvider>
            <TypesProvider>
              <ResponsePopupProvider>
                <DataProvider>
                  <LoginPopupProvider>
                    <App />
                  </LoginPopupProvider>
                </DataProvider>
              </ResponsePopupProvider>
            </TypesProvider>
          </AnimeProvider>
        </UsersProvider>
      </UserProvider>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);