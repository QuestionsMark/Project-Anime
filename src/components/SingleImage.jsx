import React from 'react';

const SingleImage = ({img, fromAnime}) => {
    return ( 
        <a href={`http://localhost:9000/images/${img}`} className="galery__image">
            <div className="galery__imgWrapper">
                <img src={`http://localhost:9000/images/${img}`} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
            <h3 className="galery__imageTitle">{fromAnime}</h3>
        </a>
     );
}
 
export default SingleImage;