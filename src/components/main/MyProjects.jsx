import React from 'react';

import LeftSide from '../LeftSide';
import MyProjectsList from '../MyProjectsList';
import RightSide from '../RightSide';

const MyProjects = () => {
    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="home main__content">
                <MyProjectsList />
            </div>
            <RightSide />
        </main>
     );
}
 
export default MyProjects;