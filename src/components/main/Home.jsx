import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import LastNews from '../LastNews';
import MyProjectsList from '../MyProjectsList';

import setMain from '../../utils/setMain';

const Home = ({main, history, match}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="home main__content">
            <AnimeOnTop />
            <RecommendedProfiles />
            <LastNews />
            <MyProjectsList />
        </div>
     );
}
 
export default withRouter(Home);