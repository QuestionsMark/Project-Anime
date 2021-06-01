import React from 'react';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';

const Users = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="users main__content">
                <h1>Users</h1>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Users;