import React, { useContext, useState } from 'react';

const DataContext = React.createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {

    const [animeOnTop, setAnimeOnTop] = useState(null);
    const [dailyAnime, setDailyAnime] = useState(null);
    const [whatsTheMelody, setWhatsTheMelody] = useState(null);
    const [whatsTheMelodyComments, setWhatsTheMelodyComments] = useState([]);
    const [saoClicker, setSaoClicker] = useState([]);

    return (
        <DataContext.Provider value={{ animeOnTop, setAnimeOnTop, dailyAnime, setDailyAnime, whatsTheMelody, setWhatsTheMelody, whatsTheMelodyComments, setWhatsTheMelodyComments, saoClicker, setSaoClicker }}>
            {children}
        </DataContext.Provider>
    );
}
