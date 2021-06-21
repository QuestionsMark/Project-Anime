import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import LastNews from '../LastNews';
import MyProjectsList from '../MyProjectsList';

const Home = ({isUserLogged, history}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, []);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="home main__content">
                <AnimeOnTop isUserLogged={isUserLogged}/>
                <RecommendedProfiles />
                <LastNews />
                <MyProjectsList />
            </div>
            <RightSide  isUserLogged={isUserLogged}/>
        </main>
     );
}
 
export default withRouter(Home);