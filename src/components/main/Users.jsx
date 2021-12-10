import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { HOST_ADDRESS } from '../../config';

import setMain from '../../utils/setMain';

import Search from '../Search';
import UserList from '../UserList';

const Users = ({main, history, match}) => {

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users`);
        if (response.ok) {
            const users = await response.json();
            setUsers(users);
        }
    };

    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const filteredUsers = () => {
        const getPoints = (user) => {
            return Object.entries(user.points).reduce((prev, entry) => prev + entry[1] , 0);
        };
        return users
            .filter(user => user.username.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.achievements.length > b.achievements.length) return -1;
                if (a.achievements.length < b.achievements.length) return 1;
                if (a.likes.length > b.likes.length) return -1;
                if (a.likes.length < b.likes.length) return 1;
                if (getPoints(a) > getPoints(b)) return -1;
                if (getPoints(a) < getPoints(b)) return 1;
                return 0;
            });
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="users main__content">
            <Search handleSearch={handleSearch}/>
            {users.length > 0 ? <UserList users={filteredUsers()}/> : null}
        </div>
     );
}
 
export default withRouter(Users);