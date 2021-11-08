import React, { useContext, useState } from 'react';

const WTMCommentsContext = React.createContext();

export function useWTMComments() {
    return useContext(WTMCommentsContext)
}

export function WTMCommentsProvider({ children }) {

    const [wTMComments, setWTMComments] = useState([]);

    return (
        <WTMCommentsContext.Provider value={[wTMComments, setWTMComments]}>
            {children}
        </WTMCommentsContext.Provider>
    );
}