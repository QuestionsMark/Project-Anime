import React, { useContext, useState } from 'react';

const TypesContext = React.createContext();

export function useTypes() {
    return useContext(TypesContext);
}

export function TypesProvider({ children }) {

    const [types, setTypes] = useState([]);

    return (
        <TypesContext.Provider value={[types, setTypes]}>
            {children}
        </TypesContext.Provider>
    );
}