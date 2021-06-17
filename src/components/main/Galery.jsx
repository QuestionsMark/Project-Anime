import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import SingleFolder from '../SingleFolder';
import GaleryImages from '../GaleryImages';

import img from '../../media/img/hos-back20502.jpg';
import Search from '../Search';

const Galery = ({history, match}) => {

    const [anime, setAnime] = useState([
            {
                _id: '',
                title: '',
                link: '',
                images: {
                    galeryImages: [
                        {
                            id: '',
                            img: '',
                            fromAnime: ''
                        }
                    ]
                }
            }
        ]);
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const folderList = () => {
        const folders = anime;
        const filtered = folders.filter(f => f.title.toLowerCase().includes(searchPhrase.toLowerCase()));
        return filtered.map(f => <SingleFolder key={f._id} anime={f.title} link={f.link} images={f.images.galeryImages}/>)
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    const callAPI = () => {
        fetch('http://localhost:9000/anime')
            .then(res => res.json())
            .then(res => setAnime(res));
    }

    useEffect(() => {
        goUp();
        callAPI();
    }, []);

    useEffect(() => {
        setSearchPhrase('');
    },[match])

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
                    <Route path="/galery/:anime">
                        <SRLWrapper>
                            <GaleryImages anime={anime}/>
                        </SRLWrapper>
                    </Route>
                </Switch>
            </div>
        </main>
     );
}
 
export default withRouter(Galery);