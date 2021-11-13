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

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <UserProvider>
        <UsersProvider>
          <AnimeProvider>
            <TypesProvider>
              <ResponsePopupProvider>
                <DataProvider>
                  <App />
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