import React from 'react';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';
import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import News from '../News';
import MyProjects from '../MyProjects';

const Home = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="home main__content">
                <AnimeOnTop />
                <RecommendedProfiles />
                <News />
                <MyProjects />
            </div>
            <RightSide />
        </main>
     );
}
 
export default Home;