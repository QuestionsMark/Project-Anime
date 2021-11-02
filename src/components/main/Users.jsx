import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Search from '../Search';
import UserList from '../UserList';
import UserLegend from '../UserLegend';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

import { HOST_ADDRESS } from '../../config';

const Users = ({isUserLogged, history}) => {

    const [userList, setUserList] = useState([
        {
            id: 1,
            username: '',
            link: '',
            avatar: '',
            background: '',
            likes: [],
            favoriteAnime: {
                name: '',
                img: '',
            },
            favoriteType: '',
            achievements: [
                {
                    id: '',
                    name: '',
                    description: '',
                    img: ''
                }
            ]
        }
    ]);
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const filteredUsers = () => {
        return userList
        .filter(user => user.username.toLowerCase().includes(searchPhrase.toLowerCase()))
        .sort((a, b) => {
            if (a.achievements.length > b.achievements.length) {
                return -1;
            } else if (a.achievements.length < b.achievements.length) {
                return 1;
            } else {
                if (a.likes.length > b.likes.length) {
                    return -1;
                } else if (a.likes.length < b.likes.length) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/users`)
            .then(res => res.json())
            .then(res => setUserList(res));
    }

    useEffect(() => {
        goUp();
        callAPI();
    }, []);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="users main__content">
                <Search handleSearch={handleSearch}/>
                <UserLegend />
                <UserList users={filteredUsers()}/>
            </div>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default withRouter(Users);