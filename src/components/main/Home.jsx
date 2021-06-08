import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';
import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import LastNews from '../LastNews';
import MyProjects from '../MyProjects';

const Home = ({history}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, []);

    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="home main__content">
                <AnimeOnTop />
                <RecommendedProfiles />
                <LastNews />
                <MyProjects />
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Home);