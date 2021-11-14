import React from 'react';

import { HOST_ADDRESS } from '../config';

const SingleImage = ({id, fromAnime}) => {
    return ( 
        <a href={`${HOST_ADDRESS}/images/${id}`} className="galery__image">
            <div className="galery__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${id}`} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
            <h3 className="galery__imageTitle">{fromAnime}</h3>
        </a>
     );
}
 
export default SingleImage;