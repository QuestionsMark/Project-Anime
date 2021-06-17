import React from 'react';
import { withRouter } from 'react-router-dom';

import SingleImage from './SingleImage';

import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

const GaleryImages = ({anime, history, match}) => {

    const handleGoBack = () => {
        history.goBack();
    }

    const setTitle = () => {
        const thisAnime = anime.find(a => a.link === match.params.anime);
        if (thisAnime) {
            return thisAnime.title;
        } else {
            return '';
        }
    }

    const getImages = () => {
        const thisAnime = anime.find(a => a.link === match.params.anime);
        if (thisAnime) {
            const images = thisAnime.images.galeryImages.map(i => <SingleImage key={i.id} img={i.img} fromAnime={i.fromAnime}/>);
            return images;
        } else {
            return null;
        }
        
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