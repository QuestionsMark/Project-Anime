import React from 'react';

import LeftNav from './LeftNav';
import Advertisement from './Advertisement';

const LeftSide = () => {
    return ( 
        <div className="main__leftSide">
            <LeftNav />
            <Advertisement />
        </div>
     );
}
 
export default LeftSide;