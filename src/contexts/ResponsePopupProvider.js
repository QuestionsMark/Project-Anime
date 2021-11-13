import React, { useContext, useState } from 'react';

const ResponsePopupContext = React.createContext();

export function useResponsePopup() {
    return useContext(ResponsePopupContext)
}

export function ResponsePopupProvider({ children }) {

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);

    return (
        <ResponsePopupContext.Provider value={[open, setOpen, response, setResponse]}>
            {children}
        </ResponsePopupContext.Provider>
    );
}