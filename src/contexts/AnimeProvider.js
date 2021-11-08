import React, { useContext, useState } from 'react';

const AnimeContext = React.createContext();

export function useAnime() {
    return useContext(AnimeContext)
}

export function AnimeProvider({ children }) {

    const [anime, setAnime] = useState([]);

    return (
        <AnimeContext.Provider value={[anime, setAnime]}>
            {children}
        </AnimeContext.Provider>
    );
}