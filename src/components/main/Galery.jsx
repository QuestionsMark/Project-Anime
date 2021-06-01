import React from 'react';

import LeftNav from '../LeftNav';

const Galery = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                {/* <Add /> */}
            </div>
            <div className="galery main__content">
                <h1>Galery</h1>
            </div>
            <div className="main__rightSide">

            </div>
        </main>
     );
}
 
export default Galery;