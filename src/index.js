import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import './styles/main.scss';
import App from './components/App';
import SimpleReactLightbox from 'simple-react-lightbox';

import { ResponsePopupProvider } from './contexts/ResponsePopupProvider';
import { LoginPopupProvider } from './contexts/LoginPopup';
import { UserProvider } from './contexts/UserProvider';
import { SocketProvider } from './contexts/SocketProvider';

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <SocketProvider>
        <ResponsePopupProvider>
          <LoginPopupProvider>
            <UserProvider>
              <Router>
                <App />
              </Router>
            </UserProvider>
          </LoginPopupProvider>
        </ResponsePopupProvider>
      </SocketProvider>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);