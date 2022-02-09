import React from 'react';

import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import LastNews from './News/LastNews';
import MyProjectsList from '../MyProjectsList';

const Home = () => {

    return ( 
        <div className="home main__content">
            <AnimeOnTop />
            <RecommendedProfiles />
            <LastNews />
            <MyProjectsList />
        </div>
     );
}
 
export default Home;