import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {

    const [status, setStatus] = useState(false);
    const [authorization, setAuthorization] = useState('1');
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ status, setStatus, authorization, setAuthorization, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}