import React from 'react';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';

const Top = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="top main__content">
                <h1>Top</h1>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Top;