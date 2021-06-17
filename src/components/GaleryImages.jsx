import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';

import SingleImage from './SingleImage';

import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

const GaleryImages = ({anime, history}) => {
    const location = useLocation();

    const handleGoBack = () => {
        history.goBack();
    }

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
            <div className="galery__goBack">
                <KeyboardArrowLeftRoundedIcon className="galery__goBackIcon" onClick={handleGoBack}/>
            </div>
            <h2 className="galery__title">{setTitle()}</h2>
            <div className="galery__imagesContainer">
                {getImages()}
            </div>
        </>
     );
}
 
export default withRouter(GaleryImages);