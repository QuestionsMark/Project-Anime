import React, { useCallback, useRef, useState } from 'react';
import Popup from 'reactjs-popup';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import SingleNews from '../SingleNews';

import AddNews from '../AddNews';
import useSearch from '../../hooks/useSearch';
import Search from '../Search';
import Loading from '../Loading';
import Error from '../Error';
import { useUser } from '../../contexts/UserProvider';

const News = () => {

    const { status } = useUser();

    const [searchPhrase, setSearchPhrase] = useState('');
    const [page, setPage] = useState(1);
    const [changedData, setChangedData] = useState(false);
    const handleChangeData = () => {
        setPage(1);
        setChangedData(prev => !prev);
    };
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
        setPage(1);
    };

    const { data, hasMore, loading, error } = useSearch('news', searchPhrase, page, changedData);

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

    const newsList = () => {
        return data.map((news, i) => {
            if (data.length === i + 1) return <SingleNews key={news.id} refference={lastDataElementRef} news={news}/>;
            return <SingleNews key={news.id} news={news}/>;
        });
    };

    return ( 
        <div className="news main__content scrollNav" data-id="4">
            <Search handleSearch={handleSearch} value={searchPhrase}/>
            {status ? <Popup modal nested closeOnDocumentClick={false} trigger={<div className="news__add"><AddRoundedIcon className="news__add-new-news"/> Dodaj Nowość</div>} on="click">
                {close => <AddNews close={close} getNews={handleChangeData}/>}
            </Popup> : null}
            <div className="news__container">
                {newsList()}
            </div>
            {loading ? <Loading /> : null}
            {error ? <Error error={error}/> : null}
        </div>
     );
}
 
export default News;