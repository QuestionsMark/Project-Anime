import React from 'react';
import { Link } from 'react-router-dom';

const SingleFolder = ({anime, link, images}) => {
    return ( 
        <Link to={link} className="galery__folder">
            <div className="galery__folderImg" style={{backgroundImage: `url(${images[0].img})`}}></div>
            <h3 className="galery__folderTitle">{anime}</h3>
        </Link>
     );
}
 
export default SingleFolder;