import React from 'react';

import LeftSide from '../LeftSide';
import MyProjectsList from '../MyProjectsList';
import RightSide from '../RightSide';

const MyProjects = ({isUserLogged}) => {
    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="home main__content">
                <MyProjectsList />
            </div>
            <RightSide isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default MyProjects;