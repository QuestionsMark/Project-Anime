import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import { useAnime } from '../../contexts/AnimeProvider';

import SingleFolder from '../SingleFolder';
import GaleryImages from '../GaleryImages';
import Search from '../Search';

const Galery = ({history, match}) => {

    const [anime] = useAnime();

    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const folderList = () => {
        return anime
            .filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map(f => <SingleFolder key={f.id} anime={f}/>);
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
        setSearchPhrase('');
    }, [match]);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <div className="galery main__content">
                <Switch>
                    <Route path="/galery" exact>
                        <div className="galery__search">
                            <Search handleSearch={handleSearch}/>
                        </div>
                        <div className="galery__folderContainer">
                            {folderList()}
                        </div>
                    </Route>
                    <Route path="/galery/:animeID">
                        <SRLWrapper>
                            <GaleryImages />
                        </SRLWrapper>
                    </Route>
                </Switch>
            </div>
        </main>
     );
}
 
export default withRouter(Galery);