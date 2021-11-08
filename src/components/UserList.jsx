import React from 'react';

import SingleUser from './SingleUser';

const UserList = ({users}) => {

    const userList = () => users.map((u, index) => <SingleUser key={u.id} place={index + 1} user={u}/>);

    return ( 
        <div className="userList">
            <ul className="userList__list">
                {userList()}
            </ul>
        </div>
     );
}
 
export default UserList;