import React from 'react';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';

const Anime = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="anime main__content">
                <h1>Anime</h1>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Anime;