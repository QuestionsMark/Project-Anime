import React from 'react';
import { Link } from 'react-router-dom';

import { HOST_ADDRESS } from '../config';

const SingleFolder = ({anime, link, images}) => {
    return ( 
        <Link to={`/galery/${link}`} className="galery__folder">
            <div className="galery__folderImg" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${images[0].id})`}}></div>
            <h3 className="galery__folderTitle">{anime}</h3>
        </Link>
     );
}
 
export default SingleFolder;