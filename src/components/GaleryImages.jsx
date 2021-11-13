import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

import SingleImage from './SingleImage';
import { HOST_ADDRESS } from '../config';

const GaleryImages = ({history, match}) => {

    const [animeData, setAnimeData] = useState(null);
    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${match.params.animeID}`);
        if (response.ok) {
            const anime = await response.json();
            setAnimeData(anime);
        }
    };
    const handleGoBack = () => {
        history.goBack();
    }

    const imagesList = () => {
            return animeData.images.galeryImages.map(i => <SingleImage key={i.id} img={i.id} fromAnime={i.fromAnime}/>);
    }

    useEffect(() => {
        getAnime();
    }, [match]);

    return ( 
        <>
            {animeData ? <><div className="galery__goBack">
                <KeyboardArrowLeftRoundedIcon className="galery__goBackIcon" onClick={handleGoBack}/>
            </div>
            <h2 className="galery__title">{animeData.title}</h2>
            <div className="galery__imagesContainer">
                {imagesList()}
            </div></> : null}
        </>
     );
}
 
export default withRouter(GaleryImages);