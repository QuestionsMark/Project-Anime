import React from 'react';

import SingleUser from './SingleUser';

const UserList = ({users}) => {

    const userList = users.map((user, index) => <SingleUser
    key={user.id}
    place={index + 1}
    username={user.name}
    link={user.link}
    backgroundTheme={user.backgroundTheme}
    img={user.avatar}
    likes={user.likes}
    favoriteAnimeTitle={user.favoriteAnime.name}
    favoriteAnimeImg={user.favoriteAnime.img}
    favoriteType={user.favoriteType}
    achievements={user.achievements}
    />)

    return ( 
        <div className="userList">
            <ul className="userList__list">
                {userList}
            </ul>
        </div>
     );
}
 
export default UserList;