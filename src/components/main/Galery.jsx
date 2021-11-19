import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import { useData } from '../../contexts/DataProvider';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import SingleFolder from '../SingleFolder';
import GaleryImages from '../GaleryImages';
import Search from '../Search';

const Galery = ({history, match}) => {

    const { anime } = useData();

    const [searchPhrase, setSearchPhrase] = useState('');
    const [columns, setColumns] = useState(null);
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const sortFolders = () => {
        const columns = { column1: [], column2: [], column3: [], column4: [] };
        let counter = 1;
        anime
            .filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .forEach(i => {
                if (counter === 1) {
                    columns.column1.push(i);
                    counter++;
                } else if (counter === 2) {
                    columns.column2.push(i);
                    counter++;
                } else if (counter === 3) {
                    columns.column3.push(i);
                    counter++;
                } else if (counter === 4) {
                    columns.column4.push(i);
                    counter = 1;
                }
            });
        setColumns(columns);
    };

    const folderList = (images) => {
        return images.map(f => <SingleFolder key={f.id} anime={f}/>);
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        if(anime.length > 0) {
            sortFolders();
        }
    }, [anime, searchPhrase]);

    useEffect(() => {
        goUp();
        setSearchPhrase('');
    }, [match]);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
                <div className="anime main__content">
                    <Route path="/galery" exact>
                        <Search handleSearch={handleSearch}/>
                        <div className="galery__folderContainer">
                            <div className="galery__folderColumn">
                                {columns ? folderList(columns.column1) : null}
                            </div>
                            <div className="galery__folderColumn">
                                {columns ? folderList(columns.column2) : null}
                            </div>
                            <div className="galery__folderColumn">
                                {columns ? folderList(columns.column3) : null}
                            </div>
                            <div className="galery__folderColumn">
                                {columns ? folderList(columns.column4) : null}
                            </div>
                        </div>
                    </Route>
                    <Route path="/galery/:animeID">
                        <SRLWrapper>
                            <GaleryImages />
                        </SRLWrapper>
                    </Route>
                </div>
            <RightSide/>
        </main>
     );
}
 
export default withRouter(Galery);