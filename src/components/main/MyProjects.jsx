import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import MyProjectsList from '../MyProjectsList';

import setMain from '../../utils/setMain';

const MyProjects = ({main, history, match}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="home main__content">
            <MyProjectsList />
        </div>
     );
}
 
export default withRouter(MyProjects);