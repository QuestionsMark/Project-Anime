import React from 'react';

import LeftNav from './LeftNav';
import Add from './Add';

const LeftSide = () => {
    return ( 
        <div className="main__leftSide">
            <LeftNav />
            <Add />
        </div>
     );
}
 
export default LeftSide;