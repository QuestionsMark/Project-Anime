import React from 'react';
import { Link } from 'react-router-dom';

import { HOST_ADDRESS } from '../../config';

const SingleFolder = ({anime, refference}) => {

    const { id, title, images } = anime;

    return ( 
        <Link to={`/galery/${id}`} className="galery__folder" ref={refference ? refference : null}>
            <div className="galery__folderImg">
                <img src={`${HOST_ADDRESS}/images/${images.galeryImages[0].id}`} alt="galery folder" className="galery__img" />
            </div>
            <h3 className="galery__folderTitle">{title}</h3>
        </Link>
     );
}
 
export default SingleFolder;