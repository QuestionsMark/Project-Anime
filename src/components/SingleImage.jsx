import React from 'react';

import { HOST_ADDRESS } from '../config';

const SingleImage = ({id, fromAnime}) => {
    return ( 
        <div className="galery__image">
            <div className="galery__imgWrapper">
                <img src={`${HOST_ADDRESS}/images/${id}`} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
            <h3 className="galery__imageTitle">{fromAnime}</h3>
        </div>
     );
}
 
export default SingleImage;