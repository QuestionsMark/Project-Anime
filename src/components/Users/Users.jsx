import React, { useState, useRef, useCallback, useMemo } from 'react';
import useSearch from '../../hooks/useSearch';

import Error from '../Error';
import Loading from '../Loading';
import Search from '../Search';
import SingleUser from './SingleUser';

const Users = () => {

    const [searchPhrase, setSearchPhrase] = useState('');
    const [page, setPage] = useState(1);
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
        setPage(1);
    };

    const { data, hasMore, loading, error } = useSearch('users', searchPhrase, page);

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

    const usersList = useCallback(() => {
        return data.map((u, i) => {
            if (data.length === i + 1) return <SingleUser key={u.id} refference={lastDataElementRef} place={i + 1} user={u}/>;
            return <SingleUser key={u.id} place={i + 1} user={u}/>;
        })
    }, [data, lastDataElementRef]);

    const usersListComponent = useMemo(() => <ul className="userList__list">{usersList()}</ul>, [usersList]);

    return ( 
        <div className="users main__content">
            <Search handleSearch={handleSearch} value={searchPhrase}/>
            <div className="userList">
                {usersListComponent}
            </div>
            {loading ? <Loading /> : null}
            {error ? <Error error={error}/> : null}
        </div>
     );
}
 
export default Users;