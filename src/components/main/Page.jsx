import React, { useState } from 'react';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

import background from '../../media/img/pla3-back20502.png';

const Profile = () => {

    const [animeData, setAnimeData] = useState({});

    return ( 
        <main className="main" style={{backgroundImage: `url(${background})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            {/* <div className="curtain"></div> */}
            <LeftSide />
            <div className="home main__content">
            </div>
            <RightSide />
        </main>
     );
}
 
export default Profile;