import React, { useEffect, useState } from 'react';
import SingleSAOClickerResult from './SingleSAOClickerResult';

const SAOClickerRanking = () => {

    const [results, setResults] = useState(null);
    const [top, setTop] = useState([]);

    const callAPI = () => {
        fetch('https://question-mark-project-anime.herokuapp.com/sao/results')
            .then(res => res.json())
            .then(res => setResults(res))
            .then(() => console.log('Skonczuyłem pobierać dane!'))
    }

    const handleFilterChange = (e) => {
        const filter = e.target.getAttribute('data-filter');
        if (filter === 'time') {
            const sorted = [...results].sort((a, b) => {
                const timeValuesA = a.completionTime.split(':');
                let timeA = 0;
                timeA += timeValuesA[0] * 3600;
                timeA += timeValuesA[1] * 60;
                timeA += timeValuesA[2] * 1;

                const timeValuesB = b.completionTime.split(':');
                let timeB = 0;
                timeB += timeValuesB[0] * 3600;
                timeB += timeValuesB[1] * 60;
                timeB += timeValuesB[2] * 1;

                if (timeA > timeB) {
                    return 1;
                } else if (timeA < timeB) {
                    return -1;
                } else if (a.username.toLowerCase() > b.username.toLowerCase()) {
                    return 1;
                } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setTop(sorted);
        } else if (filter === 'lvl') {
            const sorted = [...results].sort((a, b) => {
                if (a.lvl > b.lvl) {
                    return 1;
                } else if (a.lvl < b.lvl) {
                    return -1;
                } else if (a.username.toLowerCase() > b.username.toLowerCase()) {
                    return 1;
                } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setTop(sorted);
        } else if (filter === 'achievements') {
            const sorted = [...results].sort((a, b) => {
                if (a.achievements > b.achievements) {
                    return -1;
                } else if (a.achievements < b.achievements) {
                    return 1;
                } else if (a.username.toLowerCase() > b.username.toLowerCase()) {
                    return 1;
                } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setTop(sorted);
        } else if (filter === 'swordsAmount') {
            const sorted = [...results].sort((a, b) => {
                if (a.swords > b.swords) {
                    return 1;
                } else if (a.swords < b.swords) {
                    return -1;
                } else if (a.username.toLowerCase() > b.username.toLowerCase()) {
                    return 1;
                } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setTop(sorted);
        }
    }

    const topList = () => {
        return top.map((r, i) => <SingleSAOClickerResult key={r._id} place={i + 1} username={r.username} completionTime={r.completionTime} lvl={r.lvl} achievements={r.achievements} swords={r.swords}/>);
    }

    useEffect(() => {
        callAPI();
    },[])

    useEffect(() => {
        if (results) {
            const sorted = [...results].sort((a, b) => {
                const timeValuesA = a.completionTime.split(':');
                let timeA = 0;
                timeA += timeValuesA[0] * 3600;
                timeA += timeValuesA[1] * 60;
                timeA += timeValuesA[2] * 1;

                const timeValuesB = b.completionTime.split(':');
                let timeB = 0;
                timeB += timeValuesB[0] * 3600;
                timeB += timeValuesB[1] * 60;
                timeB += timeValuesB[2] * 1;

                if (timeA > timeB) {
                    return 1;
                } else if (timeA < timeB) {
                    return -1;
                } else if (a.username.toLowerCase() > b.username.toLowerCase()) {
                    return 1;
                } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            setTop(sorted);
        }
    },[results]);

    return ( 
        <div className="SAOCRanking main__content">
            <h2 className="SAOCRanking__title largeTitle">Sword Art Online Clicker ranking</h2>
            <div className="SAOCRanking__filters">
                <p className="SAOCRanking__filter" onClick={handleFilterChange} data-filter="time">Czas</p>
                <p className="SAOCRanking__filter" onClick={handleFilterChange} data-filter="lvl">Poziom</p>
                <p className="SAOCRanking__filter" onClick={handleFilterChange} data-filter="achievements">Osiągnięcia</p>
                <p className="SAOCRanking__filter" onClick={handleFilterChange} data-filter="swordsAmount">Ilość mieczy</p>
            </div>
            <div className="SAOCRanking__legend">
                <p className="SAOCRanking__info SAOCRanking__info--place">Top</p>
                <p className="SAOCRanking__info SAOCRanking__info--nick">Nick</p>
                <p className="SAOCRanking__info SAOCRanking__info--time">Czas</p>
                <p className="SAOCRanking__info SAOCRanking__info--lvl">Poziom</p>
                <p className="SAOCRanking__info SAOCRanking__info--achievements">Osiągnięcia</p>
                <p className="SAOCRanking__info SAOCRanking__info--swords">Ilość Mieczy</p>
            </div>
            <ul className="SAOCRanking__list">
                {top ? topList() : null }
            </ul>
        </div>
     );
}
 
export default SAOClickerRanking;