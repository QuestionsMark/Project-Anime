import React from 'react';

const SingleImage = ({img, fromAnime}) => {
    return ( 
        <a href={img} className="galery__image">
            <div className="galery__imgWrapper">
                <img src={img} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
            <h3 className="galery__imageTitle">{fromAnime}</h3>
        </a>
     );
}
 
export default SingleImage;