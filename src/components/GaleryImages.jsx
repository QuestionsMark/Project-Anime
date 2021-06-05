import React from 'react';
import { useLocation } from 'react-router-dom';

import SingleImage from './SingleImage';

const GaleryImages = ({anime}) => {

    const location = useLocation();

    const setTitle = () => {
        const thisAnime = anime.find(a => a.link === location.pathname);
        return thisAnime.title;
    }

    const getImages = () => {
        const thisAnime = anime.find(a => a.link === location.pathname);
        const images = thisAnime.galeryImages.map(a => <SingleImage key={a.id} img={a.img} fromAnime={a.fromAnime}/>);
        return images;
    }

    return ( 
        <>
            <h2 className="galery__title">{setTitle()}</h2>
            <div className="galery__imagesContainer">
                {getImages()}
            </div>
        </>
     );
}
 
export default GaleryImages;