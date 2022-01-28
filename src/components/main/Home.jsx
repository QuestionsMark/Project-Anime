import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AnimeOnTop from '../AnimeOnTop';
import RecommendedProfiles from '../RecommendedProfiles';
import LastNews from '../LastNews';
import MyProjectsList from '../MyProjectsList';

import setMain from '../../utils/setMain';

const Home = ({main, history, match}) => {

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

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