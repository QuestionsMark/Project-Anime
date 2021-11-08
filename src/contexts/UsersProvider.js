import React, { useContext, useState } from 'react';

const UsersContext = React.createContext();

export function useUsers() {
    return useContext(UsersContext)
}

export function UsersProvider({ children }) {

    const [users, setUsers] = useState([]);

    return (
        <UsersContext.Provider value={[users, setUsers]}>
            {children}
        </UsersContext.Provider>
    );
}