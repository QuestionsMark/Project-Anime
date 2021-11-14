import React, { useContext, useState } from 'react';

const LoginPopupContext = React.createContext();

export function useLoginPopup() {
    return useContext(LoginPopupContext)
}

export function LoginPopupProvider({ children }) {

    const [openLoginScreen, setOpenLoginScreen] = useState(false);
    const [openRegistrationScreen, setOpenRegistrationScreen] = useState(false);

    return (
        <LoginPopupContext.Provider value={{ openLoginScreen, setOpenLoginScreen, openRegistrationScreen, setOpenRegistrationScreen }}>
            {children}
        </LoginPopupContext.Provider>
    );
}