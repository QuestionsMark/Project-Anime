import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import SingleFolder from '../SingleFolder';
import GaleryImages from '../GaleryImages';
import Search from '../Search';

import setMain from '../../utils/setMain';
import useSearch from '../../hooks/useSearch';
import Loading from '../Loading';
import Error from '../Error';

const Galery = ({main, history, match}) => {

    const [searchPhrase, setSearchPhrase] = useState('');
    const [page, setPage] = useState(1);
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
        setPage(1);
    };

    const { data, hasMore, loading, error } = useSearch('anime/galery', searchPhrase, page);

    const observer = useRef();
    const lastDataElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const [columns, setColumns] = useState(null);

    const sortFolders = useCallback(() => {
        const columns = { column1: [], column2: [], column3: [], column4: [] };
        let counter = 1;
        data
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
    }, [data]);

    const folderList = (images, column) => {
        return images.map((f, i) => {
            if (column === 1 && images.length === i + 1) return <SingleFolder key={f.id} refference={lastDataElementRef} anime={f}/>
            return <SingleFolder key={f.id} anime={f}/>
        });
    };

    useEffect(() => {
        if(data.length > 0) {
            sortFolders();
        }
    }, [data, sortFolders]);

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

    return ( 
        <div className="anime main__content">
            <Route path="/galery" exact>
                <Search handleSearch={handleSearch} value={searchPhrase}/>
                <div className="galery__folderContainer">
                    <div className="galery__folderColumn">
                        {columns ? folderList(columns.column1, 1) : null}
                    </div>
                    <div className="galery__folderColumn">
                        {columns ? folderList(columns.column2, 2) : null}
                    </div>
                    <div className="galery__folderColumn">
                        {columns ? folderList(columns.column3, 3) : null}
                    </div>
                    <div className="galery__folderColumn">
                        {columns ? folderList(columns.column4, 4) : null}
                    </div>
                </div>
                {loading ? <Loading /> : null}
                {error ? <Error error={error}/> : null}
            </Route>
            <Route path="/galery/:animeID">
                <SRLWrapper>
                    <GaleryImages />
                </SRLWrapper>
            </Route>
        </div>
     );
}
 
export default withRouter(Galery);