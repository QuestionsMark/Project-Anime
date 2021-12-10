import React from 'react';
import ReactDOM from 'react-dom';
import 'reactjs-popup/dist/index.css';
import './styles/css/main.css';
import App from './components/App';
import SimpleReactLightbox from 'simple-react-lightbox';

import { ResponsePopupProvider } from './contexts/ResponsePopupProvider';
import { LoginPopupProvider } from './contexts/LoginPopup';
import { UserProvider } from './contexts/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <ResponsePopupProvider>
        <LoginPopupProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </LoginPopupProvider>
      </ResponsePopupProvider>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);