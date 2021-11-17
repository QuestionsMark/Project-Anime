import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useUsers } from '../../contexts/UsersProvider';

import Search from '../Search';
import UserList from '../UserList';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

const Users = ({history, match}) => {

    const [users] = useUsers();

    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const filteredUsers = () => {
        return users
            .filter(user => user.username.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.achievements.length > b.achievements.length) return -1;
                if (a.achievements.length < b.achievements.length) return 1;
                if (a.likes.length > b.likes.length) return -1;
                if (a.likes.length < b.likes.length) return 1;
                return 0;
            });
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, [match]);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="users main__content">
                <Search handleSearch={handleSearch}/>
                {/* <UserLegend /> */}
                {users.length > 0 ? <UserList users={filteredUsers()}/> : null}
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Users);