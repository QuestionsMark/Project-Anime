import React from 'react';

const SingleImage = ({img, fromAnime}) => {
    return ( 
        <a href={`https://question-mark-project-anime.herokuapp.com/images/${img}`} className="galery__image">
            <div className="galery__imgWrapper">
                <img src={`https://question-mark-project-anime.herokuapp.com/images/${img}`} alt={fromAnime} className="img" srl_gallery_image="true"/>
            </div>
            <h3 className="galery__imageTitle">{fromAnime}</h3>
        </a>
     );
}
 
export default SingleImage;